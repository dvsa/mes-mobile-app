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
import { Actions, Effect, ofType } from '@ngrx/effects';
import { withLatestFrom, concatMap, switchMap, throttleTime } from 'rxjs/operators';
import * as drivingFaultsActions from './common/driving-faults/driving-faults.actions';
import * as ecoActions from './common/eco/eco.actions';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getTests } from './../tests.reducer';
import { getCurrentTest } from './../tests.selector';
import { getTestData } from './cat-b/test-data.reducer';
import { getEco } from './common/test-data.selector';
var TestDataEffects = /** @class */ (function () {
    function TestDataEffects(actions$, store$) {
        var _this = this;
        this.actions$ = actions$;
        this.store$ = store$;
        this.throttleAddDrivingFaultEffect$ = this.actions$.pipe(ofType(drivingFaultsActions.THROTTLE_ADD_DRIVING_FAULT), throttleTime(250), concatMap(function (action) {
            return of(new drivingFaultsActions.AddDrivingFault(action.payload));
        }));
        this.setEcoControlCompletedEffect$ = this.actions$.pipe(ofType(ecoActions.TOGGLE_CONTROL_ECO), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests), select(getCurrentTest), select(getTestData), select(getEco)))); }), switchMap(function (_a) {
            var action = _a[0], eco = _a[1];
            if (eco.adviceGivenControl && !eco.completed) {
                return of(new ecoActions.ToggleEco());
            }
            return of();
        }));
        this.setEcoPlanningCompletedEffect$ = this.actions$.pipe(ofType(ecoActions.TOGGLE_PLANNING_ECO), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests), select(getCurrentTest), select(getTestData), select(getEco)))); }), switchMap(function (_a) {
            var action = _a[0], eco = _a[1];
            if (eco.adviceGivenPlanning && !eco.completed) {
                return of(new ecoActions.ToggleEco());
            }
            return of();
        }));
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestDataEffects.prototype, "throttleAddDrivingFaultEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestDataEffects.prototype, "setEcoControlCompletedEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], TestDataEffects.prototype, "setEcoPlanningCompletedEffect$", void 0);
    TestDataEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Actions,
            Store])
    ], TestDataEffects);
    return TestDataEffects;
}());
export { TestDataEffects };
//# sourceMappingURL=test-data.effects.js.map