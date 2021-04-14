export var SAVE_LOG = '[GLOBAL] Save Log';
export var START_SENDING_LOGS = '[AppComponent] Start Sending Logs';
export var SEND_LOGS = '[LogsEffects] Send Logs';
export var SEND_LOGS_SUCCESS = '[LogsEffects] Send Logs Success';
export var SEND_LOGS_FAILURE = '[LogsEffects] Send Logs Failure';
export var LOAD_LOG = '[GLOBAL] Load Logs';
export var LOAD_LOG_STATE = '[GLOBAL] Load Log State';
export var PERSIST_LOG = '[LogsEffects] Persist Logs';
var SaveLog = /** @class */ (function () {
    function SaveLog(payload) {
        this.payload = payload;
        this.type = SAVE_LOG;
    }
    return SaveLog;
}());
export { SaveLog };
var StartSendingLogs = /** @class */ (function () {
    function StartSendingLogs() {
        this.type = START_SENDING_LOGS;
    }
    return StartSendingLogs;
}());
export { StartSendingLogs };
var SendLogs = /** @class */ (function () {
    function SendLogs() {
        this.type = SEND_LOGS;
    }
    return SendLogs;
}());
export { SendLogs };
var SendLogsSuccess = /** @class */ (function () {
    function SendLogsSuccess(timestamps) {
        this.timestamps = timestamps;
        this.type = SEND_LOGS_SUCCESS;
    }
    return SendLogsSuccess;
}());
export { SendLogsSuccess };
var SendLogsFailure = /** @class */ (function () {
    function SendLogsFailure(error) {
        this.error = error;
        this.type = SEND_LOGS_FAILURE;
    }
    return SendLogsFailure;
}());
export { SendLogsFailure };
var PersistLog = /** @class */ (function () {
    function PersistLog() {
        this.type = PERSIST_LOG;
    }
    return PersistLog;
}());
export { PersistLog };
var LoadLog = /** @class */ (function () {
    function LoadLog() {
        this.type = LOAD_LOG;
    }
    return LoadLog;
}());
export { LoadLog };
var LoadLogState = /** @class */ (function () {
    function LoadLogState(payload) {
        this.payload = payload;
        this.type = LOAD_LOG_STATE;
    }
    return LoadLogState;
}());
export { LoadLogState };
//# sourceMappingURL=logs.actions.js.map