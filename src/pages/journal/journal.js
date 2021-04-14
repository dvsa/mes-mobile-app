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
import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, Platform, ModalController, } from 'ionic-angular';
import { select, Store } from '@ngrx/store';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import * as journalActions from './../../modules/journal/journal.actions';
import { getError, getIsLoading, getSelectedDate, getLastRefreshed, getLastRefreshedTime, getSlotsOnSelectedDate, getCompletedTests, } from './../../modules/journal/journal.selector';
import { getJournalState } from './../../modules/journal/journal.reducer';
import { SlotSelectorProvider } from '../../providers/slot-selector/slot-selector';
import { getAppInfoState } from '../../modules/app-info/app-info.reducer';
import { getVersionNumber } from '../../modules/app-info/app-info.selector';
import { DateTimeProvider } from '../../providers/date-time/date-time';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { ERROR_PAGE } from '../page-names.constants';
import { App } from './../../app/app.component';
import { ErrorTypes } from '../../shared/models/error-message';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { DeviceProvider } from '../../providers/device/device';
import { Insomnia } from '@ionic-native/insomnia';
import { PersonalCommitmentSlotComponent } from './personal-commitment/personal-commitment';
import { TestSlotComponent } from '../../components/test-slot/test-slot/test-slot';
import { IncompleteTestsBanner } from '../../components/common/incomplete-tests-banner/incomplete-tests-banner';
import { SearchProvider } from '../../providers/search/search';
import { formatApplicationReference } from '../../shared/helpers/formatters';
import { isEmpty } from 'lodash';
import { TestStatus } from '../../modules/tests/test-status/test-status.model';
import { CompletedTestPersistenceProvider } from '../../providers/completed-test-persistence/completed-test-persistence';
var JournalPage = /** @class */ (function (_super) {
    __extends(JournalPage, _super);
    function JournalPage(modalController, navController, platform, authenticationProvider, navParams, loadingController, store$, slotSelector, resolver, dateTimeProvider, appConfigProvider, app, deviceProvider, screenOrientation, insomnia, searchProvider, completedTestPersistenceProvider) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.modalController = modalController;
        _this.navController = navController;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.navParams = navParams;
        _this.loadingController = loadingController;
        _this.store$ = store$;
        _this.slotSelector = slotSelector;
        _this.resolver = resolver;
        _this.dateTimeProvider = dateTimeProvider;
        _this.appConfigProvider = appConfigProvider;
        _this.app = app;
        _this.deviceProvider = deviceProvider;
        _this.screenOrientation = screenOrientation;
        _this.insomnia = insomnia;
        _this.searchProvider = searchProvider;
        _this.completedTestPersistenceProvider = completedTestPersistenceProvider;
        _this.start = '2018-12-10T08:10:00+00:00';
        _this.setSelectedDate = function (selectedDate) {
            _this.selectedDate = selectedDate;
        };
        _this.setCompletedTests = function (completedTests) {
            _this.completedTests = completedTests;
        };
        _this.handleLoadingUI = function (isLoading) {
            if (isLoading) {
                _this.loadingSpinner = _this.loadingController.create({
                    dismissOnPageChange: true,
                    spinner: 'circles',
                });
                _this.loadingSpinner.present();
                return;
            }
            _this.pageRefresher ? _this.pageRefresher.complete() : null;
            if (_this.loadingSpinner) {
                _this.loadingSpinner.dismiss();
                _this.loadingSpinner = null;
            }
        };
        _this.showError = function (error) {
            if (error === undefined || error.message === '')
                return;
            // Modals are at the same level as the ion-nav so are not getting the zoom level class,
            // this needs to be passed in the create options.
            var zoomClass = "modal-fullscreen " + _this.app.getTextZoomClass();
            var errorModal = _this.modalController.create(ERROR_PAGE, { type: ErrorTypes.JOURNAL_REFRESH }, { cssClass: zoomClass });
            errorModal.present();
        };
        _this.createSlots = function (emission) {
            // Clear any dynamically created slots before adding the latest
            _this.slotContainer.clear();
            if (!Array.isArray(emission))
                return;
            if (emission.length === 0)
                return;
            var slots = _this.slotSelector.getSlotTypes(emission);
            var lastLocation;
            for (var _i = 0, slots_1 = slots; _i < slots_1.length; _i++) {
                var slot = slots_1[_i];
                var factory = _this.resolver.resolveComponentFactory(slot.component);
                var componentRef = _this.slotContainer.createComponent(factory);
                componentRef.instance.slot = slot.slotData;
                componentRef.instance.hasSlotChanged = slot.hasSlotChanged;
                componentRef.instance.showLocation = (slot.slotData.testCentre.centreName !== lastLocation);
                lastLocation = slot.slotData.testCentre.centreName;
                if (componentRef.instance instanceof PersonalCommitmentSlotComponent) {
                    // if this is a personal commitment assign it to the component
                    componentRef.instance.personalCommitments = slot.personalCommitment;
                }
                if (componentRef.instance instanceof TestSlotComponent) {
                    var activityCode = _this.hasSlotBeenTested(slot.slotData);
                    if (activityCode) {
                        componentRef.instance.derivedActivityCode = activityCode;
                        componentRef.instance.derivedTestStatus = TestStatus.Submitted;
                    }
                    // if this is a test slot assign hasSeenCandidateDetails separately
                    componentRef.instance.hasSeenCandidateDetails = slot.hasSeenCandidateDetails;
                }
            }
        };
        _this.pullRefreshJournal = function (refresher) {
            _this.loadJournalManually();
            _this.loadCompletedTestsWithCallThrough();
            _this.pageRefresher = refresher;
        };
        _this.refreshJournal = function () {
            _this.loadJournalManually();
            _this.loadCompletedTestsWithCallThrough();
        };
        _this.loadCompletedTestsWithCallThrough = function () {
            // When manually refreshing the journal we want to check
            // if any of the tests have already been submitted by another device
            // So we must make the Load Completed Tests request
            // And that's why we set the callThrough property to true
            var callThrough = true;
            _this.store$.dispatch(new journalActions.LoadCompletedTests(callThrough));
        };
        _this.employeeId = _this.authenticationProvider.getEmployeeId();
        _this.isUnauthenticated = _this.authenticationProvider.isInUnAuthenticatedMode();
        _this.store$.dispatch(new journalActions.SetSelectedDate(_this.dateTimeProvider.now().format('YYYY-MM-DD')));
        _this.todaysDate = _this.dateTimeProvider.now();
        return _this;
    }
    JournalPage.prototype.ngOnInit = function () {
        this.pageState = {
            selectedDate$: this.store$.pipe(select(getJournalState), map(getSelectedDate)),
            slots$: this.store$.pipe(select(getJournalState), map(getSlotsOnSelectedDate)),
            error$: this.store$.pipe(select(getJournalState), map(getError)),
            isLoading$: this.store$.pipe(select(getJournalState), map(getIsLoading)),
            lastRefreshedTime$: this.store$.pipe(select(getJournalState), map(getLastRefreshed), map(getLastRefreshedTime)),
            appVersion$: this.store$.pipe(select(getAppInfoState), map(getVersionNumber)),
            completedTests$: this.store$.pipe(select(getJournalState), select(getCompletedTests)),
        };
        var _a = this.pageState, selectedDate$ = _a.selectedDate$, slots$ = _a.slots$, error$ = _a.error$, isLoading$ = _a.isLoading$, completedTests$ = _a.completedTests$;
        this.merged$ = merge(selectedDate$.pipe(map(this.setSelectedDate)), completedTests$.pipe(map(this.setCompletedTests)), slots$.pipe(map(this.createSlots)), error$.pipe(map(this.showError)), isLoading$.pipe(map(this.handleLoadingUI)));
    };
    JournalPage.prototype.ionViewDidLeave = function () {
        // Using .merge helps with unsubscribing
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    JournalPage.prototype.ionViewWillEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _super.prototype.ionViewWillEnter.call(this);
                        this.loadJournalManually();
                        this.setupPolling();
                        return [4 /*yield*/, this.completedTestPersistenceProvider.loadCompletedPersistedTests()];
                    case 1:
                        _a.sent();
                        this.store$.dispatch(new journalActions.LoadCompletedTests());
                        if (this.merged$) {
                            this.subscription = this.merged$.subscribe();
                        }
                        this.todaysDate = this.dateTimeProvider.now();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    JournalPage.prototype.ionViewWillLeave = function () {
        this.store$.dispatch(new journalActions.StopPolling());
    };
    JournalPage.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new journalActions.JournalViewDidEnter());
        if (_super.prototype.isIos.call(this)) {
            this.screenOrientation.unlock();
            this.insomnia.allowSleepAgain();
            this.deviceProvider.disableSingleAppMode();
        }
    };
    JournalPage.prototype.loadJournalManually = function () {
        this.store$.dispatch(new journalActions.LoadJournal());
    };
    JournalPage.prototype.setupPolling = function () {
        this.store$.dispatch(new journalActions.SetupPolling());
    };
    /**
     * Returns the activity code if the test has been completed already
     * Returns null if test hasn't been completed yet
     */
    JournalPage.prototype.hasSlotBeenTested = function (slotData) {
        if (isEmpty(this.completedTests)) {
            return null;
        }
        var applicationReference = {
            applicationId: slotData.booking.application.applicationId,
            bookingSequence: slotData.booking.application.bookingSequence,
            checkDigit: slotData.booking.application.checkDigit,
        };
        var completedTest = this.completedTests.find(function (completedTest) {
            return completedTest.applicationReference === parseInt(formatApplicationReference(applicationReference), 10);
        });
        return completedTest ? completedTest.activityCode : null;
    };
    JournalPage.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.store$.dispatch(new journalActions.UnloadJournal());
                        return [4 /*yield*/, _super.prototype.logout.call(this)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        ViewChild('slotContainer', { read: ViewContainerRef }),
        __metadata("design:type", Object)
    ], JournalPage.prototype, "slotContainer", void 0);
    __decorate([
        ViewChild(IncompleteTestsBanner),
        __metadata("design:type", IncompleteTestsBanner)
    ], JournalPage.prototype, "incompleteTestsBanner", void 0);
    JournalPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-journal',
            templateUrl: 'journal.html',
        }),
        __metadata("design:paramtypes", [ModalController,
            NavController,
            Platform,
            AuthenticationProvider,
            NavParams,
            LoadingController,
            Store,
            SlotSelectorProvider,
            ComponentFactoryResolver,
            DateTimeProvider,
            AppConfigProvider,
            App,
            DeviceProvider,
            ScreenOrientation,
            Insomnia,
            SearchProvider,
            CompletedTestPersistenceProvider])
    ], JournalPage);
    return JournalPage;
}(BasePageComponent));
export { JournalPage };
//# sourceMappingURL=journal.js.map