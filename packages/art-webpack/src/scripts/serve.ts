import { confirmModules } from '../utils/inquirer';
import appConfig from '../config/appConfig';
import choosePort from 'art-dev-utils/lib/choosePort';
import webpackDevServeConfig from '../config/webpackDevServer';
import createCompiler from '../utils/createCompiler';
import { getWebpackConfig } from '../config';
import prepareProxy from 'art-dev-utils/lib/prepareProxy';
import prepareUrls from 'art-dev-utils/lib/prepareUrls';
import paths from '../config/paths';
import WebpackDevServer from 'webpack-dev-server';
import clearConsole from 'art-dev-utils/lib/clearConsole';
import { cyanText } from 'art-dev-utils/lib/chalkColors';
import executeNodeScript from 'art-dev-utils/lib/executeNodeScript';
import * as path from 'path';

const envName = appConfig.get('NODE_ENV');
const HOST = process.env.HOST || '0.0.0.0';
const DEFAULT_PORT = appConfig.get(`devPort:${envName}`);
const isInteractive = process.stdout.isTTY;

let nodeServerHasLunched = false;
const lunchNodeServer = (modules: string, port: number) => {

  if (nodeServerHasLunched) { return; }
  // if (isInteractive) { clearConsole(); }
  const mockServerPath = path.join(__dirname, '../../../art-server-mock/dist/index.js');
  executeNodeScript(
    'node',
    mockServerPath,
    '--ART_MODULES', `${modules}`,
    '--ART_WEBPACK_PORT', `${port}`
  );
  nodeServerHasLunched = true;
};

const confirmModulesCb = (answer) => {
  if (answer.availableModulesOk === false) { return; }
  choosePort(HOST, DEFAULT_PORT)
    .then((port) => {
      if (port === null) { return; }
      // Save new availble webpack dev port.
      appConfig.set(`devPort:${envName}`, port);
      const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
      const urls = prepareUrls(protocol, HOST, port);

      const webpackconfig = getWebpackConfig();
      console.log(`port: ${port}`);

      const compiler = createCompiler(webpackconfig, (success) => {
        if (success) {
          console.log('Compiler instance created successfully.');
          const artModules = appConfig.get('ART_MODULES');
          lunchNodeServer(artModules, port);
        }
      });

      if (compiler === null) { return; }

      const proxySetting = appConfig.get('art:proxy');
      const proxyConfig = prepareProxy(proxySetting);

      const devServerConfig = webpackDevServeConfig(proxyConfig, urls.lanUrlForConfig);

      const devServer = new WebpackDevServer(compiler, devServerConfig);
      devServer.listen(port, HOST, (error) => {
        if (error) {
          return console.log(error);
        }
        console.log(cyanText(`Starting compilers to compiling modules hold on...\n`));
      });

      ['SIGINT', 'SIGTERM'].forEach((sig) => {
        process.on(sig as NodeJS.Signals, () => {
          devServer.close();
          process.exit();
        });
      });

    })
    .catch((error) => {
      if (error && error.message) {
        console.log(error.message);
      }
      process.exit(1);
    });
};

confirmModules(confirmModulesCb);