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
import { Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { RekeySearchViewDidEnter, SearchBookedTest, RekeySearchClearState } from './rekey-search.actions';
import { map } from 'rxjs/operators';
import { getIsLoading, getHasSearched, getBookedTestSlot, getRekeySearchError } from './rekey-search.selector';
import { getRekeySearchState } from './rekey-search.reducer';
import { isEmpty } from 'lodash';
import { RekeySearchErrorMessages } from './rekey-search-error-model';
var RekeySearchPage = /** @class */ (function (_super) {
    __extends(RekeySearchPage, _super);
    function RekeySearchPage(viewController, navController, platform, navParams, authenticationProvider, store$) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.viewController = viewController;
        _this.navController = navController;
        _this.platform = platform;
        _this.navParams = navParams;
        _this.authenticationProvider = authenticationProvider;
        _this.store$ = store$;
        _this.staffNumber = '';
        _this.applicationReference = '';
        _this.searchResults = [];
        _this.subscription = Subscription.EMPTY;
        return _this;
    }
    RekeySearchPage.prototype.ngOnInit = function () {
        this.store$.dispatch(new RekeySearchClearState());
        var rekeySearch$ = this.store$.pipe(select(getRekeySearchState));
        this.pageState = {
            isLoading$: rekeySearch$.pipe(map(getIsLoading)),
            hasSearched$: rekeySearch$.pipe(map(getHasSearched)),
            bookedTestSlot$: rekeySearch$.pipe(map(getBookedTestSlot)),
            rekeySearchErr$: rekeySearch$.pipe(map(getRekeySearchError)),
        };
    };
    RekeySearchPage.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new RekeySearchViewDidEnter());
    };
    RekeySearchPage.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    RekeySearchPage.prototype.staffNumberChanged = function (val) {
        this.staffNumber = val;
    };
    RekeySearchPage.prototype.applicationReferenceChanged = function (val) {
        this.applicationReference = val;
    };
    RekeySearchPage.prototype.searchTests = function () {
        this.store$.dispatch(new SearchBookedTest(this.applicationReference, this.staffNumber));
    };
    RekeySearchPage.prototype.isBookedTestSlotEmpty = function (bookedTestsSlot) {
        return isEmpty(bookedTestsSlot);
    };
    RekeySearchPage.prototype.hasBookingAlreadyBeenCompleted = function (rekeySearchErr) {
        return rekeySearchErr.message === RekeySearchErrorMessages.BookingAlreadyCompleted;
    };
    RekeySearchPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-rekey-search',
            templateUrl: 'rekey-search.html',
        }),
        __metadata("design:paramtypes", [ViewController,
            NavController,
            Platform,
            NavParams,
            AuthenticationProvider,
            Store])
    ], RekeySearchPage);
    return RekeySearchPage;
}(BasePageComponent));
export { RekeySearchPage };
//# sourceMappingURL=rekey-search.js.map