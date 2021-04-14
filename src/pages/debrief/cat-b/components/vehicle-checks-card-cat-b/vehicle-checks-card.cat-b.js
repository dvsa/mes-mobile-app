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
import { Store, select } from '@ngrx/store';
import { merge } from 'rxjs';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../../modules/tests/test-data/cat-b/test-data.reducer';
import { getVehicleChecks } from '../../../../../modules/tests/test-data/cat-b/test-data.cat-b.selector';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
import { map } from 'rxjs/operators';
var VehicleChecksCardCatBComponent = /** @class */ (function () {
    function VehicleChecksCardCatBComponent(store$) {
        this.store$ = store$;
        this.hasFault = false;
        this.hasShowMeFault = false;
    }
    VehicleChecksCardCatBComponent_1 = VehicleChecksCardCatBComponent;
    VehicleChecksCardCatBComponent.prototype.ngOnInit = function () {
        var _this = this;
        var vehicleChecks$ = this.store$.pipe(select(getTests), select(getCurrentTest), select(getTestData), select(getVehicleChecks));
        this.componentState = {
            showMeQuestionOutcome$: vehicleChecks$.pipe(select(VehicleChecksCardCatBComponent_1.getShowMeQuestionOutcome)),
            tellMeQuestionHasFault$: vehicleChecks$.pipe(select(VehicleChecksCardCatBComponent_1.tellMeQuestionHasFault)),
            hasVehicleChecksFault$: vehicleChecks$.pipe(select(VehicleChecksCardCatBComponent_1.hasVehicleChecksFault)),
        };
        var _a = this.componentState, hasVehicleChecksFault$ = _a.hasVehicleChecksFault$, showMeQuestionOutcome$ = _a.showMeQuestionOutcome$;
        this.subscription = merge(hasVehicleChecksFault$.pipe(map(function (val) { return _this.hasFault = val; })), showMeQuestionOutcome$.pipe(map(function (val) { return _this.hasShowMeFault = val !== CompetencyOutcome.P; }))).subscribe();
    };
    VehicleChecksCardCatBComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    var VehicleChecksCardCatBComponent_1;
    VehicleChecksCardCatBComponent.tellMeQuestionHasFault = function (vehicleChecks) {
        return vehicleChecks.tellMeQuestion.outcome === CompetencyOutcome.DF;
    };
    VehicleChecksCardCatBComponent.getShowMeQuestionOutcome = function (vehicleChecks) {
        return vehicleChecks.showMeQuestion.outcome;
    };
    VehicleChecksCardCatBComponent.hasVehicleChecksFault = function (vehicleChecks) {
        return (vehicleChecks.tellMeQuestion.outcome && vehicleChecks.tellMeQuestion.outcome !== CompetencyOutcome.P)
            || vehicleChecks.showMeQuestion.outcome && vehicleChecks.showMeQuestion.outcome !== CompetencyOutcome.P;
    };
    VehicleChecksCardCatBComponent = VehicleChecksCardCatBComponent_1 = __decorate([
        Component({
            selector: 'vehicle-checks-card-cat-b',
            templateUrl: 'vehicle-checks-card.cat-b.html',
        }),
        __metadata("design:paramtypes", [Store])
    ], VehicleChecksCardCatBComponent);
    return VehicleChecksCardCatBComponent;
}());
export { VehicleChecksCardCatBComponent };
//# sourceMappingURL=vehicle-checks-card.cat-b.js.map