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
import { Store, select } from '@ngrx/store';
import { RekeyUploadOutcomeViewDidEnter } from './rekey-upload-outcome.actions';
import { DeviceProvider } from '../../providers/device/device';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { Subscription } from 'rxjs';
import { getRekeyReasonState } from './../rekey-reason/rekey-reason.reducer';
import { map } from 'rxjs/operators';
import { getUploadStatus } from './../rekey-reason/rekey-reason.selector';
import { EndRekey } from '../../modules/tests/rekey/rekey.actions';
import { REKEY_SEARCH_PAGE, JOURNAL_PAGE } from '../page-names.constants';
var RekeyUploadOutcomePage = /** @class */ (function (_super) {
    __extends(RekeyUploadOutcomePage, _super);
    function RekeyUploadOutcomePage(store$, deviceProvider, navController, navParams, platform, authenticationProvider, screenOrientation, insomnia) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.store$ = store$;
        _this.deviceProvider = deviceProvider;
        _this.navController = navController;
        _this.navParams = navParams;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.screenOrientation = screenOrientation;
        _this.insomnia = insomnia;
        _this.subscription = Subscription.EMPTY;
        return _this;
    }
    RekeyUploadOutcomePage.prototype.ngOnInit = function () {
        this.pageState = {
            duplicateUpload$: this.store$.pipe(select(getRekeyReasonState), select(getUploadStatus), map(function (uploadStatus) { return uploadStatus.isDuplicate; })),
        };
    };
    RekeyUploadOutcomePage.prototype.ionViewDidEnter = function () {
        if (_super.prototype.isIos.call(this)) {
            this.screenOrientation.unlock();
            this.insomnia.allowSleepAgain();
            this.deviceProvider.disableSingleAppMode();
        }
        this.store$.dispatch(new RekeyUploadOutcomeViewDidEnter());
    };
    RekeyUploadOutcomePage.prototype.goToJournal = function () {
        var rekeySearchPage = this.navController.getViews().find(function (view) { return view.id === REKEY_SEARCH_PAGE; });
        var journalPage = this.navController.getViews().find(function (view) { return view.id === JOURNAL_PAGE; });
        if (rekeySearchPage) {
            this.navController.popTo(rekeySearchPage);
        }
        else {
            this.navController.popTo(journalPage);
        }
        this.store$.dispatch(new EndRekey());
    };
    RekeyUploadOutcomePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-rekey-upload-outcome',
            templateUrl: 'rekey-upload-outcome.html',
        }),
        __metadata("design:paramtypes", [Store,
            DeviceProvider,
            NavController,
            NavParams,
            Platform,
            AuthenticationProvider,
            ScreenOrientation,
            Insomnia])
    ], RekeyUploadOutcomePage);
    return RekeyUploadOutcomePage;
}(BasePageComponent));
export { RekeyUploadOutcomePage };
//# sourceMappingURL=rekey-upload-outcome.js.map