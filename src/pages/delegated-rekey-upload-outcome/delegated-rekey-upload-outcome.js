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
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store, select, } from '@ngrx/store';
import { DeviceProvider } from '../../providers/device/device';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { DASHBOARD_PAGE, DELEGATED_REKEY_SEARCH_PAGE } from '../page-names.constants';
import { SendCurrentTest } from '../../modules/tests/tests.actions';
import { getDelegatedRekeySearchState } from '../delegated-rekey-search/delegated-rekey-search.reducer';
import { map } from 'rxjs/operators';
import { getIsLoading } from '../delegated-rekey-search/delegated-rekey-search.selector';
import { TestStatus } from '../../modules/tests/test-status/test-status.model';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTestStatus } from '../../modules/tests/tests.selector';
var DelegatedRekeyUploadOutcomePage = /** @class */ (function (_super) {
    __extends(DelegatedRekeyUploadOutcomePage, _super);
    function DelegatedRekeyUploadOutcomePage(store$, deviceProvider, navController, navParams, platform, authenticationProvider, screenOrientation, insomnia) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.store$ = store$;
        _this.deviceProvider = deviceProvider;
        _this.navController = navController;
        _this.navParams = navParams;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.screenOrientation = screenOrientation;
        _this.insomnia = insomnia;
        return _this;
    }
    DelegatedRekeyUploadOutcomePage.prototype.ngOnInit = function () {
        this.pageState = {
            testStatus$: this.store$.pipe(select(getTests), map(function (tests) { return getCurrentTestStatus(tests); })),
            isUploading$: this.store$.pipe(select(getDelegatedRekeySearchState), map(getIsLoading)),
        };
    };
    DelegatedRekeyUploadOutcomePage.prototype.ionViewDidEnter = function () {
        if (_super.prototype.isIos.call(this)) {
            this.screenOrientation.unlock();
            this.insomnia.allowSleepAgain();
            this.deviceProvider.disableSingleAppMode();
        }
    };
    DelegatedRekeyUploadOutcomePage.prototype.retryUpload = function () {
        this.store$.dispatch(new SendCurrentTest());
    };
    DelegatedRekeyUploadOutcomePage.prototype.isStatusSubmitted = function (status) {
        return status === TestStatus.Submitted;
    };
    DelegatedRekeyUploadOutcomePage.prototype.goToDashboard = function () {
        var dashboardPage = this.navController.getViews().find(function (view) { return view.id === DASHBOARD_PAGE; });
        this.navController.popTo(dashboardPage);
    };
    DelegatedRekeyUploadOutcomePage.prototype.goToDelegatedSearch = function () {
        var delegatedExaminerRekeySearchPage = this.navController.getViews().find(function (view) { return view.id === DELEGATED_REKEY_SEARCH_PAGE; });
        this.navController.popTo(delegatedExaminerRekeySearchPage);
    };
    DelegatedRekeyUploadOutcomePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-delegated-rekey-upload-outcome',
            templateUrl: 'delegated-rekey-upload-outcome.html',
        }),
        __metadata("design:paramtypes", [Store,
            DeviceProvider,
            NavController,
            NavParams,
            Platform,
            AuthenticationProvider,
            ScreenOrientation,
            Insomnia])
    ], DelegatedRekeyUploadOutcomePage);
    return DelegatedRekeyUploadOutcomePage;
}(BasePageComponent));
export { DelegatedRekeyUploadOutcomePage };
//# sourceMappingURL=delegated-rekey-upload-outcome.js.map