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
import { ErrorTypes } from './../../shared/models/error-message';
import { Subscription, of } from 'rxjs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, ViewController } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { SearchProvider } from '../../providers/search/search';
import { tap, catchError, map } from 'rxjs/operators';
import { ExaminerRole } from '../../providers/app-config/constants/examiner-role.constants';
import { Store } from '@ngrx/store';
import { TestResultSearchViewDidEnter, PerformApplicationReferenceSearch, PerformDriverNumberSearch, PerformLDTMSearch, } from './test-results-search.actions';
import { LogType } from '../../shared/models/log.model';
import { SaveLog } from '../../modules/logs/logs.actions';
import { LogHelper } from '../../providers/logs/logsHelper';
import { ERROR_PAGE } from '../page-names.constants';
import { App } from '../../app/app.component';
var SearchBy;
(function (SearchBy) {
    SearchBy["DriverNumber"] = "driverNumber";
    SearchBy["ApplicationReference"] = "appReference";
})(SearchBy || (SearchBy = {}));
var TestResultsSearchPage = /** @class */ (function (_super) {
    __extends(TestResultsSearchPage, _super);
    function TestResultsSearchPage(modalController, viewController, navController, platform, navParams, authenticationProvider, searchProvider, appConfig, store$, logHelper, app) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.modalController = modalController;
        _this.viewController = viewController;
        _this.navController = navController;
        _this.platform = platform;
        _this.navParams = navParams;
        _this.authenticationProvider = authenticationProvider;
        _this.searchProvider = searchProvider;
        _this.appConfig = appConfig;
        _this.store$ = store$;
        _this.logHelper = logHelper;
        _this.app = app;
        _this.searchBy = SearchBy.ApplicationReference;
        _this.candidateInfo = '';
        _this.searchResults = [];
        _this.hasSearched = false;
        _this.showSearchSpinner = false;
        _this.showAdvancedSearchSpinner = false;
        _this.subscription = Subscription.EMPTY;
        _this.showError = function (error) {
            if (error === undefined || error.message === '')
                return;
            // Modals are at the same level as the ion-nav so are not getting the zoom level class,
            // this needs to be passed in the create options.
            var zoomClass = "modal-fullscreen " + _this.app.getTextZoomClass();
            var errorModal = _this.modalController.create(ERROR_PAGE, { type: ErrorTypes.SEARCH }, { cssClass: zoomClass });
            errorModal.present();
        };
        return _this;
    }
    TestResultsSearchPage.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new TestResultSearchViewDidEnter());
    };
    TestResultsSearchPage.prototype.searchByChanged = function (val) {
        this.searchBy = val;
    };
    TestResultsSearchPage.prototype.displayAdvancedSearch = function () {
        return this.appConfig.getAppConfig().role === ExaminerRole.LDTM;
    };
    TestResultsSearchPage.prototype.candidateInfoChanged = function (val) {
        this.candidateInfo = val;
    };
    TestResultsSearchPage.prototype.searchTests = function () {
        var _this = this;
        if (this.searchBy === SearchBy.DriverNumber) {
            this.subscription.unsubscribe();
            this.store$.dispatch(new PerformDriverNumberSearch());
            this.showSearchSpinner = true;
            this.subscription = this.searchProvider.driverNumberSearch(this.candidateInfo)
                .pipe(tap(function () { return _this.hasSearched = true; }), map(function (results) {
                _this.searchResults = results;
                _this.showSearchSpinner = false;
            }), catchError(function (err) {
                var log = _this.logHelper
                    .createLog(LogType.ERROR, "Searching tests by driver number", err.message);
                _this.store$.dispatch(new SaveLog(log));
                _this.searchResults = [];
                _this.showSearchSpinner = false;
                if (err) {
                    _this.showError(err);
                    _this.hasSearched = false;
                    return of();
                }
                return of(_this.hasSearched = true);
            }))
                .subscribe();
        }
        if (this.searchBy === SearchBy.ApplicationReference) {
            this.subscription.unsubscribe();
            this.store$.dispatch(new PerformApplicationReferenceSearch());
            this.showSearchSpinner = true;
            this.subscription = this.searchProvider.applicationReferenceSearch(this.candidateInfo)
                .pipe(tap(function () { return _this.hasSearched = true; }), map(function (results) {
                _this.searchResults = results;
                _this.showSearchSpinner = false;
            }), catchError(function (err) {
                _this.store$.dispatch(new SaveLog(_this.logHelper
                    .createLog(LogType.ERROR, "Searching tests by app ref (" + _this.candidateInfo + ")", err.message)));
                _this.searchResults = [];
                _this.showSearchSpinner = false;
                if (err) {
                    _this.showError(err);
                    _this.hasSearched = false;
                    return of();
                }
                return of(_this.hasSearched = true);
            }))
                .subscribe();
        }
    };
    TestResultsSearchPage.prototype.advancedSearch = function (advancedSearchParams) {
        var _this = this;
        this.subscription.unsubscribe();
        this.store$.dispatch(new PerformLDTMSearch(advancedSearchParams));
        this.showAdvancedSearchSpinner = true;
        this.subscription = this.searchProvider.advancedSearch(advancedSearchParams)
            .pipe(tap(function () { return _this.hasSearched = true; }), map(function (results) {
            _this.searchResults = results;
            _this.showAdvancedSearchSpinner = false;
        }), catchError(function (err) {
            var log = _this.logHelper
                .createLog(LogType.ERROR, "Advanced search with params (" + advancedSearchParams + ")", err.message);
            _this.store$.dispatch(new SaveLog(log));
            _this.searchResults = [];
            _this.showAdvancedSearchSpinner = false;
            if (err) {
                _this.showError(err);
                _this.hasSearched = false;
            }
            return of(console.log('ERROR', JSON.stringify(err)));
        }))
            .subscribe();
    };
    TestResultsSearchPage.prototype.myHeaderFn = function (record, recordIndex) {
        if (recordIndex === 0) {
            return '';
        }
        return null;
    };
    TestResultsSearchPage.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    TestResultsSearchPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-test-results-search',
            templateUrl: 'test-results-search.html',
        }),
        __metadata("design:paramtypes", [ModalController,
            ViewController,
            NavController,
            Platform,
            NavParams,
            AuthenticationProvider,
            SearchProvider,
            AppConfigProvider,
            Store,
            LogHelper,
            App])
    ], TestResultsSearchPage);
    return TestResultsSearchPage;
}(BasePageComponent));
export { TestResultsSearchPage };
//# sourceMappingURL=test-results-search.js.map