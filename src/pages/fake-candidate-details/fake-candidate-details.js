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
import { BasePageComponent } from '../../shared/classes/base-page';
import { IonicPage, NavController, Platform, NavParams, } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { getDetails, getBusiness, getCandidateName, getTime } from '../candidate-details/candidate-details.selector';
var FakeCandidateDetailsPage = /** @class */ (function (_super) {
    __extends(FakeCandidateDetailsPage, _super);
    function FakeCandidateDetailsPage(navController, platform, authenticationProvider, navParams) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.navController = navController;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.navParams = navParams;
        _this.slot = _this.navParams.get('slot');
        return _this;
    }
    FakeCandidateDetailsPage.prototype.ngOnInit = function () {
        this.name = getCandidateName(this.slot);
        this.time = getTime(this.slot);
        this.details = getDetails(this.slot);
        this.business = getBusiness(this.slot);
    };
    FakeCandidateDetailsPage.prototype.specialNeedsIsPopulated = function (specialNeeds) {
        return Array.isArray(specialNeeds);
    };
    FakeCandidateDetailsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-fake-candidate-details',
            templateUrl: 'fake-candidate-details.html',
        }),
        __metadata("design:paramtypes", [NavController,
            Platform,
            AuthenticationProvider,
            NavParams])
    ], FakeCandidateDetailsPage);
    return FakeCandidateDetailsPage;
}(BasePageComponent));
export { FakeCandidateDetailsPage };
//# sourceMappingURL=fake-candidate-details.js.map