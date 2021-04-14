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
import { flattenArray, convertBooleanToString } from '../../view-test-result-helpers';
var TestSummaryCardComponent = /** @class */ (function () {
    function TestSummaryCardComponent() {
    }
    TestSummaryCardComponent.prototype.getAccompaniedBy = function () {
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
    TestSummaryCardComponent.prototype.getProvisionalLicenceProvided = function () {
        return convertBooleanToString(get(this.passCompletion, 'provisionalLicenceProvided'));
    };
    TestSummaryCardComponent.prototype.getCode78 = function () {
        var code78 = get(this.passCompletion, 'code78Present', null);
        return code78 !== null ? convertBooleanToString(code78) : null;
    };
    TestSummaryCardComponent.prototype.getPassCertificateNumber = function () {
        return get(this.passCompletion, 'passCertificateNumber');
    };
    TestSummaryCardComponent.prototype.getRouteNumber = function () {
        return get(this.testSummary, 'routeNumber', 'None');
    };
    TestSummaryCardComponent.prototype.getIndependentDriving = function () {
        return get(this.testSummary, 'independentDriving', 'None');
    };
    TestSummaryCardComponent.prototype.getCandidateDescription = function () {
        return get(this.testSummary, 'candidateDescription', 'None');
    };
    TestSummaryCardComponent.prototype.getDebriefWitnessed = function () {
        return convertBooleanToString(get(this.testSummary, 'debriefWitnessed'));
    };
    TestSummaryCardComponent.prototype.getWeatherConditions = function () {
        return flattenArray(get(this.testSummary, 'weatherConditions', ['None']));
    };
    TestSummaryCardComponent.prototype.getD255 = function () {
        return convertBooleanToString(get(this.testSummary, 'D255'));
    };
    TestSummaryCardComponent.prototype.getAdditionalInformation = function () {
        return get(this.testSummary, 'additionalInformation', 'None');
    };
    TestSummaryCardComponent.prototype.shouldDisplayLicenceProvided = function (data) {
        return get(this.passCompletion, 'provisionalLicenceProvided') !== undefined;
    };
    TestSummaryCardComponent.prototype.shouldDisplayTestConductedOn = function () {
        return get(this.testSummary, 'modeOfTransport') !== undefined;
    };
    TestSummaryCardComponent.prototype.getTestConductedOn = function () {
        return get(this.testSummary, 'modeOfTransport', 'None');
    };
    TestSummaryCardComponent.prototype.getConductedLanguage = function () {
        return get(this.communicationPreferences, 'conductedLanguage', 'None');
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TestSummaryCardComponent.prototype, "accompaniment", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TestSummaryCardComponent.prototype, "passCompletion", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TestSummaryCardComponent.prototype, "testSummary", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TestSummaryCardComponent.prototype, "communicationPreferences", void 0);
    TestSummaryCardComponent = __decorate([
        Component({
            selector: 'test-summary-card',
            templateUrl: 'test-summary-card.html',
        }),
        __metadata("design:paramtypes", [])
    ], TestSummaryCardComponent);
    return TestSummaryCardComponent;
}());
export { TestSummaryCardComponent };
//# sourceMappingURL=test-summary-card.js.map