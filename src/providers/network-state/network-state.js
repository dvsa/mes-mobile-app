var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs';
export var ConnectionStatus;
(function (ConnectionStatus) {
    ConnectionStatus[ConnectionStatus["ONLINE"] = 0] = "ONLINE";
    ConnectionStatus[ConnectionStatus["OFFLINE"] = 1] = "OFFLINE";
})(ConnectionStatus || (ConnectionStatus = {}));
var NetworkStateProvider = /** @class */ (function () {
    function NetworkStateProvider(network, platform) {
        this.network = network;
        this.platform = platform;
        this.networkStatus$ = new BehaviorSubject(ConnectionStatus.OFFLINE);
    }
    NetworkStateProvider.prototype.initialiseNetworkState = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.initialiseNetworkEvents();
            var status = _this.network.type !== 'none' ? ConnectionStatus.ONLINE : ConnectionStatus.OFFLINE;
            _this.networkStatus$.next(status);
        });
    };
    NetworkStateProvider.prototype.initialiseNetworkEvents = function () {
        var _this = this;
        this.network.onDisconnect().subscribe(function () {
            _this.updateNetworkStatus(ConnectionStatus.OFFLINE);
        });
        this.network.onConnect().subscribe(function () {
            _this.updateNetworkStatus(ConnectionStatus.ONLINE);
        });
    };
    NetworkStateProvider.prototype.updateNetworkStatus = function (status) {
        this.networkStatus$.next(status);
    };
    NetworkStateProvider.prototype.onNetworkChange = function () {
        return this.networkStatus$.asObservable();
    };
    /**
     * Gets whether the network is online or offline
     * NOTE: networkStatus$ guard clause allows app to run in browser
     * @returns ConnectionStatus
     */
    NetworkStateProvider.prototype.getNetworkState = function () {
        if (!this.networkStatus$) {
            return ConnectionStatus.ONLINE;
        }
        return this.networkStatus$.getValue();
    };
    NetworkStateProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Network, Platform])
    ], NetworkStateProvider);
    return NetworkStateProvider;
}());
export { NetworkStateProvider };
//# sourceMappingURL=network-state.js.map