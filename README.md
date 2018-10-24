# mobile-examiner-alpha

DVSA Mobile Examiner Services (GDS Alpha phase)

## Mobile Client Prototype

### Pre-requisites

* Node (v 8.9.x)
* npm (v 5.5.1)
* Ionic CLI + Cordova: `npm install -g cordova ionic`
* Security
  * [Git secrets](https://github.com/awslabs/git-secrets)
  * [ScanRepo](https://github.com/UKHomeOffice/repo-security-scanner)

### Get started

* Set up your [environment variables](https://wiki.i-env.net/display/MES/Application+environment+variables)
* `npm install`
* `ionic serve`

### Mac users

To run the app in the simulator with live code reload, run the following:
`ionic cordova emulate ios -lc --address=localhost`

### Manual Deployments

* `npm run ionic:deploy`

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
