const reporter = require('cucumber-html-reporter');

const options = {
    theme: 'bootstrap',
    jsonFile: 'src/tests/test-results/cucumber-report.json', // Provide the path to your Cucumber JSON report
    output: 'src/tests/test-results/cucumber-report.html', // Specify the output path for the HTML report
    // Other options (metadata, scenarioTimestamp, etc.) can be customized as needed
};

reporter.generate(options)