var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { map } from 'rxjs/operators';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
import { TestDataByCategoryProvider } from '../../../../../providers/test-data-by-category/test-data-by-category';
import { getSafetyQuestionsCatD, } from '../../../../../modules/tests/test-data/cat-d/safety-questions/safety-questions.cat-d.selector';
var SafetyQuestionsCatDComponent = /** @class */ (function () {
    function SafetyQuestionsCatDComponent(store$, faultCountProvider, testDataByCategory) {
        this.store$ = store$;
        this.faultCountProvider = faultCountProvider;
        this.testDataByCategory = testDataByCategory;
    }
    SafetyQuestionsCatDComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.componentState = {
            safetyQuestionsDrivingFaultCount$: this.store$.pipe(select(getTests), select(getCurrentTest), map(function (data) { return _this.testDataByCategory.getTestDataByCategoryCode(_this.testCategory)(data); }), select(getSafetyQuestionsCatD), map(function (safetyQuestions) {
                return _this.faultCountProvider.getSafetyQuestionsFaultCount(_this.testCategory, safetyQuestions).drivingFaults;
            })),
        };
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SafetyQuestionsCatDComponent.prototype, "testCategory", void 0);
    SafetyQuestionsCatDComponent = __decorate([
        Component({
            selector: 'safety-questions-cat-d',
            templateUrl: 'safety-questions.cat-d.html',
        }),
        __metadata("design:paramtypes", [Store,
            FaultCountProvider,
            TestDataByCategoryProvider])
    ], SafetyQuestionsCatDComponent);
    return SafetyQuestionsCatDComponent;
}());
export { SafetyQuestionsCatDComponent };
//# sourceMappingURL=safety-questions.cat-d.js.map