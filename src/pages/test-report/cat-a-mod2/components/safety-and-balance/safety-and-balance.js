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
import { getTestData } from '../../../../../modules/tests/test-data/cat-a-mod2/test-data.cat-a-mod2.reducer';
import { getTestCategory } from '../../../../../modules/tests/category/category.reducer';
import { map, withLatestFrom } from 'rxjs/operators';
import { getSafetyAndBalanceQuestions } from '../../../../../modules/tests/test-data/cat-a-mod2/safety-and-balance/safety-and-balance.cat-a-mod2.selector';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
var SafetyAndBalanceComponent = /** @class */ (function () {
    function SafetyAndBalanceComponent(store$, faultCountProvider) {
        this.store$ = store$;
        this.faultCountProvider = faultCountProvider;
        this.category = "EUAM2" /* EUAM2 */;
    }
    SafetyAndBalanceComponent.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        var category$ = currentTest$.pipe(select(getTestCategory), map((function (result) { return _this.category = result; })));
        this.componentState = {
            safetyAndBalanceDrivingFaultCount$: currentTest$.pipe(select(getTestData), select(getSafetyAndBalanceQuestions), withLatestFrom(category$), map(function (_a) {
                var safetyAndBalance = _a[0], category = _a[1];
                return _this.faultCountProvider
                    .getSafetyAndBalanceFaultCount(category, safetyAndBalance)
                    .drivingFaults;
            })),
        };
    };
    SafetyAndBalanceComponent = __decorate([
        Component({
            selector: 'safety-and-balance',
            templateUrl: 'safety-and-balance.html',
        }),
        __metadata("design:paramtypes", [Store,
            FaultCountProvider])
    ], SafetyAndBalanceComponent);
    return SafetyAndBalanceComponent;
}());
export { SafetyAndBalanceComponent };
//# sourceMappingURL=safety-and-balance.js.map