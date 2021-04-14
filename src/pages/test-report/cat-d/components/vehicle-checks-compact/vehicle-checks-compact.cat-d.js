var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { map } from 'rxjs/operators';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
import { TestDataByCategoryProvider } from '../../../../../providers/test-data-by-category/test-data-by-category';
import { getVehicleChecksCatD } from '../../../../../modules/tests/test-data/cat-d/vehicle-checks/vehicle-checks.cat-d.selector';
var VehicleChecksCompactCatDComponent = /** @class */ (function () {
    function VehicleChecksCompactCatDComponent(store$, faultCountProvider, testDataByCategory) {
        this.store$ = store$;
        this.faultCountProvider = faultCountProvider;
        this.testDataByCategory = testDataByCategory;
    }
    VehicleChecksCompactCatDComponent.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.componentState = {
            vehicleChecksDrivingFaultCount$: currentTest$.pipe(map(function (data) { return _this.testDataByCategory.getTestDataByCategoryCode(_this.testCategory)(data); }), select(getVehicleChecksCatD), map(function (vehicleChecks) {
                return _this.faultCountProvider.getVehicleChecksFaultCount(_this.testCategory, vehicleChecks).drivingFaults;
            })),
            vehicleChecksSeriousFaultCount$: currentTest$.pipe(map(function (data) { return _this.testDataByCategory.getTestDataByCategoryCode(_this.testCategory)(data); }), select(getVehicleChecksCatD), map(function (vehicleChecks) {
                return _this.faultCountProvider.getVehicleChecksFaultCount(_this.testCategory, vehicleChecks).seriousFaults;
            })),
        };
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], VehicleChecksCompactCatDComponent.prototype, "testCategory", void 0);
    VehicleChecksCompactCatDComponent = __decorate([
        Component({
            selector: 'vehicle-checks-compact-cat-d',
            templateUrl: 'vehicle-checks-compact.cat-d.html',
        }),
        __metadata("design:paramtypes", [Store,
            FaultCountProvider,
            TestDataByCategoryProvider])
    ], VehicleChecksCompactCatDComponent);
    return VehicleChecksCompactCatDComponent;
}());
export { VehicleChecksCompactCatDComponent };
//# sourceMappingURL=vehicle-checks-compact.cat-d.js.map