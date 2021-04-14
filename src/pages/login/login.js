var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, AlertController, } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Store } from '@ngrx/store';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { AuthenticationError } from '../../providers/authentication/authentication.constants';
import { DeviceError } from '../../providers/device/device.constants';
import { DeviceProvider } from '../../providers/device/device';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { StartSendingLogs, LoadLog, SaveLog, SendLogs } from '../../modules/logs/logs.actions';
import { LoadEmployeeId, LoadConfigSuccess, LoadEmployeeName } from '../../modules/app-info/app-info.actions';
import { NetworkStateProvider } from '../../providers/network-state/network-state';
import { SecureStorage } from '@ionic-native/secure-storage';
import { DataStoreProvider } from '../../providers/data-store/data-store';
import { LoadPersistedTests, StartSendingCompletedTests } from '../../modules/tests/tests.actions';
import { AppConfigError } from '../../providers/app-config/app-config.constants';
import { LogsProvider } from '../../providers/logs/logs';
import { LogType } from '../../shared/models/log.model';
import { DASHBOARD_PAGE } from '../page-names.constants';
import { LogHelper } from '../../providers/logs/logsHelper';
import { LogoutBasePageComponent } from '../../shared/classes/logout-base-page';
var LoginPage = /** @class */ (function (_super) {
    __extends(LoginPage, _super);
    function LoginPage(navController, alertController, navParams, platform, splashScreen, store$, networkStateProvider, authenticationProvider, appConfigProvider, analytics, deviceProvider, secureStorage, dataStore, loadingController, alertCtrl, logProvider, logHelper) {
        var _this = _super.call(this, platform, navController, authenticationProvider, alertController, false) || this;
        _this.navController = navController;
        _this.alertController = alertController;
        _this.navParams = navParams;
        _this.platform = platform;
        _this.splashScreen = splashScreen;
        _this.store$ = store$;
        _this.networkStateProvider = networkStateProvider;
        _this.authenticationProvider = authenticationProvider;
        _this.appConfigProvider = appConfigProvider;
        _this.analytics = analytics;
        _this.deviceProvider = deviceProvider;
        _this.secureStorage = secureStorage;
        _this.dataStore = dataStore;
        _this.loadingController = loadingController;
        _this.alertCtrl = alertCtrl;
        _this.logProvider = logProvider;
        _this.logHelper = logHelper;
        _this.hasUserLoggedOut = false;
        _this.hasDeviceTypeError = false;
        _this.unauthenticatedMode = false;
        _this.login = function () { return __awaiter(_this, void 0, void 0, function () {
            var isAuthenticated, error_1, token, examiner;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.handleLoadingUI(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 11, , 15]);
                        return [4 /*yield*/, this.platform.ready()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.initialiseAppConfig()];
                    case 3:
                        _a.sent();
                        this.store$.dispatch(new StartSendingLogs());
                        this.appInitializedLog();
                        this.initialiseAuthentication();
                        return [4 /*yield*/, this.initialisePersistentStorage()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.authenticationProvider.expireTokens()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.authenticationProvider.isAuthenticated()];
                    case 6:
                        isAuthenticated = _a.sent();
                        if (!!isAuthenticated) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.authenticationProvider.login()];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [4 /*yield*/, this.authenticationProvider.setEmployeeId()];
                    case 9:
                        _a.sent();
                        this.store$.dispatch(new LoadEmployeeId(this.authenticationProvider.getEmployeeId()));
                        this.store$.dispatch(new LoadLog());
                        return [4 /*yield*/, this.appConfigProvider.loadRemoteConfig()];
                    case 10:
                        _a.sent();
                        this.store$.dispatch(new LoadConfigSuccess());
                        this.store$.dispatch(new LoadPersistedTests());
                        this.store$.dispatch(new LoadEmployeeName());
                        this.analytics.initialiseAnalytics();
                        this.store$.dispatch(new StartSendingCompletedTests());
                        this.handleLoadingUI(false);
                        this.validateDeviceType();
                        return [3 /*break*/, 15];
                    case 11:
                        error_1 = _a.sent();
                        this.handleLoadingUI(false);
                        if (error_1 === AuthenticationError.USER_CANCELLED) {
                            this.analytics.logException(error_1, true);
                            this.dispatchLog("user cancelled login");
                        }
                        if (!(error_1 === AuthenticationError.USER_NOT_AUTHORISED)) return [3 /*break*/, 14];
                        return [4 /*yield*/, this.authenticationProvider.getAuthenticationToken()];
                    case 12:
                        token = _a.sent();
                        examiner = this.authenticationProvider.getEmployeeId() || 'unavailable';
                        if (token) {
                            this.dispatchLog("user " + examiner + " not authorised: TOKEN " + token);
                        }
                        else {
                            this.dispatchLog("user " + examiner + " not authorised: Could not get token");
                        }
                        return [4 /*yield*/, this.authenticationProvider.logout()];
                    case 13:
                        _a.sent();
                        _a.label = 14;
                    case 14:
                        this.appInitError = error_1;
                        console.log(error_1);
                        return [3 /*break*/, 15];
                    case 15:
                        this.hasUserLoggedOut = false;
                        this.splashScreen.hide();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.initialiseAppConfig = function () {
            return _this.appConfigProvider.initialiseAppConfig();
        };
        _this.initialiseAuthentication = function () {
            _this.authenticationProvider.initialiseAuthentication();
            _this.authenticationProvider.determineAuthenticationMode();
        };
        _this.validateDeviceType = function () {
            var validDevice = _this.deviceProvider.validDeviceType();
            if (!validDevice) {
                _this.deviceTypeError = DeviceError.UNSUPPORTED_DEVICE;
                _this.hasDeviceTypeError = true;
                _this.analytics.logException(_this.deviceTypeError + "-" + _this.deviceProvider.getDeviceType(), true);
            }
            else {
                _this.navController.setRoot(DASHBOARD_PAGE);
            }
        };
        _this.isInternetConnectionError = function () {
            return !_this.hasUserLoggedOut && _this.appInitError === AuthenticationError.NO_INTERNET;
        };
        _this.isUserCancelledError = function () {
            return !_this.hasUserLoggedOut && _this.appInitError === AuthenticationError.USER_CANCELLED;
        };
        _this.isUnknownError = function () {
            return !_this.hasUserLoggedOut &&
                _this.appInitError &&
                _this.appInitError.valueOf() !== AuthenticationError.USER_CANCELLED &&
                _this.appInitError.valueOf() !== AuthenticationError.NO_INTERNET &&
                _this.appInitError.valueOf() !== AuthenticationError.USER_NOT_AUTHORISED &&
                _this.appInitError.valueOf() !== AppConfigError.INVALID_APP_VERSION;
        };
        _this.isUserNotAuthorised = function () {
            return !_this.hasUserLoggedOut && _this.appInitError === AuthenticationError.USER_NOT_AUTHORISED;
        };
        _this.isInvalidAppVersionError = function () {
            return !_this.hasUserLoggedOut && _this.appInitError === AppConfigError.INVALID_APP_VERSION;
        };
        _this.handleLoadingUI = function (isLoading) {
            if (isLoading) {
                _this.loadingSpinner = _this.loadingController.create({
                    spinner: 'circles',
                    content: 'App initialising...',
                });
                _this.loadingSpinner.present();
                return;
            }
            if (_this.loadingSpinner) {
                _this.loadingSpinner.dismiss();
                _this.loadingSpinner = null;
            }
        };
        // Check to see if redirect to page was from a logout
        _this.hasUserLoggedOut = navParams.get('hasLoggedOut');
        _this.networkStateProvider.initialiseNetworkState();
        // Trigger Authentication if this isn't a logout and is an ios device
        if (!_this.hasUserLoggedOut && _this.isIos()) {
            _this.login();
        }
        if (!_this.isIos()) {
            _this.appConfigProvider.initialiseAppConfig();
            _this.navController.setRoot(DASHBOARD_PAGE);
            _this.splashScreen.hide();
        }
        return _this;
    }
    LoginPage.prototype.dispatchLog = function (message) {
        this.store$.dispatch(new SaveLog(this.logHelper.createLog(LogType.ERROR, 'User login', message)));
        this.store$.dispatch(new SendLogs());
    };
    LoginPage.prototype.appInitializedLog = function () {
        this.store$.dispatch(new SaveLog(this.logHelper.createLog(LogType.INFO, 'App has MDM provided config and is ready to proceed with authentication', 'App has initialised')));
    };
    LoginPage.prototype.initialisePersistentStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var storage, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.platform.is('ios')) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.secureStorage.create('MES')];
                    case 2:
                        storage = _a.sent();
                        this.dataStore.setSecureContainer(storage);
                        return [2 /*return*/, Promise.resolve()];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(err_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.showErrorDetails = function () {
        var alert = this.alertCtrl.create({
            title: 'Error details',
            subTitle: JSON.stringify(this.appInitError),
            buttons: ['OK'],
        });
        alert.present();
    };
    LoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [NavController,
            AlertController,
            NavParams,
            Platform,
            SplashScreen,
            Store,
            NetworkStateProvider,
            AuthenticationProvider,
            AppConfigProvider,
            AnalyticsProvider,
            DeviceProvider,
            SecureStorage,
            DataStoreProvider,
            LoadingController,
            AlertController,
            LogsProvider,
            LogHelper])
    ], LoginPage);
    return LoginPage;
}(LogoutBasePageComponent));
export { LoginPage };
//# sourceMappingURL=login.js.map