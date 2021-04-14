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
import { SecureStorage } from '@ionic-native/secure-storage';
import { NetworkStateProvider } from '../network-state/network-state';
import { Platform } from 'ionic-angular';
import { SaveLog } from '../../modules/logs/logs.actions';
import { LogType } from '../../shared/models/log.model';
import { Store } from '@ngrx/store';
import { LogHelper } from '../logs/logsHelper';
var DataStoreProvider = /** @class */ (function () {
    function DataStoreProvider(platform, secureStorage, networkState, store$, logHelper) {
        this.platform = platform;
        this.secureStorage = secureStorage;
        this.networkState = networkState;
        this.store$ = store$;
        this.logHelper = logHelper;
        this.defaultStoreName = 'MES';
        this.secureContainer = null;
    }
    DataStoreProvider.prototype.setSecureContainer = function (container) {
        this.secureContainer = container;
    };
    DataStoreProvider.prototype.getSecureContainer = function () {
        return this.secureContainer;
    };
    /**
     * Get all stored keys
     * NOTE: secureContainer guard clause allows app to run in browser
     * @returns Promise
     */
    DataStoreProvider.prototype.getKeys = function () {
        if (!this.secureContainer) {
            return Promise.resolve(['']);
        }
        return this.secureContainer.keys().then(function (response) {
            return response;
        });
    };
    /**
     * Gets the specified item for the given key
     * NOTE: secureContainer guard clause allows app to run in browser
  
     * @param  {string} key
     * @returns Promise
     */
    DataStoreProvider.prototype.getItem = function (key) {
        if (!this.secureContainer) {
            return Promise.resolve('');
        }
        return this.secureContainer.get(key).then(function (response) {
            return response;
        });
    };
    /**
     * sets the value for specified key
     * NOTE: secureContainer guard clause allows app to run in browser
     * @param  {string} key
     * @param  {any} value
     * @returns Promise
     */
    DataStoreProvider.prototype.setItem = function (key, value) {
        var _this = this;
        if (!this.secureContainer) {
            return Promise.resolve('');
        }
        return this.secureContainer.set(key, value).then(function (response) {
            return response;
        }).catch(function (error) {
            _this.store$.dispatch(new SaveLog(_this.logHelper
                .createLog(LogType.ERROR, "Setting local storage item: " + key, error)));
            return error;
        });
    };
    /**
     * removes the item for a given key
     * NOTE: secureContainer guard clause allows app to run in browser
     * @param  {string} key
     * @returns Promise
     */
    DataStoreProvider.prototype.removeItem = function (key) {
        if (!this.secureContainer) {
            return Promise.resolve('');
        }
        return this.secureContainer.remove(key).catch(function (error) {
            console.error("error removing " + key + ". Error is: " + error.message);
            return Promise.resolve('');
        });
    };
    DataStoreProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Platform,
            SecureStorage,
            NetworkStateProvider,
            Store,
            LogHelper])
    ], DataStoreProvider);
    return DataStoreProvider;
}());
export { DataStoreProvider };
//# sourceMappingURL=data-store.js.map