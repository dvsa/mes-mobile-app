exports.config = {
  seleniumAddress: 'http://hub-cloud.browserstack.com/wd/hub',
  allScriptsTimeout: 60000,
  capabilities: {
    'browserstack.user' : '<BROWSER_STACK_USER>',
    'browserstack.key' : '<BROWSER_STACK_KEY>',
    'project' : 'DES',
    'build' : 'DES Build',
    'name': 'DES Test',
    app: '<BROWSER_STACK_FILE_ID>',
    os_version: '12',
    device: 'iPad Air 2019',
    browserName: 'iPad',
    autoWebview: true,
    automationName: 'XCUITest',
    realMobile: true,
    'browserstack.appium_version': '1.17.0'
  },
  specs: ['./test/e2e/features/*/*.feature'],
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    compiler: 'ts:ts-node/register',
    format: ['json:./test-reports/cucumber-report.json', 'node_modules/cucumber-pretty'],
    require: ['./test/e2e/step-definitions/*.ts'],
    'fail-fast': true
  },
  baseUrl: '',
  useAllAngular2AppRoots: true,
  beforeLaunch: function() {
    require('ts-node').register({
      project: 'test/e2e/tsconfig.e2espec.json'
    });

    var fs = require('fs');
    var dir = './test-reports';

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  },
  screenshotAlways: false
};
