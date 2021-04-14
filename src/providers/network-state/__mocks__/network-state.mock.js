import { of } from 'rxjs';
import { ConnectionStatus } from '../network-state';
var NetworkStateProviderMock = /** @class */ (function () {
    function NetworkStateProviderMock() {
    }
    NetworkStateProviderMock.prototype.onNetworkChange = function () {
        return of(ConnectionStatus.OFFLINE);
    };
    NetworkStateProviderMock.prototype.initialiseNetworkState = function () { };
    NetworkStateProviderMock.prototype.getNetworkState = function () {
        return ConnectionStatus.ONLINE;
    };
    return NetworkStateProviderMock;
}());
export { NetworkStateProviderMock };
//# sourceMappingURL=network-state.mock.js.map