export var AppConfigError;
(function (AppConfigError) {
    AppConfigError["UNKNOWN_ERROR"] = "error getting remote config";
    AppConfigError["MDM_ERROR"] = "error getting mobile device management config";
    AppConfigError["MISSING_REMOTE_CONFIG_URL_ERROR"] = "error getting remote config url from mobile device management config";
    AppConfigError["INVALID_APP_VERSION"] = "Current app version is below the minimum required app version";
    AppConfigError["VALIDATION_ERROR"] = "invalid remote config schema";
})(AppConfigError || (AppConfigError = {}));
//# sourceMappingURL=app-config.constants.js.map