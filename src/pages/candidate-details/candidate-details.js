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
import { Store } from '@ngrx/store';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { ClearChangedSlot, CandidateDetailsSeen, } from '../../modules/journal/journal.actions';
import { getCandidateName, getTime, getDetails, getBusiness, } from './candidate-details.selector';
import { CandidateDetailsViewDidEnter, CandidateDetailsSlotChangeViewed, } from './candidate-details.actions';
var CandidateDetailsPage = /** @class */ (function (_super) {
    __extends(CandidateDetailsPage, _super);
    function CandidateDetailsPage(navController, navParams, platform, authenticationProvider, store$) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.navController = navController;
        _this.navParams = navParams;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.store$ = store$;
        _this.slotChanged = false;
        _this.testCategory = "B" /* B */;
        _this.slot = navParams.get('slot');
        _this.slotChanged = navParams.get('slotChanged');
        return _this;
    }
    CandidateDetailsPage.prototype.ngOnInit = function () {
        this.store$.dispatch(new ClearChangedSlot(this.slot.slotDetail.slotId));
        this.pageState = {
            name: getCandidateName(this.slot),
            time: getTime(this.slot),
            details: getDetails(this.slot),
            business: getBusiness(this.slot),
        };
        this.testCategory = this.pageState.details.testCategory;
        if (this.slotChanged) {
            this.store$.dispatch(new CandidateDetailsSlotChangeViewed(this.slot.slotDetail.slotId));
        }
        this.store$.dispatch(new ClearChangedSlot(this.slot.slotDetail.slotId));
    };
    CandidateDetailsPage.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new CandidateDetailsViewDidEnter(this.slot));
        this.store$.dispatch(new CandidateDetailsSeen(this.slot.slotDetail.slotId));
    };
    CandidateDetailsPage.prototype.handleDoneButtonClick = function () {
        this.navController.pop();
    };
    CandidateDetailsPage.prototype.specialNeedsIsPopulated = function (specialNeeds) {
        return Array.isArray(specialNeeds);
    };
    CandidateDetailsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-candidate-details',
            templateUrl: 'candidate-details.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Platform,
            AuthenticationProvider,
            Store])
    ], CandidateDetailsPage);
    return CandidateDetailsPage;
}(BasePageComponent));
export { CandidateDetailsPage };
//# sourceMappingURL=candidate-details.js.map