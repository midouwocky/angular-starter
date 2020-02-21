const scanner = require('sonarqube-scanner');

scanner(
  {
    // this example uses local instance of SQ
    serverUrl: 'https://sonar.tech-instinct.com/',
    options: {
      'sonar.projectVersion': '1.1.0',
      'sonar.sources': 'src',
      'sonar.typescript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.testExecutionReportPaths': 'test-report.xml',
    },
  },
  () => {
    // callback is required
    console.log(
      '*********************** done ********************************'
    );
  }
);
