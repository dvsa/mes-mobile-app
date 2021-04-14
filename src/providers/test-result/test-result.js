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
import { ActivityCodes } from '../../shared/models/activity-codes';
import { of } from 'rxjs';
import { FaultCountProvider } from '../fault-count/fault-count';
import { getSpeedRequirementNotMet } from '../../modules/tests/test-data/cat-a-mod1/test-data.cat-a-mod1.selector';
var TestResultProvider = /** @class */ (function () {
    function TestResultProvider(faultCountProvider) {
        var _this = this;
        this.faultCountProvider = faultCountProvider;
        this.calculateCatAdiPart2TestResult = function (testData) {
            if (_this.faultCountProvider.getDangerousFaultSumCount("ADI2" /* ADI2 */, testData) > 0) {
                return of(ActivityCodes.FAIL);
            }
            if (_this.faultCountProvider.getSeriousFaultSumCount("ADI2" /* ADI2 */, testData) > 0) {
                return of(ActivityCodes.FAIL);
            }
            if (_this.faultCountProvider.getDrivingFaultSumCount("ADI2" /* ADI2 */, testData) > 6) {
                return of(ActivityCodes.FAIL);
            }
            return of(ActivityCodes.PASS);
        };
        this.calculateCatBTestResult = function (testData) {
            if (_this.faultCountProvider.getDangerousFaultSumCount("B" /* B */, testData) > 0) {
                return of(ActivityCodes.FAIL);
            }
            if (_this.faultCountProvider.getSeriousFaultSumCount("B" /* B */, testData) > 0) {
                return of(ActivityCodes.FAIL);
            }
            if (_this.faultCountProvider.getDrivingFaultSumCount("B" /* B */, testData) > 15) {
                return of(ActivityCodes.FAIL);
            }
            return of(ActivityCodes.PASS);
        };
        this.calculateCatBETestResult = function (testData) {
            if (_this.faultCountProvider.getDangerousFaultSumCount("B+E" /* BE */, testData) > 0) {
                return of(ActivityCodes.FAIL);
            }
            if (_this.faultCountProvider.getSeriousFaultSumCount("B+E" /* BE */, testData) > 0) {
                return of(ActivityCodes.FAIL);
            }
            if (_this.faultCountProvider.getDrivingFaultSumCount("B+E" /* BE */, testData) > 15) {
                return of(ActivityCodes.FAIL);
            }
            return of(ActivityCodes.PASS);
        };
        this.calculateCatCAndSubCategoryTestResult = function (category, testData) {
            if (_this.faultCountProvider.getDangerousFaultSumCount(category, testData) > 0) {
                return of(ActivityCodes.FAIL);
            }
            if (_this.faultCountProvider.getSeriousFaultSumCount(category, testData) > 0) {
                return of(ActivityCodes.FAIL);
            }
            if (_this.faultCountProvider.getDrivingFaultSumCount(category, testData) > 15) {
                return of(ActivityCodes.FAIL);
            }
            return of(ActivityCodes.PASS);
        };
        this.calculateCatEUAM1AndSubCategoryTestResult = function (category, testData) {
            if (getSpeedRequirementNotMet(testData)) {
                return of(ActivityCodes.FAIL_PUBLIC_SAFETY);
            }
            if (_this.faultCountProvider.getDangerousFaultSumCount(category, testData) > 0) {
                return of(ActivityCodes.FAIL);
            }
            if (_this.faultCountProvider.getSeriousFaultSumCount(category, testData) > 0) {
                return of(ActivityCodes.FAIL);
            }
            if (_this.faultCountProvider.getDrivingFaultSumCount(category, testData) >= 6) {
                return of(ActivityCodes.FAIL);
            }
            return of(ActivityCodes.PASS);
        };
        this.calculateCatEUAM2AndSubCategoryTestResult = function (category, testData) {
            if (_this.faultCountProvider.getDangerousFaultSumCount(category, testData) > 0) {
                return of(ActivityCodes.FAIL);
            }
            if (_this.faultCountProvider.getSeriousFaultSumCount(category, testData) > 0) {
                return of(ActivityCodes.FAIL);
            }
            if (_this.faultCountProvider.getDrivingFaultSumCount(category, testData) > 10) {
                return of(ActivityCodes.FAIL);
            }
            return of(ActivityCodes.PASS);
        };
        this.calculateCatDandSubCategoryTestResult = function (category, testData) {
            if (_this.faultCountProvider.getDangerousFaultSumCount(category, testData) > 0) {
                return of(ActivityCodes.FAIL);
            }
            if (_this.faultCountProvider.getSeriousFaultSumCount(category, testData) > 0) {
                return of(ActivityCodes.FAIL);
            }
            if (_this.faultCountProvider.getDrivingFaultSumCount(category, testData) > 15) {
                return of(ActivityCodes.FAIL);
            }
            return of(ActivityCodes.PASS);
        };
        this.calculateCatHomeTestResult = function (category, testData) {
            if (_this.faultCountProvider.getDangerousFaultSumCount(category, testData) > 0) {
                return of(ActivityCodes.FAIL);
            }
            if (_this.faultCountProvider.getSeriousFaultSumCount(category, testData) > 0) {
                return of(ActivityCodes.FAIL);
            }
            if (_this.faultCountProvider.getDrivingFaultSumCount(category, testData) > 15) {
                return of(ActivityCodes.FAIL);
            }
            return of(ActivityCodes.PASS);
        };
        this.calculateCatCPCTestResult = function (testData) {
            var question1 = testData.question1, question2 = testData.question2, question3 = testData.question3, question4 = testData.question4, question5 = testData.question5;
            var scores = [question1.score, question2.score, question3.score, question4.score, question5.score];
            // fail if any score is less than 15
            if (scores.some(function (score) { return score < 15; })) {
                return of(ActivityCodes.FAIL);
            }
            // fail if at least one score is not 20
            if (scores.indexOf(20) === -1) {
                return of(ActivityCodes.FAIL);
            }
            return of(ActivityCodes.PASS);
        };
    }
    TestResultProvider.prototype.calculateTestResult = function (category, testData) {
        switch (category) {
            case "ADI2" /* ADI2 */:
                return this.calculateCatAdiPart2TestResult(testData);
            case "B" /* B */:
                return this.calculateCatBTestResult(testData);
            case "B+E" /* BE */:
                return this.calculateCatBETestResult(testData);
            case "C" /* C */:
            case "C1" /* C1 */:
            case "C+E" /* CE */:
            case "C1+E" /* C1E */:
                return this.calculateCatCAndSubCategoryTestResult(category, testData);
            case "CCPC" /* CCPC */:
            case "DCPC" /* DCPC */:
                return this.calculateCatCPCTestResult(testData);
            case "EUAM1" /* EUAM1 */:
            case "EUA1M1" /* EUA1M1 */:
            case "EUA2M1" /* EUA2M1 */:
            case "EUAMM1" /* EUAMM1 */:
                return this.calculateCatEUAM1AndSubCategoryTestResult("EUAM1" /* EUAM1 */, testData);
            case "EUAM2" /* EUAM2 */:
            case "EUA1M2" /* EUA1M2 */:
            case "EUA2M2" /* EUA2M2 */:
            case "EUAMM2" /* EUAMM2 */:
                return this.calculateCatEUAM2AndSubCategoryTestResult("EUAM2" /* EUAM2 */, testData);
            case "D" /* D */:
            case "D1" /* D1 */:
            case "D+E" /* DE */:
            case "D1+E" /* D1E */:
                return this.calculateCatDandSubCategoryTestResult(category, testData);
            case "F" /* F */:
            case "G" /* G */:
            case "H" /* H */:
            case "K" /* K */:
                return this.calculateCatHomeTestResult(category, testData);
            default:
                throw new Error("Invalid Test Category when trying to calculate test result - " + category);
        }
    };
    TestResultProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [FaultCountProvider])
    ], TestResultProvider);
    return TestResultProvider;
}());
export { TestResultProvider };
//# sourceMappingURL=test-result.js.map