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
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Navbar, AlertController } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { DashboardViewDidEnter } from './dashboard.actions';
import { DeviceAuthenticationProvider } from '../../providers/device-authentication/device-authentication';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { map } from 'rxjs/operators';
import { getAppInfoState } from '../../modules/app-info/app-info.reducer';
import { getVersionNumber, getEmployeeName } from '../../modules/app-info/app-info.selector';
import { DateTimeProvider } from '../../providers/date-time/date-time';
import { DeviceProvider } from '../../providers/device/device';
import { Insomnia } from '@ionic-native/insomnia';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ExaminerRole, ExaminerRoleDescription } from '../../providers/app-config/constants/examiner-role.constants';
import { IncompleteTestsBanner } from '../../components/common/incomplete-tests-banner/incomplete-tests-banner';
import * as journalActions from './../../modules/journal/journal.actions';
import { LogoutBasePageComponent } from '../../shared/classes/logout-base-page';
import { CompletedTestPersistenceProvider } from '../../providers/completed-test-persistence/completed-test-persistence';
var DashboardPage = /** @class */ (function (_super) {
    __extends(DashboardPage, _super);
    function DashboardPage(store$, navController, alertController, navParams, platform, authenticationProvider, deviceAuthenticationProvider, appConfigProvider, dateTimeProvider, deviceProvider, screenOrientation, insomnia, completedTestPersistenceProvider) {
        var _this = _super.call(this, platform, navController, authenticationProvider, alertController) || this;
        _this.store$ = store$;
        _this.navController = navController;
        _this.alertController = alertController;
        _this.navParams = navParams;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.deviceAuthenticationProvider = deviceAuthenticationProvider;
        _this.appConfigProvider = appConfigProvider;
        _this.dateTimeProvider = dateTimeProvider;
        _this.deviceProvider = deviceProvider;
        _this.screenOrientation = screenOrientation;
        _this.insomnia = insomnia;
        _this.completedTestPersistenceProvider = completedTestPersistenceProvider;
        _this.showTestReportPracticeMode = function () {
            return _this.appConfigProvider.getAppConfig().journal.enableTestReportPracticeMode;
        };
        _this.showEndToEndPracticeMode = function () {
            return _this.appConfigProvider.getAppConfig().journal.enableEndToEndPracticeMode;
        };
        _this.isLogoutEnabled = function () {
            return _this.authenticationProvider.logoutEnabled();
        };
        _this.showDelegatedExaminerRekey = function () {
            return _this.appConfigProvider.getAppConfig().role === ExaminerRole.DLG;
        };
        _this.employeeId = _this.authenticationProvider.getEmployeeId() || 'NOT_KNOWN';
        _this.role = ExaminerRoleDescription[_this.appConfigProvider.getAppConfig().role] || 'Unknown Role';
        _this.todaysDate = _this.dateTimeProvider.now();
        _this.todaysDateFormatted = _this.dateTimeProvider.now().format('dddd Do MMMM YYYY');
        return _this;
    }
    DashboardPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.store$.dispatch(new DashboardViewDidEnter());
        this.navBar.backButtonClick = function (e) {
            _this.clickBack();
        };
        if (_super.prototype.isIos.call(this)) {
            this.screenOrientation.unlock();
            this.insomnia.allowSleepAgain();
            this.deviceProvider.disableSingleAppMode();
        }
        this.store$.dispatch(new journalActions.LoadJournalSilent());
    };
    DashboardPage.prototype.clickBack = function () {
        var _this = this;
        this.deviceAuthenticationProvider.triggerLockScreen()
            .then(function () {
            _this.navController.pop();
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    DashboardPage.prototype.ngOnInit = function () {
        this.pageState = {
            appVersion$: this.store$.pipe(select(getAppInfoState), map(getVersionNumber)),
            employeeName$: this.store$.pipe(select(getAppInfoState), map(getEmployeeName)),
        };
    };
    DashboardPage.prototype.ionViewWillEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _super.prototype.ionViewWillEnter.call(this);
                        if (this.merged$) {
                            this.subscription = this.merged$.subscribe();
                        }
                        this.todaysDate = this.dateTimeProvider.now();
                        this.todaysDateFormatted = this.dateTimeProvider.now().format('dddd Do MMMM YYYY');
                        return [4 /*yield*/, this.completedTestPersistenceProvider.loadCompletedPersistedTests()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    DashboardPage.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    __decorate([
        ViewChild(Navbar),
        __metadata("design:type", Navbar)
    ], DashboardPage.prototype, "navBar", void 0);
    __decorate([
        ViewChild(IncompleteTestsBanner),
        __metadata("design:type", IncompleteTestsBanner)
    ], DashboardPage.prototype, "incompleteTestsBanner", void 0);
    DashboardPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-dashboard',
            templateUrl: 'dashboard.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            AlertController,
            NavParams,
            Platform,
            AuthenticationProvider,
            DeviceAuthenticationProvider,
            AppConfigProvider,
            DateTimeProvider,
            DeviceProvider,
            ScreenOrientation,
            Insomnia,
            CompletedTestPersistenceProvider])
    ], DashboardPage);
    return DashboardPage;
}(LogoutBasePageComponent));
export { DashboardPage };
//# sourceMappingURL=dashboard.js.map