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
import { get } from 'lodash';
import { convertBooleanToString, flattenArray } from '../../../view-test-result-helpers';
import { TestOutcome } from '../../../../../modules/tests/tests.constants';
var CPCTestSummaryCardComponent = /** @class */ (function () {
    function CPCTestSummaryCardComponent() {
    }
    CPCTestSummaryCardComponent.prototype.getAssessmentReport = function () {
        return get(this.testSummary, 'assessmentReport');
    };
    CPCTestSummaryCardComponent.prototype.getAccompaniedBy = function () {
        var accompaniedBy = [];
        if (get(this.accompaniment, 'ADI')) {
            accompaniedBy.push('ADI');
        }
        if (get(this.accompaniment, 'interpreter')) {
            accompaniedBy.push('Interpreter');
        }
        if (get(this.accompaniment, 'supervisor')) {
            accompaniedBy.push('Supervisor');
        }
        if (get(this.accompaniment, 'other')) {
            accompaniedBy.push('Other');
        }
        if (accompaniedBy.length === 0) {
            accompaniedBy.push('None');
        }
        return flattenArray(accompaniedBy);
    };
    CPCTestSummaryCardComponent.prototype.getProvisionalLicenceProvided = function () {
        return convertBooleanToString(get(this.passCompletion, 'provisionalLicenceProvided'));
    };
    CPCTestSummaryCardComponent.prototype.getPassCertificateNumber = function () {
        return get(this.passCompletion, 'passCertificateNumber');
    };
    CPCTestSummaryCardComponent.prototype.getCandidateDescription = function () {
        return get(this.testSummary, 'candidateDescription', 'None');
    };
    CPCTestSummaryCardComponent.prototype.getDebriefWitnessed = function () {
        return convertBooleanToString(get(this.testSummary, 'debriefWitnessed'));
    };
    CPCTestSummaryCardComponent.prototype.getD255 = function () {
        return convertBooleanToString(get(this.testSummary, 'D255'));
    };
    CPCTestSummaryCardComponent.prototype.getAdditionalInformation = function () {
        return get(this.testSummary, 'additionalInformation', 'None');
    };
    CPCTestSummaryCardComponent.prototype.shouldDisplayLicenceProvided = function (data) {
        return get(this.passCompletion, 'provisionalLicenceProvided') !== undefined;
    };
    CPCTestSummaryCardComponent.prototype.shouldDisplayAssessmentReport = function () {
        return this.testOutcome === TestOutcome.Failed;
    };
    CPCTestSummaryCardComponent.prototype.getConductedLanguage = function () {
        return get(this.communicationPreferences, 'conductedLanguage', 'None');
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CPCTestSummaryCardComponent.prototype, "accompaniment", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CPCTestSummaryCardComponent.prototype, "passCompletion", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CPCTestSummaryCardComponent.prototype, "testSummary", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CPCTestSummaryCardComponent.prototype, "testOutcome", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CPCTestSummaryCardComponent.prototype, "communicationPreferences", void 0);
    CPCTestSummaryCardComponent = __decorate([
        Component({
            selector: 'cpc-test-summary-card',
            templateUrl: 'test-summary-card.html',
        }),
        __metadata("design:paramtypes", [])
    ], CPCTestSummaryCardComponent);
    return CPCTestSummaryCardComponent;
}());
export { CPCTestSummaryCardComponent };
//# sourceMappingURL=test-summary-card.js.map