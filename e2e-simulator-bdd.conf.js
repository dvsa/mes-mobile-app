var appPath = __dirname + '/platforms/ios/build/emulator/DrivingExaminerService.app';
//var wd = require('wd');        //browserstack configuration
//var assert = require('assert');     //browserstack configuration
//var asserters = wd.asserters;     //browserstack configuration

exports.config = {
  //seleniumAddress: 'http://hub-cloud.browserstack.com/wd/hub',    //browserstack configuration
  seleniumAddress: 'http://localhost:4723/wd/hub',             //should be commented when run on BS
  allScriptsTimeout: 30000,
  capabilities: {
    // 'device' : 'iPad Pro 11 2018',  //browserstack configuration
    // 'os_version' : '12',           //browserstack configuration
    platformName: 'iOS',    //should be commented when run on browserstack
    platformVersion: '12.1',  //should be commented when run on browserstack
    deviceName: 'iPad Pro (10.5-inch)', //should be commented when run on browserstack
    browserName: '',
    autoWebview: true,
    fullReset: true,  //should be commented when run on browserstack
    app: appPath,  //should be commented when run on browserstack
    automationName: 'XCUITest',
    isHeadless: false,
    newCommandTimeout: 180,
    // 'browserstack.user' : 'syednaqvi3',           //browserstack configuration
    // 'browserstack.key' : 'UeHpi79yeyq5UkEquCdL',    //browserstack configuration
    // 'project': 'My First Project',                  //browserstack configuration
    // 'build' : 'My First Build',                     //browserstack configuration
    // 'name': 'Bstack-[Node] Sample Test',               //browserstack configuration
    // 'app' : 'bs://5d2ace31755ff0ddd72d626374232ce9160e1553'   //browserstack configuration
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
