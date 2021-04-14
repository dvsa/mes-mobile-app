export var LOAD_APP_INFO = '[AppComponent] Load App Info';
export var LOAD_APP_INFO_SUCCESS = '[AppInfoEffects] Load App Info Success';
export var LOAD_APP_INFO_FAILURE = '[AppInfoEffects] Load App Info Failure';
export var LOAD_EMPLOYEE_ID = '[LoginComponent] Load employee ID';
export var LOAD_EMPLOYEE_NAME = '[LoginComponent] Load employee name';
export var LOAD_EMPLOYEE_NAME_SUCCESS = '[LoginComponent] Load employee name success';
export var LOAD_CONFIG_SUCCESS = '[AppInfoEffects] Load Config Success';
export var SET_DATE_CONFIG_LOADED = '[AppInfoEffects] Set Date Config Loaded';
export var APP_SUSPENDED = '[AppInfoEffects] App Suspended';
export var APP_RESUMED = '[AppInfoEffects] App Resumed';
export var RESTART_APP = '[AppInfoEffects] Restart App';
var LoadAppInfo = /** @class */ (function () {
    function LoadAppInfo() {
        this.type = LOAD_APP_INFO;
    }
    return LoadAppInfo;
}());
export { LoadAppInfo };
var LoadAppInfoSuccess = /** @class */ (function () {
    function LoadAppInfoSuccess(versionNumber) {
        this.versionNumber = versionNumber;
        this.type = LOAD_APP_INFO_SUCCESS;
    }
    return LoadAppInfoSuccess;
}());
export { LoadAppInfoSuccess };
var LoadAppInfoFailure = /** @class */ (function () {
    function LoadAppInfoFailure(error) {
        this.error = error;
        this.type = LOAD_APP_INFO_FAILURE;
    }
    return LoadAppInfoFailure;
}());
export { LoadAppInfoFailure };
var LoadEmployeeId = /** @class */ (function () {
    function LoadEmployeeId(employeeId) {
        this.employeeId = employeeId;
        this.type = LOAD_EMPLOYEE_ID;
    }
    return LoadEmployeeId;
}());
export { LoadEmployeeId };
var LoadEmployeeName = /** @class */ (function () {
    function LoadEmployeeName() {
        this.type = LOAD_EMPLOYEE_NAME;
    }
    return LoadEmployeeName;
}());
export { LoadEmployeeName };
var LoadEmployeeNameSuccess = /** @class */ (function () {
    function LoadEmployeeNameSuccess(employeeName) {
        this.employeeName = employeeName;
        this.type = LOAD_EMPLOYEE_NAME_SUCCESS;
    }
    return LoadEmployeeNameSuccess;
}());
export { LoadEmployeeNameSuccess };
var LoadConfigSuccess = /** @class */ (function () {
    function LoadConfigSuccess() {
        this.type = LOAD_CONFIG_SUCCESS;
    }
    return LoadConfigSuccess;
}());
export { LoadConfigSuccess };
var SetDateConfigLoaded = /** @class */ (function () {
    function SetDateConfigLoaded(refreshDate) {
        this.refreshDate = refreshDate;
        this.type = SET_DATE_CONFIG_LOADED;
    }
    return SetDateConfigLoaded;
}());
export { SetDateConfigLoaded };
var AppSuspended = /** @class */ (function () {
    function AppSuspended() {
        this.type = APP_SUSPENDED;
    }
    return AppSuspended;
}());
export { AppSuspended };
var AppResumed = /** @class */ (function () {
    function AppResumed() {
        this.type = APP_RESUMED;
    }
    return AppResumed;
}());
export { AppResumed };
var RestartApp = /** @class */ (function () {
    function RestartApp() {
        this.type = RESTART_APP;
    }
    return RestartApp;
}());
export { RestartApp };
//# sourceMappingURL=app-info.actions.js.map