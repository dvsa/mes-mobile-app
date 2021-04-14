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
import { select, Store } from '@ngrx/store';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../../modules/tests/test-data/cat-be/test-data.cat-be.reducer';
import { map } from 'rxjs/operators';
import { getVehicleChecksCatBE } from '../../../../../modules/tests/test-data/cat-be/vehicle-checks/vehicle-checks.cat-be.selector';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
var VehicleChecksComponent = /** @class */ (function () {
    function VehicleChecksComponent(store$, faultCountProvider) {
        this.store$ = store$;
        this.faultCountProvider = faultCountProvider;
    }
    VehicleChecksComponent.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        this.componentState = {
            vehicleChecksDrivingFaultCount$: currentTest$.pipe(select(getTestData), select(getVehicleChecksCatBE), map(function (vehicleChecks) {
                return _this.faultCountProvider.getVehicleChecksFaultCount("B+E" /* BE */, vehicleChecks).drivingFaults;
            })),
            vehicleChecksSeriousFaultCount$: currentTest$.pipe(select(getTestData), select(getVehicleChecksCatBE), map(function (vehicleChecks) {
                return _this.faultCountProvider.getVehicleChecksFaultCount("B+E" /* BE */, vehicleChecks).seriousFaults;
            })),
        };
    };
    VehicleChecksComponent = __decorate([
        Component({
            selector: 'vehicle-checks',
            templateUrl: 'vehicle-checks.html',
        }),
        __metadata("design:paramtypes", [Store,
            FaultCountProvider])
    ], VehicleChecksComponent);
    return VehicleChecksComponent;
}());
export { VehicleChecksComponent };
//# sourceMappingURL=vehicle-checks.js.map