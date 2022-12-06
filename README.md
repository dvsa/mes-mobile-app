# *****  THIS REPOSITORY HAS BEEN ARCHIVED AND IS NO LONGER MAINTAINED *****

All code has been migrated to [this repository](https://github.com/dvsa/des-mobile-app)

# mobile-examiner

DVSA Mobile Examiner Services (GDS Beta phase)

## Mobile Client

### Pre-requisites

- Node (v 10.13.0)
- npm (v 6.4.1)
- Ionic CLI + Cordova: `npm install -g ionic`
- Cordova (ionic enterprise version - uninstall any other globally installed version) `npm install -g @ionic-enterprise/cordova`
- Security
  - [Git secrets](https://github.com/awslabs/git-secrets)
  - [ScanRepo](https://github.com/UKHomeOffice/repo-security-scanner)
    - latest version: scanrepo-0.4.0-darwin-amd64.tar.gz
    - Add to path (using echo $PATH to find your path)
 - NOTE: you wil need to obtain `ionic-config.json` and `.npmrc` files containing the ionic enterprise licence keys and save to the project root in order to build the app.

### Get started

- `npm ci`
- `npm run config:dev` (if using the dev config)
- `npm run schema-version`
- `ionic serve`

### Serve with local data
- `npm run serve:local` (This will take the files in `/mock/` and serve them. You can edit them in `src/assets/mock` after running the command, this will live reload the UI with the new updated mock data. To point the app to different mock data, edit the `environment/environment.local.ts` file)

### Serve to iOS Emulator with livereload and Redux Remote Devtools

Run the following in separate terminals:

- `npm run remote-devtools-server`
- `npm run serve:emulator` (Note: you must have simulator / iOS version specified in the `package.json` file installed via Xcode)

To open Redux Remote Devtools:

- install the [Chrome Redux Devtools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) extension if not already installed
- right click the icon in your browser toolbar and select 'Open Remote Devtools'
- on first launch, you will need to update the settings as follows
    - select use custom (local) 
    - set the host name to `localhost`
    - set the port to `8000`

### Mac users

To run the app in the simulator with live code reload, run the following:
`ionic cordova emulate ios -lc --address=localhost`

### Building for production

To build the app for production, run `ionic cordova build ios --prod`

__N.B__ _As of [#1091](https://github.com/dvsa/mes-mobile-app/pull/1091) the app size has grown to a point that causes the default heap memory limit to be exceeded when building with the `--prod` flag enabled. Increase the memory limit by setting this Node environment variable before the build:-_  
  
  ```export NODE_OPTIONS=--max-old-space-size=4096```  
  
_See this [this GH issue](https://github.com/ionic-team/ionic-app-scripts/issues/1036) for more info._

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

You can run the Appium testsuite against an iOS simulator.

Pre-requisites

- iPad Pro 10.5 Simulator running iOS 12.1 (If you are running the latest version of XCode you will need to manually download this `XCode > Preferences ... > Components > iOS 12.1 Simulator`). iOS 12.1 is the default but there is now support for 12.2 which may save you having to download the 12.1 simulator (see below)
- XCode 11: If you are running XCode 11 you will need to use the beta version of appium (`npm install -g appium@beta`) and run this using `appium` rather than `npx appium` which uses the version specified in package.json
- Carthage (`brew install carthage` - https://github.com/appium/appium/blob/HEAD/docs/en/drivers/ios-xcuitest.md - dependancy of XCUITest driver)
- Notes : if you get /usr/local/share/man issues 
          try: sudo chown -R $(whoami):admin /usr/local/share/man (don't sudo brew)

To run against the simulator

- Build the application `ionic cordova build ios -- --buildFlag="-UseModernBuildSystem=0" --emulator`
- Run Appium `npx appium` (To reduce wait times you can install appium globally and use that instead)
- Add/Update the test/e2e/test.config.ts
- In another tab execute the simulator based testsuite `npm run test:e2e-simulator-bdd`
- Once complete generate the report `npm run test:generate-report`

You can run individual features e.g. `npm run test:e2e-simulator-bdd -- --specs='test/e2e/features/01-login.feature'`

You can also run an individual tag e.g. `npm run test:e2e-simulator-bdd -- --cucumberOpts.tags='@smoke'`

To run against a simulator with a different iOS version e.g. `npm run test:e2e-simulator-bdd -- --capabilities.platformVersion='12.2'`

By default screenshots are only taken on scenario error but you can override this passing the screenshotAlways argument e.g. `npm run test:e2e-simulator-bdd -- --screenshotAlways=true`

#### Troubleshooting

##### Bad app... paths need to be absolute

This error is due to the `mes-mobile-app.app` file not being found when trying to run the tests. Make sure you have the app built.
If you have an iPad plugged into your laptop, you may find that the `emulator` platform is missing from `platforms/ios/build` - try unplugging the iPad and rebuilding.

### Building & signing the app using Fastlane
N.B. this assumes you have Fastlane installed along with the required DVSA distribution certificate & provisioning profile. This is done via the Mac OS Jenkins slave so these steps are only for information only. 

#### Unlock Keychain
The login keychain needs to be unlocked if this is running as part of a CI build:

```
security unlock-keychain -p "$PASSWORD" /Users/$USERNAME/Library/Keychains/$KEYCHAIN_NAME
security set-keychain-settings -t 1900 -l /Users/$USERNAME/Library/Keychains/$KEYCHAIN_NAME
```

#### Build

 Run `fastlane ios build` 
 
 The output of this will be a signed .IPA package stored in the `build` directory.

### Reporting logs to the logs service

The mobile app authenticates to the [mes-logs-service](https://github.com/dvsa/mes-logs-service) (where app logs are sent) using an API Gateway API key.
An API key for this purpose is created in each environment by Terraform. To obtain it, assume a role with read permission and run:

```shell
bin/fetch-logs-api-key.sh <env>
```

If successful, you should see the `logsPostApiKey` key populated in `environment.ts`.

### Xcode 11 Issue
There is currently an issue building the app in Xcode 11. The following workaround can be used to get past this

- Run `ionic cordova build ios`
- Open `platforms/ios/cordova/lib/list-emulator-build-targets`
- Change the following code:
FROM:
    `if (device.name === deviceType.name.replace(/\-inch/g, ' inch') && device.availability.toLowerCase().indexOf('unavailable') < 0) {`
TO:
    `if (device.name === deviceType.name.replace(/\-inch/g, ' inch') && device.isAvailable) {`
- Run `ionic cordova build ios -- --buildFlag="-UseModernBuildSystem=0"`
- Successful Build
- Any additional builds will succeed if you run `ionic cordova build ios -- --buildFlag="-UseModernBuildSystem=0"` and haven't deleted the platforms folder
