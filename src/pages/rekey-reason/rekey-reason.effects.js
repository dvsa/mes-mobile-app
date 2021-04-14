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
import { catchError, concatMap, withLatestFrom, switchMap } from 'rxjs/operators';
import * as rekeyActions from './rekey-reason.actions';
import { of } from 'rxjs';
import { FindUserProvider } from '../../providers/find-user/find-user';
import * as testActions from '../../modules/tests/tests.actions';
import { select, Store } from '@ngrx/store';
import { getCurrentTest } from '../../modules/tests/tests.selector';
import { getTests } from '../../modules/tests/tests.reducer';
import { HttpStatusCodes } from '../../shared/models/http-status-codes';
var RekeyReasonEffects = /** @class */ (function () {
    function RekeyReasonEffects(actions$, store$, findUserProvider) {
        var _this = this;
        this.actions$ = actions$;
        this.store$ = store$;
        this.findUserProvider = findUserProvider;
        this.rekeyReasonValidateTransferEffect$ = this.actions$.pipe(ofType(rekeyActions.VALIDATE_TRANSFER_REKEY), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getTests), select(getCurrentTest)))); }), switchMap(function (_a) {
            var action = _a[0], test = _a[1];
            if (test.examinerBooked === test.examinerConducted) {
                return of(new testActions.SendCurrentTest());
            }
            return _this.findUserProvider.userExists(test.examinerConducted)
                .pipe(switchMap(function (response) {
                return of(new testActions.SendCurrentTest());
            }), catchError(function (error) {
                return of(new rekeyActions.ValidateTransferRekeyFailed(error.status === HttpStatusCodes.NOT_FOUND));
            }));
        }));
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], RekeyReasonEffects.prototype, "rekeyReasonValidateTransferEffect$", void 0);
    RekeyReasonEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Actions,
            Store,
            FindUserProvider])
    ], RekeyReasonEffects);
    return RekeyReasonEffects;
}());
export { RekeyReasonEffects };
//# sourceMappingURL=rekey-reason.effects.js.map