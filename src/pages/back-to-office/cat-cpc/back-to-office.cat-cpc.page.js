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
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Store, select } from '@ngrx/store';
import { Insomnia } from '@ionic-native/insomnia';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { BackToOfficeViewDidEnter, DeferWriteUp } from '../back-to-office.actions';
import { CAT_CPC, JOURNAL_PAGE } from '../../page-names.constants';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../modules/tests/tests.selector';
import { getRekeyIndicator } from '../../../modules/tests/rekey/rekey.reducer';
import { isRekey } from '../../../modules/tests/rekey/rekey.selector';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { DeviceProvider } from '../../../providers/device/device';
var BackToOfficeCatCPCPage = /** @class */ (function (_super) {
    __extends(BackToOfficeCatCPCPage, _super);
    function BackToOfficeCatCPCPage(store$, navController, navParams, platform, authenticationProvider, screenOrientation, insomnia, deviceProvider) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.store$ = store$;
        _this.navController = navController;
        _this.navParams = navParams;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.screenOrientation = screenOrientation;
        _this.insomnia = insomnia;
        _this.deviceProvider = deviceProvider;
        return _this;
    }
    BackToOfficeCatCPCPage.prototype.ngOnInit = function () {
        this.pageState = {
            isRekey$: this.store$.pipe(select(getTests), select(getCurrentTest), select(getRekeyIndicator), select(isRekey)),
        };
    };
    BackToOfficeCatCPCPage.prototype.ionViewDidEnter = function () {
        if (_super.prototype.isIos.call(this)) {
            this.screenOrientation.unlock();
            this.insomnia.allowSleepAgain();
            this.deviceProvider.disableSingleAppMode();
        }
        this.store$.dispatch(new BackToOfficeViewDidEnter());
    };
    BackToOfficeCatCPCPage.prototype.goToJournal = function () {
        this.store$.dispatch(new DeferWriteUp());
        var journalPage = this.navController.getViews().find(function (view) { return view.id === JOURNAL_PAGE; });
        this.navController.popTo(journalPage);
    };
    BackToOfficeCatCPCPage.prototype.goToOfficePage = function () {
        this.navController.push(CAT_CPC.OFFICE_PAGE);
    };
    BackToOfficeCatCPCPage = __decorate([
        IonicPage(),
        Component({
            selector: '.back-to-office-cat-cpc-page',
            templateUrl: 'back-to-office.cat-cpc.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            NavParams,
            Platform,
            AuthenticationProvider,
            ScreenOrientation,
            Insomnia,
            DeviceProvider])
    ], BackToOfficeCatCPCPage);
    return BackToOfficeCatCPCPage;
}(BasePageComponent));
export { BackToOfficeCatCPCPage };
//# sourceMappingURL=back-to-office.cat-cpc.page.js.map