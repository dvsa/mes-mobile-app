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
import { TestOutcome } from '../../../../modules/tests/tests.constants';
var CandidateSectionComponent = /** @class */ (function () {
    function CandidateSectionComponent() {
        this.getTestOutcomeClass = function (testOutcome) {
            switch (testOutcome) {
                case TestOutcome.Passed:
                    return 'pass';
                case TestOutcome.Failed:
                    return 'fail';
                case TestOutcome.Terminated:
                    return 'terminated';
            }
        };
    }
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CandidateSectionComponent.prototype, "candidateName", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CandidateSectionComponent.prototype, "driverNumber", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CandidateSectionComponent.prototype, "startTime", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CandidateSectionComponent.prototype, "testOutcomeText", void 0);
    CandidateSectionComponent = __decorate([
        Component({
            selector: 'office-candidate-section',
            templateUrl: 'candidate-section.html',
        })
    ], CandidateSectionComponent);
    return CandidateSectionComponent;
}());
export { CandidateSectionComponent };
//# sourceMappingURL=candidate-section.js.map