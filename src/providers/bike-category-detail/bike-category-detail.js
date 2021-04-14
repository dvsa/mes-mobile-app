var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import bikeCategoryDetails from '../../shared/constants/bike-category-details/bike-category-details';
var BikeCategoryDetailProvider = /** @class */ (function () {
    function BikeCategoryDetailProvider() {
    }
    BikeCategoryDetailProvider.prototype.getDetailByCategoryCode = function (category) {
        return bikeCategoryDetails.find(function (item) { return item.categoryCode === category; });
    };
    BikeCategoryDetailProvider.prototype.getAllDetailsByTestType = function (testType) {
        return bikeCategoryDetails.filter(function (bikeDetail) { return bikeDetail.testType === testType; });
    };
    BikeCategoryDetailProvider = __decorate([
        Injectable()
    ], BikeCategoryDetailProvider);
    return BikeCategoryDetailProvider;
}());
export { BikeCategoryDetailProvider };
//# sourceMappingURL=bike-category-detail.js.map