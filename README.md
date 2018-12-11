# mobile-examiner

DVSA Mobile Examiner Services (GDS Beta phase)

## Mobile Client

### Pre-requisites

- Node (v 11.0.0)
- npm (v 6.4.1)
- Ionic CLI + Cordova: `npm install -g cordova ionic`
- Security
  - [Git secrets](https://github.com/awslabs/git-secrets)
  - [ScanRepo](https://github.com/UKHomeOffice/repo-security-scanner)

### Get started

- Set up your [environment variables](https://wiki.i-env.net/display/MES/Application+environment+variables)
- `npm install`
- `ionic serve`

### Mac users

To run the app in the simulator with live code reload, run the following:
`ionic cordova emulate ios -lc --address=localhost`

### Manual Deployments

- `npm run ionic:deploy`

### Security Tools

**NOTE: There is currently an issue using bash v4 with git secrets, in that it will only allow single file commits. This has been reported numerous times but support for this tool seems to be limited and where an earlier fix should have resolved this problem, it is still an issue.**
[git secrets issues](https://github.com/awslabs/git-secrets/issues)

After installing git secrets as part of the pre-requisites, run a one-time set up (in each repo) with

```bash
  cd /path/to/my/repo
  git secrets --install
  git secrets --register-aws
```

Run with `git secrets --scan`.

After installing scanRepo as part of the pre-requisites, run with `git log -p | scanrepo`.

### Cordova plugins in browser

Some Cordova plugins have special code that should handle the `browser` platform. Unfortunately `ionic serve` does not use them. To use them, run `ionic cordova run browser`

### Running the Appium/Selenium testsuite

You can run the Appium testsuite either against a web based version of the application or against a simulator version.

Pre-requisites

- Appium (https://www.npmjs.com/package/appium)
- WebDriver-Manager (https://www.npmjs.com/package/webdriver-manager)

To run against the web based version

- Run the application as per the Get started guide above with fixed port id to match test setup `ionic serve --port 8101`
- In a separate tab run up up the WebDriver manager `webdriver-manager start`
- In another tab execute the browser based testsuite `npm run test:e2e-browser-bdd`
- Once complete generate the report `npm run test:generate-report`

To run against the simulator

- Build the application `ionic cordova build ios -- --buildFlag="-UseModernBuildSystem=0"`
- Run Appium `appium`
- In another tab execute the simulator based testsuite `npm run test:e2e-simulator-bdd`
- Once complete generate the report `npm run test:generate-report`
