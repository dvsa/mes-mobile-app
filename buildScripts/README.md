# Build process

There are two npm scripts provided:

* `npm run package` - generates an IPA file to (eventually be consumed by CI/CD).
* `npm run device` - installs the app on a device plugged in via USB. You must have [ios-deploy](https://www.npmjs.com/package/ios-deploy) installed, setup a provisioning profile with your personal iTunes account and setup the `build.json` file described below.

## build.json

In this directory, create a `build.json` file containing the following:

```
{
  "ios": {
    "development": {
      "codeSignIdentity": "iPhone Developer",
      "automaticProvisioning": true,
      "developmentTeam": "<YOUR-TEAM-ID>",
      "packageType": "development",
      "buildFlag": [
          "-UseModernBuildSystem=0"
      ]
    },
    "release": {
      "codeSignIdentity": "iPhone Developer",
      "automaticProvisioning": true,
      "developmentTeam": "<YOUR-TEAM-ID>",
      "packageType": "development",
      "buildFlag": [
          "-UseModernBuildSystem=0"
      ]
    }
  }
}
```

Populate your team ID by searching for `TeamIdentifier` in your provisioning profile (found at `~/Library/MobileDevice/Provisioning Profiles`).

## Release Profile

The release profile is not _yet_ configured to work with the production signing identity. This will come later on.
