var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../../modules/tests/test-data/cat-a-mod2/test-data.cat-a-mod2.reducer';
import { getSafetyAndBalanceQuestions, } from '../../../../../modules/tests/test-data/cat-a-mod2/test-data.cat-a-mod2.selector';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
import { map } from 'rxjs/operators';
var SafetyAndBalanceCardCatAMod2Component = /** @class */ (function () {
    function SafetyAndBalanceCardCatAMod2Component(store$) {
        this.store$ = store$;
        this.questionHasFault = function (result) { return result.outcome !== CompetencyOutcome.P; };
    }
    SafetyAndBalanceCardCatAMod2Component.prototype.ngOnInit = function () {
        this.safetyAndBalanceQuestions$ = this.store$.pipe(select(getTests), select(getCurrentTest), select(getTestData), select(getSafetyAndBalanceQuestions), map(function (questions) { return __spreadArray(__spreadArray([], questions.safetyQuestions), questions.balanceQuestions); }), map(function (checks) { return checks.filter(function (c) { return c.code !== undefined; }); }));
    };
    SafetyAndBalanceCardCatAMod2Component = __decorate([
        Component({
            selector: 'safety-and-balance-card-cat-a-mod2',
            templateUrl: 'safety-and-balance-card.cat-a-mod2.html',
        }),
        __metadata("design:paramtypes", [Store])
    ], SafetyAndBalanceCardCatAMod2Component);
    return SafetyAndBalanceCardCatAMod2Component;
}());
export { SafetyAndBalanceCardCatAMod2Component };
//# sourceMappingURL=safety-and-balance-card.cat-a-mod2.js.map