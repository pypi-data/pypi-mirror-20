import json
import logging
import os
import shutil
import subprocess
from abc import ABCMeta, abstractmethod
from collections import namedtuple
from subprocess import PIPE

from jsoncfg.value_mappers import require_bool
from typing import List

from peek_platform import PeekPlatformConfig
from peek_platform.file_config.PeekFileConfigFrontendDirMixin import \
    PeekFileConfigFrontendDirMixin
from peek_platform.file_config.PeekFileConfigOsMixin import PeekFileConfigOsMixin
from peek_platform.frontend.FrontendFileSync import FrontendFileSync
from peek_plugin_base.PeekVortexUtil import peekClientName, peekServerName
from peek_plugin_base.PluginPackageFileConfig import PluginPackageFileConfig

logger = logging.getLogger(__name__)

# Quiten the file watchdog
logging.getLogger("watchdog.observers.inotify_buffer").setLevel(logging.INFO)

PluginDetail = namedtuple("PluginDetail",
                          ["pluginRootDir",
                           "pluginName",
                           "pluginTitle",
                           "angularFrontendAppDir",
                           "angularFrontendModuleDir",
                           "angularFrontendAssetsDir",
                           "angularMainModule",
                           "angularRootModule",
                           "angularRootService",
                           "angularPluginIcon",
                           "showPluginHomeLink",
                           "showPluginInTitleBar",
                           "titleBarLeft",
                           "titleBarText"])

_routesTemplate = """
    {
        path: '%s',
        loadChildren: "%s/%s"
    }"""

nodeModuleTsConfig = """
{
  "strictNullChecks": true,
  "allowUnreachableCode": true,
  "compilerOptions": {
    "baseUrl": "",
    "declaration": false,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "forceConsistentCasingInFileNames":true,
    "lib": ["es6", "dom"],
    "module": "commonjs",
    "moduleResolution": "node",
    "sourceMap": false,
    "target": "es5",
    "typeRoots": [
      "../@types"
    ]
  }
}
"""

nodeModuleTypingsD = """
/* SystemJS module definition */
declare let module: {
  id: string;
};

declare let require: any;
"""


class FrontendBuilderABC(metaclass=ABCMeta):
    """ Peek App Frontend Installer Mixin

    This class is used for the client and server.

    This class contains the logic for:
        * Linking in the frontend angular components to the frontend project
        * Compiling the frontend project

    :TODO: Use find/sort to generate a string of the files when this was last run.
        Only run it again if anything has changed.

    """

    def __init__(self, frontendProjectDir: str, platformService: str, jsonCfg,
                 loadedPlugins: List):
        assert platformService in (peekClientName, peekServerName), (
            "Unexpected service %s" % platformService)

        self._platformService = platformService
        self._jsonCfg = jsonCfg
        self._frontendProjectDir = frontendProjectDir
        self._loadedPlugins = loadedPlugins

        if not isinstance(self._jsonCfg, PeekFileConfigFrontendDirMixin):
            raise Exception("The file config must inherit the"
                            " PeekFileConfigFrontendDirMixin")

        if not isinstance(self._jsonCfg, PeekFileConfigOsMixin):
            raise Exception("The file config must inherit the"
                            " PeekFileConfigOsMixin")

        if not os.path.isdir(frontendProjectDir):
            raise Exception("% doesn't exist" % frontendProjectDir)

        self.fileSync = FrontendFileSync(lambda f, c: self._syncFileHook(f, c))
        self._dirSyncMap = list()
        self._fileWatchdogObserver = None

    def _loadPluginConfigs(self) -> [PluginDetail]:
        pluginDetails = []

        for plugin in self._loadedPlugins.values():
            assert isinstance(plugin.packageCfg, PluginPackageFileConfig)
            pluginPackageConfig = plugin.packageCfg.config

            jsonCfgNode = pluginPackageConfig[self._platformService.replace('peek-', '')]

            enabled = (jsonCfgNode.enableAngularFrontend(True, require_bool))

            if not enabled:
                continue

            angularFrontendAppDir = (jsonCfgNode.angularFrontendAppDir(None))
            angularFrontendModuleDir = (jsonCfgNode.angularFrontendModuleDir(None))
            angularFrontendAssetsDir = (jsonCfgNode.angularFrontendAssetsDir(None))
            angularMainModule = (jsonCfgNode.angularMainModule(None))

            showPluginHomeLink = (jsonCfgNode.showPluginHomeLink(True))
            showPluginInTitleBar = (jsonCfgNode.showPluginInTitleBar(False))
            titleBarLeft = (jsonCfgNode.titleBarLeft(False))
            titleBarText = (jsonCfgNode.titleBarText(None))

            def checkThing(name, data):
                sub = (name, plugin.name)
                if data:
                    assert data["file"], "%s.file is missing for %s" % sub
                    assert data["class"], "%s.class is missing for %s" % sub

            angularRootModule = (jsonCfgNode.angularRootModule(None))
            checkThing("angularRootModule", angularRootModule)

            angularRootService = (jsonCfgNode.angularRootService(None))
            checkThing("angularRootService", angularRootService)

            angularPluginIcon = (jsonCfgNode.angularPluginIcon(None))

            pluginDetails.append(
                PluginDetail(pluginRootDir=plugin.rootDir,
                             pluginName=plugin.name,
                             pluginTitle=plugin.title,
                             angularFrontendAppDir=angularFrontendAppDir,
                             angularFrontendModuleDir=angularFrontendModuleDir,
                             angularFrontendAssetsDir=angularFrontendAssetsDir,
                             angularMainModule=angularMainModule,
                             angularRootModule=angularRootModule,
                             angularRootService=angularRootService,
                             angularPluginIcon=angularPluginIcon,
                             showPluginHomeLink=showPluginHomeLink,
                             showPluginInTitleBar=showPluginInTitleBar,
                             titleBarLeft=titleBarLeft,
                             titleBarText=titleBarText)
            )

        pluginDetails.sort(key=lambda x: x.pluginName)
        return pluginDetails

    def _writePluginHomeLinks(self, feAppDir: str,
                              pluginDetails: [PluginDetail]) -> None:
        """
        export const homeLinks = [
            {
                name: 'plugin_noop',
                title: "Noop",
                resourcePath: "/peek_plugin_noop",
                pluginIconPath: "/peek_plugin_noop/home_icon.png"
            }
        ];
        """

        links = []
        for pluginDetail in pluginDetails:
            if not (pluginDetail.angularMainModule and pluginDetail.showPluginHomeLink):
                continue

            links.append(dict(name=pluginDetail.pluginName,
                              title=pluginDetail.pluginTitle,
                              resourcePath="/%s" % pluginDetail.pluginName,
                              pluginIconPath=pluginDetail.angularPluginIcon))

        contents = "// This file is auto generated, the git version is blank and .gitignored\n"
        contents += "export const homeLinks = %s;\n" % json.dumps(
            links, sort_keys=True, indent=4, separators=(', ', ': '))

        self._writeFileIfRequired(feAppDir, 'plugin-home-links.ts', contents)

    def _writePluginTitleBarLinks(self, feAppDir: str,
                                  pluginDetails: [PluginDetail]) -> None:
        """
        
        import {TitleBarLink} from "@synerty/peek-client-fe-util";

        export const titleBarLinks :TitleBarLink = [
            {
                plugin : "peek_plugin_noop",
                text: "Noop",
                left: false,
                resourcePath: "/peek_plugin_noop/home_icon.png",
                badgeCount : null
            }
        ];
        """

        links = []
        for pluginDetail in pluginDetails:
            if not (pluginDetail.angularMainModule and pluginDetail.showPluginInTitleBar):
                continue

            links.append(dict(plugin=pluginDetail.pluginName,
                              text=pluginDetail.titleBarText,
                              left=pluginDetail.titleBarLeft,
                              resourcePath="/%s" % pluginDetail.pluginName,
                              badgeCount=None))

        contents = "// This file is auto generated, the git version is blank and .gitignored\n\n"
        contents += "import {TitleBarLink} from '@synerty/peek-client-fe-util';\n\n"
        contents += "export const titleBarLinks :TitleBarLink[] = %s;\n" % json.dumps(
            links, sort_keys=True, indent=4, separators=(', ', ': '))

        self._writeFileIfRequired(feAppDir, 'plugin-title-bar-links.ts', contents)

    def _writePluginRouteLazyLoads(self, feAppDir: str,
                                   pluginDetails: [PluginDetail]) -> None:
        """
        export const pluginRoutes = [
            {
                path: 'plugin_noop',
                loadChildren: "plugin-noop/plugin-noop.module#default"
            }
        ];
        """
        routes = []
        for pluginDetail in pluginDetails:
            if not pluginDetail.angularMainModule:
                continue
            routes.append(_routesTemplate
                          % (pluginDetail.pluginName,
                             pluginDetail.pluginName,
                             pluginDetail.angularMainModule))

        routeData = "// This file is auto generated, the git version is blank and .gitignored\n"
        routeData += "export const pluginRoutes = ["
        routeData += ",".join(routes)
        routeData += "\n];\n"

        self._writeFileIfRequired(feAppDir, 'plugin-routes.ts', routeData)

    def _writePluginRootModules(self, feAppDir: str,
                                pluginDetails: [PluginDetail],
                                serviceName: str) -> None:

        imports = []
        modules = []
        for pluginDetail in pluginDetails:
            if not pluginDetail.angularRootModule:
                continue
            imports.append('import {%s} from "@%s/%s/%s";'
                           % (pluginDetail.angularRootModule["class"],
                              serviceName,
                              pluginDetail.pluginName,
                              pluginDetail.angularRootModule["file"]))
            modules.append(pluginDetail.angularRootModule["class"])

        routeData = "// This file is auto generated, the git version is blank and .gitignored\n"
        routeData += '\n'.join(imports) + '\n'
        routeData += "export const pluginRootModules = [\n\t"
        routeData += ",\n\t".join(modules)
        routeData += "\n];\n"

        self._writeFileIfRequired(feAppDir, 'plugin-root-modules.ts', routeData)

    def _writePluginRootServices(self, feAppDir: str,
                                 pluginDetails: [PluginDetail],
                                 serviceName: str) -> None:

        imports = []
        services = []
        for pluginDetail in pluginDetails:
            if not pluginDetail.angularRootService:
                continue
            imports.append('import {%s} from "@%s/%s/%s";'
                           % (pluginDetail.angularRootService["class"],
                              serviceName,
                              pluginDetail.pluginName,
                              pluginDetail.angularRootService["file"]))
            services.append(pluginDetail.angularRootService["class"])

        routeData = "// This file is auto generated, the git version is blank and .gitignored\n"
        routeData += '\n'.join(imports) + '\n'
        routeData += "export const pluginRootServices = [\n\t"
        routeData += ",\n\t".join(services)
        routeData += "\n];\n"

        self._writeFileIfRequired(feAppDir, 'plugin-root-services.ts', routeData)

    def _writeFileIfRequired(self, dir, fileName, contents):
        fullFilePath = os.path.join(dir, fileName)

        # Since writing the file again changes the date/time,
        # this messes with the self._recompileRequiredCheck
        if os.path.isfile(fullFilePath):
            with open(fullFilePath, 'r') as f:
                if contents == f.read():
                    logger.debug("%s is up to date", fileName)
                    return

        logger.debug("Writing new %s", fileName)

        with open(fullFilePath, 'w') as f:
            f.write(contents)

    def _syncPluginFiles(self, targetDir: str,
                         pluginDetails: [PluginDetail],
                         attrName: str) -> None:

        if not os.path.exists(targetDir):
            os.mkdir(targetDir)  # The parent must exist

        # Make a note of the existing items
        currentItems = set()
        createdItems = set()
        for item in os.listdir(targetDir):
            if item.startswith("peek_plugin_"):
                currentItems.add(item)

        for pluginDetail in pluginDetails:
            frontendDir = getattr(pluginDetail, attrName, None)
            if not frontendDir:
                continue

            srcDir = os.path.join(pluginDetail.pluginRootDir, frontendDir)
            if not os.path.exists(srcDir):
                logger.warning("%s FE dir %s doesn't exist",
                               pluginDetail.pluginName, frontendDir)
                continue

            createdItems.add(pluginDetail.pluginName)

            linkPath = os.path.join(targetDir, pluginDetail.pluginName)
            self.fileSync.addSyncMapping(srcDir, linkPath)

        # Delete the items that we didn't create
        for item in currentItems - createdItems:
            path = os.path.join(targetDir, item)
            if os.path.islink(path):
                os.remove(path)
            elif os.path.isdir(path):
                shutil.rmtree(path)
            else:
                os.remove(path)

    @abstractmethod
    def _syncFileHook(self, fileName: str, contents: bytes) -> bytes:
        """ Sync File Hook
        
        see FrontendFileSync._syncFileHook
        
        """
        pass

    def _updatePackageJson(self, targetJson: str,
                           pluginDetails: [PluginDetail],
                           serviceName: str) -> None:

        # Remove all the old symlinks

        with open(targetJson, 'r') as f:
            jsonData = json.load(f)

        dependencies = jsonData["dependencies"]
        for key in list(dependencies):
            if key.startswith('@' + serviceName):
                del dependencies[key]

        for pluginDetail in pluginDetails:
            if not pluginDetail.angularFrontendModuleDir:
                continue

            moduleDir = os.path.join(pluginDetail.pluginRootDir,
                                     pluginDetail.angularFrontendModuleDir)

            name = "@%s/%s" % (serviceName, pluginDetail.pluginName)
            dependencies[name] = "file:" + moduleDir

        contents = json.dumps(jsonData, f, sort_keys=True, indent=2,
                              separators=(',', ': '))

        self._writeFileIfRequired(os.path.dirname(targetJson),
                                  os.path.basename(targetJson),
                                  contents)

    def _recompileRequiredCheck(self, feBuildDir: str, hashFileName: str) -> bool:
        """ Recompile Check

        This command lists the details of the source dir to see if a recompile is needed

        The find command outputs the following

        543101    0 -rw-r--r--   1 peek     sudo            0 Nov 29 17:27 ./src/app/environment/environment.component.css
        543403    4 drwxr-xr-x   2 peek     sudo         4096 Dec  2 17:37 ./src/app/environment/env-worker
        543446    4 -rw-r--r--   1 peek     sudo         1531 Dec  2 17:37 ./src/app/environment/env-worker/env-worker.component.html

        """
        ignore = (".git", ".idea", "dist", '__pycache__', 'node_modules',
                  '.lastHash', "platforms")
        ignore = ["'%s'" % i for i in ignore]  # Surround with quotes
        grep = "grep -v -e %s " % ' -e '.join(ignore)  # Create the grep command
        cmd = "find -L %s -type f -ls" % feBuildDir # | %s" % (feBuildDir, grep)
        commandComplete = subprocess.run(cmd,
                                         executable=PeekPlatformConfig.config.bashLocation,
                                         stdout=PIPE, stderr=PIPE, shell=True)

        if commandComplete.returncode:
            for line in commandComplete.stdout.splitlines():
                logger.error(line)

            for line in commandComplete.stderr.splitlines():
                logger.error(line)

            raise Exception("Frontend compile diff check failed")

        logger.debug("Frontend compile diff check ran ok")

        newHash = commandComplete.stdout
        fileHash = ""

        if os.path.isfile(hashFileName):
            with open(hashFileName, 'rb') as f:
                fileHash = f.read()

        fileHashLines = set(fileHash.splitlines())
        newHashLines = set(newHash.splitlines())
        changes = False

        for line in fileHashLines - newHashLines:
            changes = True
            logger.debug("Removed %s" % line)

        for line in newHashLines - fileHashLines:
            changes = True
            logger.debug("Added %s" % line)

        if changes:
            with open(hashFileName, 'wb') as f:
                f.write(newHash)

        return changes
