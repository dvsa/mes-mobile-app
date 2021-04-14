var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { merge, get } from 'lodash';
import { environment } from '../../environment/environment';
import { DataStoreProvider } from '../data-store/data-store';
import { NetworkStateProvider, ConnectionStatus } from '../network-state/network-state';
import { AppConfigError } from './app-config.constants';
import { AuthenticationError } from './../authentication/authentication.constants';
import { Platform } from 'ionic-angular';
import { timeout } from 'rxjs/operators';
import { SaveLog } from '../../modules/logs/logs.actions';
import { LogType } from '../../shared/models/log.model';
import { Store } from '@ngrx/store';
import { LogHelper } from '../logs/logsHelper';
import { AppInfoProvider } from '../app-info/app-info';
import { SchemaValidatorProvider } from '../schema-validator/schema-validator';
/**
 *  How Loading Config Works
 *
 *  IOS Devices
 *
 *  If the device is IOS it will attempt to create a Environment file in from configuration provided from MDM
 *  using loadManagedConfig().
 *
 *  If this fails then it will use the Enviroment configuration
 *  provided by the enviroment file at ../../enviroment/enviroment which is required for the app to build
 *
 *  In the Login page for an IOS device the App Config initialiseAppConfig() is ran
 *  followed by loadRemoteConfig() which makes an api call to the configuration microservice
 *  and then calls mapRemoteConfig()
 *
 *  If loading the remote config fails we fall back to getCachedRemoteConfig() which should load
 *  the configuration from a previous run of the app from the on device database.
 *
 *  Non IOS Devices
 *
 *  Non ios devcies will always use the enviroment file at ../../enviroment/enviroment
 *
 *  In the Login page for a non IOS device initialiseAppConfig() is run which also calls mapRemoteConfig() to
 *  load more config from the enviroment file.
 *
 *  As on non-IOS devices we can't authenticate with AWS so the enviroment file should always have the setting
 *  isRemote set to false
 */
var AppConfigProvider = /** @class */ (function () {
    function AppConfigProvider(httpClient, networkState, dataStore, platform, store$, logHelper, appInfoProvider, schemaValidatorProvider) {
        var _this = this;
        this.httpClient = httpClient;
        this.networkState = networkState;
        this.dataStore = dataStore;
        this.platform = platform;
        this.store$ = store$;
        this.logHelper = logHelper;
        this.appInfoProvider = appInfoProvider;
        this.schemaValidatorProvider = schemaValidatorProvider;
        this.environmentFile = environment;
        this.isDebugMode = false;
        this.initialiseAppConfig = function () { return __awaiter(_this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!this.platform.is('ios')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getDebugMode()];
                    case 1:
                        _a.sent();
                        this.loadManagedConfig();
                        _a.label = 2;
                    case 2:
                        this.mapInAppConfig(this.environmentFile);
                        if (!this.environmentFile.isRemote) {
                            this.mapRemoteConfig(this.environmentFile);
                        }
                        return [2 /*return*/, Promise.resolve()];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(AppConfigError.MDM_ERROR)];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getAppConfig = function () {
            if (!_this.appConfig) {
                _this.initialiseAppConfig();
            }
            return _this.appConfig;
        };
        this.loadRemoteConfig = function () {
            return _this.getRemoteData()
                .then(function (data) {
                var result = _this.schemaValidatorProvider.validateRemoteConfig(data);
                if (result.error !== null) {
                    return Promise.reject(result.error);
                }
                return data;
            })
                .then(function (data) { return _this.mapRemoteConfig(data); })
                .catch(function (error) {
                if (error instanceof HttpErrorResponse) {
                    _this.store$.dispatch(new SaveLog(_this.logHelper.createLog(LogType.ERROR, 'Loading remote config', error.message)));
                    if (error && error.status === 403) {
                        return Promise.reject(AuthenticationError.USER_NOT_AUTHORISED);
                    }
                    if (error && error.error === AppConfigError.INVALID_APP_VERSION) {
                        return Promise.reject(AppConfigError.INVALID_APP_VERSION);
                    }
                    return Promise.reject(AppConfigError.UNKNOWN_ERROR);
                }
                _this.store$.dispatch(new SaveLog(_this.logHelper.createLog(LogType.ERROR, 'Validating remote config', error.details[0].message)));
                return Promise.reject(AppConfigError.VALIDATION_ERROR);
            });
        };
        this.loadManagedConfig = function () {
            if (get(cordova, 'plugins.AppConfig', false)) {
                var appConfigPlugin = cordova.plugins.AppConfig;
                var newEnvFile = {
                    configUrl: appConfigPlugin.getValue('configUrl'),
                    daysToCacheJournalData: appConfigPlugin.getValue('daysToCacheJournalData'),
                    daysToCacheLogs: appConfigPlugin.getValue('daysToCacheLogs'),
                    isRemote: true,
                    logsPostApiKey: appConfigPlugin.getValue('logsPostApiKey'),
                    logsApiUrl: appConfigPlugin.getValue('logsApiUrl'),
                    logsAutoSendInterval: appConfigPlugin.getValue('logsAutoSendInterval'),
                    authentication: {
                        clientId: appConfigPlugin.getValue('clientId'),
                        context: appConfigPlugin.getValue('authenticationContext'),
                        employeeIdKey: appConfigPlugin.getValue('employeeIdKey'),
                        logoutUrl: appConfigPlugin.getValue('logoutUrl'),
                        redirectUrl: appConfigPlugin.getValue('redirectUrl'),
                        resourceUrl: appConfigPlugin.getValue('resourceUrl'),
                    },
                };
                // Check to see if we have any config
                if (newEnvFile.configUrl) {
                    _this.environmentFile = newEnvFile;
                    return;
                }
                if (!_this.isDebugMode) {
                    throw AppConfigError.MISSING_REMOTE_CONFIG_URL_ERROR;
                }
            }
        };
        this.getRemoteData = function () {
            return new Promise(function (resolve, reject) {
                if (_this.networkState.getNetworkState() === ConnectionStatus.ONLINE) {
                    _this.appInfoProvider.getMajorAndMinorVersionNumber()
                        .then(function (version) {
                        var url = _this.environmentFile.configUrl + "?app_version=" + version;
                        _this.httpClient.get(url)
                            .pipe(timeout(30000))
                            .subscribe(function (data) {
                            _this.dataStore.setItem('CONFIG', JSON.stringify(data));
                            resolve(data);
                        }, function (error) {
                            if (_this.shouldGetCachedConfig(error.error)) {
                                _this.logError('Getting remote config failed, using cached data', error.error);
                                _this.getCachedRemoteConfig()
                                    .then(function (data) { return resolve(data); })
                                    .catch(function (error) { return reject(error); });
                            }
                            else {
                                _this.logError('Getting remote config failed, not using cached data', error.error);
                                reject(error);
                            }
                        });
                    });
                }
                else {
                    _this.getCachedRemoteConfig()
                        .then(function (data) { return resolve(data); })
                        .catch(function (error) { return reject(error); });
                }
            });
        };
        this.shouldGetCachedConfig = function (errorMessage) {
            return errorMessage !== AuthenticationError.USER_NOT_AUTHORISED &&
                errorMessage !== AppConfigError.INVALID_APP_VERSION;
        };
        this.logError = function (description, error) {
            return _this.store$.dispatch(new SaveLog(_this.logHelper.createLog(LogType.ERROR, description, error)));
        };
        this.getCachedRemoteConfig = function () {
            return _this.dataStore.getItem('CONFIG')
                .then(function (response) { return JSON.parse(response); })
                .catch(function (error) { return error; });
        };
        this.mapInAppConfig = function (data) {
            return _this.appConfig = merge({}, _this.appConfig, {
                configUrl: data.configUrl,
                daysToCacheLogs: data.daysToCacheLogs,
                logoutClearsTestPersistence: data.logoutClearsTestPersistence,
                logsPostApiKey: data.logsPostApiKey,
                logsApiUrl: data.logsApiUrl,
                logsAutoSendInterval: data.logsAutoSendInterval,
                authentication: {
                    context: data.authentication.context,
                    redirectUrl: data.authentication.redirectUrl,
                    resourceUrl: data.authentication.resourceUrl,
                    clientId: data.authentication.clientId,
                    logoutUrl: data.authentication.logoutUrl,
                    employeeIdKey: data.authentication.employeeIdKey,
                },
            });
        };
        this.mapRemoteConfig = function (data) {
            return _this.appConfig = merge({}, _this.appConfig, {
                googleAnalyticsId: data.googleAnalyticsId,
                approvedDeviceIdentifiers: data.approvedDeviceIdentifiers,
                timeTravelDate: data.timeTravelDate,
                role: data.role,
                authentication: {
                    employeeNameKey: data.employeeNameKey,
                },
                journal: {
                    journalUrl: data.journal.journalUrl,
                    searchBookingUrl: data.journal.searchBookingUrl,
                    delegatedExaminerSearchBookingUrl: data.journal.delegatedExaminerSearchBookingUrl,
                    autoRefreshInterval: data.journal.autoRefreshInterval || 15000,
                    numberOfDaysToView: data.journal.numberOfDaysToView,
                    daysToCacheJournalData: data.journal.daysToCacheJournalData,
                    allowTests: data.journal.allowTests,
                    allowedTestCategories: data.journal.allowedTestCategories,
                    enableTestReportPracticeMode: data.journal.enableTestReportPracticeMode,
                    enableEndToEndPracticeMode: data.journal.enableEndToEndPracticeMode,
                    enableLogoutButton: data.journal.enableLogoutButton,
                    testPermissionPeriods: data.journal.testPermissionPeriods,
                },
                tests: {
                    testSubmissionUrl: data.tests.testSubmissionUrl,
                    autoSendInterval: data.tests.autoSendInterval,
                },
                user: {
                    findUserUrl: data.user.findUserUrl,
                },
                requestTimeout: data.requestTimeout,
            });
        };
        this.getDebugMode = function () {
            return new Promise(function (resolve, reject) {
                if (get(cordova, 'plugins.IsDebug', false)) {
                    cordova.plugins.IsDebug.getIsDebug(function (isDebug) {
                        _this.isDebugMode = isDebug;
                        console.log('Detected that app is running in debug mode');
                        resolve();
                    }, function (err) {
                        reject();
                    });
                }
                else {
                    resolve();
                }
            });
        };
    }
    AppConfigProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            NetworkStateProvider,
            DataStoreProvider,
            Platform,
            Store,
            LogHelper,
            AppInfoProvider,
            SchemaValidatorProvider])
    ], AppConfigProvider);
    return AppConfigProvider;
}());
export { AppConfigProvider };
//# sourceMappingURL=app-config.js.map