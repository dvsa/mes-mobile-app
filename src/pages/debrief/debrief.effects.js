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
import { switchMap, withLatestFrom, concatMap } from 'rxjs/operators';
import * as debriefActions from './debrief.actions';
import * as testStatusActions from '../../modules/tests/test-status/test-status.actions';
import * as testsActions from '../../modules/tests/tests.actions';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTestSlotId } from '../../modules/tests/tests.selector';
import { of } from 'rxjs';
var DebriefEffects = /** @class */ (function () {
    function DebriefEffects(actions$, store$) {
        var _this = this;
        this.actions$ = actions$;
        this.store$ = store$;
        this.endDebriefEffect$ = this.actions$.pipe(ofType(debriefActions.END_DEBRIEF), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests), select(getCurrentTestSlotId)))); }), switchMap(function (_a) {
            var action = _a[0], slotId = _a[1];
            return [
                new testStatusActions.SetTestStatusDecided(slotId),
                new testsActions.PersistTests(),
            ];
        }));
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], DebriefEffects.prototype, "endDebriefEffect$", void 0);
    DebriefEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Actions,
            Store])
    ], DebriefEffects);
    return DebriefEffects;
}());
export { DebriefEffects };
//# sourceMappingURL=debrief.effects.js.map