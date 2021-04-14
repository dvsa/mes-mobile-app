var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { removeLeadingZeros } from '../../../../shared/helpers/formatters';
var AdvancedSearchComponent = /** @class */ (function () {
    function AdvancedSearchComponent() {
        var _this = this;
        this.onSearchTests = new EventEmitter();
        this.dtcNumber = '';
        this.staffNumber = '';
        this.startDate = '';
        this.endDate = '';
        this.customStartDateOptions = {
            buttons: [{
                    text: 'Clear',
                    handler: function () { return _this.startDate = ''; },
                }],
        };
        this.customEndDateOptions = {
            buttons: [{
                    text: 'Clear',
                    handler: function () { return _this.endDate = ''; },
                }],
        };
    }
    AdvancedSearchComponent.prototype.dtcNumberChanged = function (val) {
        this.dtcNumber = val;
    };
    AdvancedSearchComponent.prototype.staffNumberChanged = function (val) {
        this.staffNumber = val;
    };
    AdvancedSearchComponent.prototype.searchTests = function () {
        var advancedSearchParams = {
            startDate: this.startDate,
            endDate: this.endDate,
            staffNumber: removeLeadingZeros(this.staffNumber),
            costCode: this.dtcNumber,
        };
        this.onSearchTests.emit(advancedSearchParams);
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AdvancedSearchComponent.prototype, "showSpinner", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AdvancedSearchComponent.prototype, "onSearchTests", void 0);
    AdvancedSearchComponent = __decorate([
        Component({
            selector: 'advanced-search',
            templateUrl: 'advanced-search.html',
        }),
        __metadata("design:paramtypes", [])
    ], AdvancedSearchComponent);
    return AdvancedSearchComponent;
}());
export { AdvancedSearchComponent };
//# sourceMappingURL=advanced-search.js.map