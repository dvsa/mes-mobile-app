var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom, concatMap } from 'rxjs/operators';
import * as dangerousFaultsActions from '../../modules/tests/test-data/common/dangerous-faults/dangerous-faults.actions';
import * as seriousFaultsActions from '../../modules/tests/test-data/common/serious-faults/serious-faults.actions';
import * as drivingFaultsActions from '../../modules/tests/test-data/common/driving-faults/driving-faults.actions';
import * as singleFaultCompetencyActions from '../../modules/tests/test-data/common/single-fault-competencies/single-fault-competencies.actions';
import * as testSummaryActions from '../../modules/tests/test-summary/common/test-summary.actions';
import * as officeActions from './office.actions';
import * as testStatusActions from '../../modules/tests/test-status/test-status.actions';
import * as testsActions from '../../modules/tests/tests.actions';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTestSlotId } from '../../modules/tests/tests.selector';
import { of } from 'rxjs';
var OfficeEffects = /** @class */ (function () {
    function OfficeEffects(actions$, store$) {
        var _this = this;
        this.actions$ = actions$;
        this.store$ = store$;
        this.persistOfficeDataEffect$ = this.actions$.pipe(ofType(dangerousFaultsActions.ADD_DANGEROUS_FAULT_COMMENT, seriousFaultsActions.ADD_SERIOUS_FAULT_COMMENT, drivingFaultsActions.ADD_DRIVING_FAULT_COMMENT, singleFaultCompetencyActions.ADD_SINGLE_FAULT_COMPETENCY_COMMENT, testSummaryActions.DEBRIEF_WITNESSED, testSummaryActions.DEBRIEF_UNWITNESSED, testSummaryActions.IDENTIFICATION_USED_CHANGED, testSummaryActions.INDEPENDENT_DRIVING_TYPE_CHANGED, testSummaryActions.ROUTE_NUMBER_CHANGED, testSummaryActions.WEATHER_CONDITIONS_CHANGED, testSummaryActions.ADDITIONAL_INFORMATION_CHANGED, testSummaryActions.CANDIDATE_DESCRIPTION_CHANGED, testSummaryActions.D255_YES, testSummaryActions.D255_NO), map(function () { return new testsActions.PersistTests(); }));
        this.completeTestEffect$ = this.actions$.pipe(ofType(officeActions.COMPLETE_TEST), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests), select(getCurrentTestSlotId)))); }), switchMap(function (_a) {
            var action = _a[0], slotId = _a[1];
            return [
                new testStatusActions.SetTestStatusCompleted(slotId),
                new testsActions.PersistTests(),
            ];
        }));
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], OfficeEffects.prototype, "persistOfficeDataEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], OfficeEffects.prototype, "completeTestEffect$", void 0);
    OfficeEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Actions,
            Store])
    ], OfficeEffects);
    return OfficeEffects;
}());
export { OfficeEffects };
//# sourceMappingURL=office.effects.js.map