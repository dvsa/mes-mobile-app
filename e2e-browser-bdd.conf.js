exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub/',
  allScriptsTimeout: 11000,
  capabilities: {
    browserName: 'chrome'
  },
  specs: ['./test/e2e/features/*.feature'],
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    compiler: 'ts:ts-node/register',
    format: 'json:./test_reports/cucumber_report.json',
    require: ['./test/e2e/step_definitions/*.ts']
  },

  baseUrl: 'http://localhost:8101/',

  useAllAngular2AppRoots: true,
  beforeLaunch: function() {
    require('ts-node').register({
      project: 'e2e'
    });

    var fs = require('fs');
    var dir = './test_reports';

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  }
};
