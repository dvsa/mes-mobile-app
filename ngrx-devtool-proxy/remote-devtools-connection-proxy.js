var RemoteDevToolsConnectionProxy = /** @class */ (function () {
    function RemoteDevToolsConnectionProxy(remotedev, instanceId) {
        this.remotedev = remotedev;
        this.instanceId = instanceId;
    }
    RemoteDevToolsConnectionProxy.prototype.init = function () { };
    RemoteDevToolsConnectionProxy.prototype.error = function () { };
    RemoteDevToolsConnectionProxy.prototype.subscribe = function (listener) {
        var listenerWrapper = function (change) {
            console.log("change: ", change);
            listener(change);
        };
        this.remotedev.subscribe(listenerWrapper);
        // Hack fix for commit/time-travelling etc. if the devtools are already open
        setTimeout(function () { return listenerWrapper({ type: 'START' }); });
    };
    RemoteDevToolsConnectionProxy.prototype.unsubscribe = function () {
        var _this = this;
        // HACK fix bug in @ngrx/store-devtools that calls this instead of returning
        // a lambda that calls it when their Observable wrapper is unsubscribed.
        return function () { return _this.remotedev.unsubscribe(_this.instanceId); };
    };
    RemoteDevToolsConnectionProxy.prototype.send = function (action, state) {
        // Was commented has 'Not Called' but it's appear
        // we finally need this to send back responses to Redux DevTools
        this.remotedev.send(action, state);
    };
    return RemoteDevToolsConnectionProxy;
}());
export { RemoteDevToolsConnectionProxy };
//# sourceMappingURL=remote-devtools-connection-proxy.js.map