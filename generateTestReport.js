var reporter = require('cucumber-html-reporter');

var options = {
  theme: 'bootstrap',
  jsonFile: 'test-reports/cucumber-report.json',
  output: 'test-reports/cucumber-report.html',
  reportSuiteAsScenarios: true,
  launchReport: false
};

reporter.generate(options);
