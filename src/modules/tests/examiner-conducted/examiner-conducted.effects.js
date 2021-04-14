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
import { map, withLatestFrom, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getTests } from './../tests.reducer';
import { getCurrentTest } from './../tests.selector';
import { SetChangeMarker } from '../change-marker/change-marker.actions';
import { SET_EXAMINER_CONDUCTED } from './examiner-conducted.actions';
var ExaminerConductedEffects = /** @class */ (function () {
    function ExaminerConductedEffects(actions$, store$) {
        var _this = this;
        this.actions$ = actions$;
        this.store$ = store$;
        this.setExaminerConductedEffect$ = this.actions$.pipe(ofType(SET_EXAMINER_CONDUCTED), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests), select(getCurrentTest)))); }), map(function (_a) {
            var action = _a[0], test = _a[1];
            return new SetChangeMarker(action.examinerConducted !== test.examinerBooked);
        }));
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], ExaminerConductedEffects.prototype, "setExaminerConductedEffect$", void 0);
    ExaminerConductedEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Actions,
            Store])
    ], ExaminerConductedEffects);
    return ExaminerConductedEffects;
}());
export { ExaminerConductedEffects };
//# sourceMappingURL=examiner-conducted.effects.js.map