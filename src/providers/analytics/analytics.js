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
import { AppConfigProvider } from '../app-config/app-config';
import { AnalyticsEventCategories, AnalyticsDimensionIndices } from './analytics.model';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Platform } from 'ionic-angular';
import { DateTime } from '../../shared/helpers/date-time';
import { createHash } from 'crypto';
import { DeviceProvider } from '../device/device';
import { AuthenticationProvider } from '../authentication/authentication';
var AnalyticsProvider = /** @class */ (function () {
    function AnalyticsProvider(appConfig, ga, platform, device, authProvider) {
        var _this = this;
        this.appConfig = appConfig;
        this.ga = ga;
        this.platform = platform;
        this.device = device;
        this.authProvider = authProvider;
        this.analyticsStartupError = 'Error starting Google Analytics';
        this.googleAnalyticsKey = '';
        this.initialiseAnalytics = function () {
            return new Promise(function (resolve) {
                _this.googleAnalyticsKey = _this.appConfig.getAppConfig().googleAnalyticsId;
                _this.platform.ready().then(function () {
                    _this.setDeviceId(_this.device.getUniqueDeviceId());
                    _this.setUserId(_this.authProvider.getEmployeeId());
                    _this.addCustomDimension(AnalyticsDimensionIndices.DEVICE_ID, _this.uniqueDeviceId);
                    _this.enableExceptionReporting();
                });
                resolve();
            });
        };
    }
    AnalyticsProvider.prototype.enableExceptionReporting = function () {
        var _this = this;
        this.platform.ready().then(function () {
            if (_this.platform.is('ios')) {
                _this.ga
                    .startTrackerWithId(_this.googleAnalyticsKey)
                    .then(function () {
                    _this.ga.enableUncaughtExceptionReporting(true)
                        .then(function (resp) { })
                        .catch(function (uncaughtError) { return console.log('Error enabling uncaught exceptions', uncaughtError); });
                })
                    .catch(function (error) { return console.log("enableExceptionReporting: " + _this.analyticsStartupError, error); });
            }
        });
    };
    AnalyticsProvider.prototype.setCurrentPage = function (name) {
        var _this = this;
        this.platform.ready().then(function () {
            if (_this.platform.is('ios')) {
                _this.ga
                    .startTrackerWithId(_this.googleAnalyticsKey)
                    .then(function () {
                    _this.ga.trackView(name)
                        .then(function (resp) { })
                        .catch(function (pageError) { return console.log('Error setting page', pageError); });
                })
                    .catch(function (error) { return console.log('Error starting Google Analytics', error); });
            }
        });
    };
    AnalyticsProvider.prototype.logEvent = function (category, event, label, value) {
        var _this = this;
        this.platform.ready().then(function () {
            if (_this.platform.is('ios')) {
                _this.ga
                    .startTrackerWithId(_this.googleAnalyticsKey)
                    .then(function () {
                    _this.ga.trackEvent(category, event, label, value)
                        .then(function (resp) { })
                        .catch(function (eventError) { return console.log('Error tracking event', eventError); });
                })
                    .catch(function (error) { return console.log("logEvent: " + _this.analyticsStartupError, error); });
            }
        });
    };
    AnalyticsProvider.prototype.addCustomDimension = function (key, value) {
        var _this = this;
        if (this.platform.is('ios')) {
            this.ga
                .startTrackerWithId(this.googleAnalyticsKey)
                .then(function () {
                _this.ga.addCustomDimension(key, value)
                    .then(function (resp) { })
                    .catch(function (dimError) { return console.log('Error adding custom dimension ', dimError); });
            })
                .catch(function (error) { return console.log("addCustomDimension: " + _this.analyticsStartupError, error); });
        }
    };
    AnalyticsProvider.prototype.logError = function (type, message) {
        this.logEvent(AnalyticsEventCategories.ERROR, type, message);
    };
    AnalyticsProvider.prototype.logException = function (message, fatal) {
        var _this = this;
        if (this.platform.is('ios')) {
            this.ga
                .startTrackerWithId(this.googleAnalyticsKey)
                .then(function () {
                _this.ga.trackException(message, fatal)
                    .then(function (resp) { })
                    .catch(function (trackingError) { return console.log('Error logging exception in Google Analytics', trackingError); });
            })
                .catch(function (error) { return console.log("logException: " + _this.analyticsStartupError, error); });
        }
    };
    AnalyticsProvider.prototype.setUserId = function (userId) {
        var _this = this;
        if (this.platform.is('ios')) {
            this.uniqueUserId = createHash('sha256').update(userId || 'unavailable').digest('hex');
            this.ga
                .startTrackerWithId(this.googleAnalyticsKey)
                .then(function () {
                _this.addCustomDimension(AnalyticsDimensionIndices.USER_ID, _this.uniqueUserId);
                _this.ga.setUserId(_this.uniqueUserId)
                    .then(function (resp) { })
                    .catch(function (idError) { return console.log("Error setting userid " + _this.uniqueUserId, idError); });
            })
                .catch(function (error) { return console.log("setUserId: " + _this.analyticsStartupError, error); });
        }
    };
    AnalyticsProvider.prototype.setDeviceId = function (deviceId) {
        this.uniqueDeviceId = createHash('sha256').update(deviceId || 'defaultDevice').digest('hex');
        this.addCustomDimension(AnalyticsDimensionIndices.DEVICE_ID, this.uniqueDeviceId);
    };
    AnalyticsProvider.prototype.getDiffDays = function (userDate) {
        var today = new DateTime();
        return today.daysDiff(userDate);
    };
    AnalyticsProvider.prototype.getDescriptiveDate = function (userDate) {
        var ret;
        var daysDiff = this.getDiffDays(userDate);
        switch (daysDiff) {
            case -1:
                ret = 'Yesterday';
                break;
            case 0:
                ret = 'Today';
                break;
            case 1:
                ret = 'Tomorrow';
                break;
            default:
                ret = userDate;
                break;
        }
        return ret;
    };
    AnalyticsProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AppConfigProvider,
            GoogleAnalytics,
            Platform,
            DeviceProvider,
            AuthenticationProvider])
    ], AnalyticsProvider);
    return AnalyticsProvider;
}());
export { AnalyticsProvider };
//# sourceMappingURL=analytics.js.map