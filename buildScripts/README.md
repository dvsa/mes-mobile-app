# Build process

## Scripts
There are two npm scripts provided:

* `npm run package` - generates an IPA file to (eventually be consumed by CI/CD).
* `npm run device` - installs the app on a device plugged in via USB.

## Pre-requisites
* XCode 10.0
* [ios-deploy](https://www.npmjs.com/package/ios-deploy) (for `npm run device`)
* A provisioning profile on your Mac. This can be a personal iTunes account for local development.
* Setup `build.json` as described below.

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
