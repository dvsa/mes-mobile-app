import { RemoteDevToolsConnectionProxy } from './remote-devtools-connection-proxy';
import { connect } from 'remotedev/lib/devTools';
var RemoteDevToolsProxy = /** @class */ (function () {
    function RemoteDevToolsProxy(defaultOptions) {
        this.remotedev = null;
        this.defaultOptions = {
            realtime: true,
            // Needs to match what you run `remotedev` command with and
            // what you setup in remote devtools local connection settings
            hostname: 'localhost',
            port: 8000,
            autoReconnect: true,
            connectTimeout: 20000,
            ackTimeout: 10000,
            secure: true,
        };
        this.defaultOptions = Object.assign(this.defaultOptions, defaultOptions);
    }
    RemoteDevToolsProxy.prototype.connect = function (options) {
        var connectOptions = Object.assign(this.defaultOptions, options);
        this.remotedev = connect(connectOptions);
        var connectionProxy = new RemoteDevToolsConnectionProxy(this.remotedev, connectOptions.instanceId);
        return connectionProxy;
    };
    RemoteDevToolsProxy.prototype.send = function (action, state, options, 
    // shouldStringify?: boolean,
    instanceId) {
        this.remotedev.send(action, state);
    };
    return RemoteDevToolsProxy;
}());
export { RemoteDevToolsProxy };
//# sourceMappingURL=remote-devtools-proxy.js.map