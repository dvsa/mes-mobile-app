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
import { concatMap, withLatestFrom } from 'rxjs/operators';
import * as testStatusActions from '../../modules/tests/test-status/test-status.actions';
import * as testsActions from '../../modules/tests/tests.actions';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTestSlotId } from '../../modules/tests/tests.selector';
import { CONTINUE_FROM_DECLARATION } from './health-declaration.actions';
import { of } from 'rxjs';
var HealthDeclarationEffects = /** @class */ (function () {
    function HealthDeclarationEffects(actions$, store$) {
        var _this = this;
        this.actions$ = actions$;
        this.store$ = store$;
        this.endHealthDeclarationEffect$ = this.actions$.pipe(ofType(CONTINUE_FROM_DECLARATION), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests), select(getCurrentTestSlotId)))); }), concatMap(function (_a) {
            var action = _a[0], slotId = _a[1];
            return [
                new testStatusActions.SetTestStatusWriteUp(slotId),
                new testsActions.PersistTests(),
            ];
        }));
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], HealthDeclarationEffects.prototype, "endHealthDeclarationEffect$", void 0);
    HealthDeclarationEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Actions,
            Store])
    ], HealthDeclarationEffects);
    return HealthDeclarationEffects;
}());
export { HealthDeclarationEffects };
//# sourceMappingURL=health-declaration.effects.js.map