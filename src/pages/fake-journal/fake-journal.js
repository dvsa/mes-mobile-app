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
import { IonicPage, NavController, Platform, } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import * as moment from 'moment';
import { fakeJournalTestSlots } from './__mocks__/fake-journal.mock';
import { end2endPracticeSlotId } from '../../shared/mocks/test-slot-ids.mock';
var FakeJournalPage = /** @class */ (function (_super) {
    __extends(FakeJournalPage, _super);
    function FakeJournalPage(navController, platform, authenticationProvider) {
        var _this = _super.call(this, platform, navController, authenticationProvider) || this;
        _this.navController = navController;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        _this.slots = fakeJournalTestSlots;
        _this.isRedLineSlot = function (slotId) { return slotId === end2endPracticeSlotId + "_2"; };
        _this.dateToDisplay = moment().format('dddd D MMMM YYYY');
        return _this;
    }
    FakeJournalPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-fake-journal',
            templateUrl: 'fake-journal.html',
        }),
        __metadata("design:paramtypes", [NavController,
            Platform,
            AuthenticationProvider])
    ], FakeJournalPage);
    return FakeJournalPage;
}(BasePageComponent));
export { FakeJournalPage };
//# sourceMappingURL=fake-journal.js.map