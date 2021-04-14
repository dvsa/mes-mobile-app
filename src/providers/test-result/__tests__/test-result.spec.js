var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { TestBed } from '@angular/core/testing';
import { TestResultProvider } from '../test-result';
import { ActivityCodes } from '../../../shared/models/activity-codes';
import { FaultCountProvider } from '../../fault-count/fault-count';
import { configureTestSuite } from 'ng-bullet';
import * as mocks from '../__mocks__/test-result-data.mock';
describe('TestResultCalculatorProvider', function () {
    var categories = [
        "B" /* B */,
        "B+E" /* BE */,
        "C" /* C */,
        "C1" /* C1 */,
        "C1+E" /* C1E */,
        "C+E" /* CE */,
        "D" /* D */,
        "D1" /* D1 */,
        "D+E" /* DE */,
        "D1+E" /* D1E */,
        "F" /* F */,
        "G" /* G */,
        "H" /* H */,
        "K" /* K */,
    ];
    var adiCategories = [
        "ADI2" /* ADI2 */,
    ];
    var allCategories = __spreadArray(__spreadArray([], categories), adiCategories);
    var testResultProvider;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            providers: [
                TestResultProvider,
                FaultCountProvider,
            ],
        });
    });
    beforeEach(function () {
        testResultProvider = TestBed.get(TestResultProvider);
    });
    describe('calculateTestResult', function () {
        describe("" + allCategories.join(', '), function () {
            categories.forEach(function (cat) {
                it("should return a Pass when there are no driving faults for a Cat " + cat + " test", function (done) {
                    testResultProvider.calculateTestResult(cat, mocks.noFaultsMock).subscribe(function (result) {
                        expect(result).toBe(ActivityCodes.PASS);
                        done();
                    });
                });
                it("should return a Fail when a dangerous fault exists for a Cat " + cat + " test", function (done) {
                    testResultProvider.calculateTestResult(cat, mocks.dangerousFaultMock).subscribe(function (result) {
                        expect(result).toBe(ActivityCodes.FAIL);
                        done();
                    });
                });
                it("should return a Fail when a serious fault exists for a Cat " + cat + " test", function (done) {
                    testResultProvider.calculateTestResult(cat, mocks.seriousFaultMock).subscribe(function (result) {
                        expect(result).toBe(ActivityCodes.FAIL);
                        done();
                    });
                });
            });
        });
        describe('ADI2', function () {
            adiCategories.forEach(function (cat) {
                it("should return a Fail when there are 7 driving faults for a Cat " + cat + " test", function (done) {
                    testResultProvider.calculateTestResult(cat, mocks.adi2SevenDrivingFaultsMock).subscribe(function (result) {
                        expect(result).toBe(ActivityCodes.FAIL);
                        done();
                    });
                });
                it("should return a Fail when there are 7 driving faults and a dangerous for a Cat " + cat + " test", function (done) {
                    testResultProvider.calculateTestResult(cat, mocks.adi2SevenDrivingFaultsWithDangerousMock)
                        .subscribe(function (result) {
                        expect(result).toBe(ActivityCodes.FAIL);
                        done();
                    });
                });
                it("should return a Fail when there are 7 driving faults and a serious fault for a Cat " + cat + " test", function (done) {
                    testResultProvider.calculateTestResult(cat, mocks.adi2SevenDrivingFaultsWithSeriousMock)
                        .subscribe(function (result) {
                        expect(result).toBe(ActivityCodes.FAIL);
                        done();
                    });
                });
                it("should return a Fail when there are 6 driving faults and a dangerous for a Cat " + cat + " test", function (done) {
                    testResultProvider.calculateTestResult(cat, mocks.adi2SixDrivingFaultsWithDangerousMock)
                        .subscribe(function (result) {
                        expect(result).toBe(ActivityCodes.FAIL);
                        done();
                    });
                });
                it("should return a Fail when there are 6 driving faults and a serious fault for a Cat " + cat + " test", function (done) {
                    testResultProvider.calculateTestResult(cat, mocks.adi2SixDrivingFaultsWithSeriousMock)
                        .subscribe(function (result) {
                        expect(result).toBe(ActivityCodes.FAIL);
                        done();
                    });
                });
                it("should return a Pass when there are 6 driving faults for a Cat " + cat + " test", function (done) {
                    testResultProvider.calculateTestResult(cat, mocks.adi2SixDrivingFaultsMock).subscribe(function (result) {
                        expect(result).toBe(ActivityCodes.PASS);
                        done();
                    });
                });
                it("should return a Fail when theres is a dangerous vehicle check for a Cat " + cat + " test", function (done) {
                    testResultProvider.calculateTestResult(cat, mocks.adi2DangerousVehicleCheckFaultsMock).subscribe(function (result) {
                        expect(result).toBe(ActivityCodes.FAIL);
                        done();
                    });
                });
            });
        });
        describe("" + categories.join(', '), function () {
            categories.forEach(function (cat) {
                it("should return a Fail when there are 16 driving faults for a Cat " + cat + " test", function (done) {
                    testResultProvider.calculateTestResult(cat, mocks.sixteenDrivingFaultsMock).subscribe(function (result) {
                        expect(result).toBe(ActivityCodes.FAIL);
                        done();
                    });
                });
                it("should return a Fail when there are 16 driving faults and a dangerous for a Cat " + cat + " test", function (done) {
                    testResultProvider.calculateTestResult(cat, mocks.sixteenDrivingFaultsWithDangerousMock)
                        .subscribe(function (result) {
                        expect(result).toBe(ActivityCodes.FAIL);
                        done();
                    });
                });
                it("should return a Fail when there are 16 driving faults and a serious fault for a Cat " + cat + " test", function (done) {
                    testResultProvider.calculateTestResult(cat, mocks.sixteenDrivingFaultsWithSeriousMock)
                        .subscribe(function (result) {
                        expect(result).toBe(ActivityCodes.FAIL);
                        done();
                    });
                });
                it("should return a Fail when there are 15 driving faults and a dangerous for a Cat " + cat + " test", function (done) {
                    testResultProvider.calculateTestResult(cat, mocks.fifteenDrivingFaultsWithDangerousMock)
                        .subscribe(function (result) {
                        expect(result).toBe(ActivityCodes.FAIL);
                        done();
                    });
                });
                it("should return a Fail when there are 15 driving faults and a serious fault for a Cat " + cat + " test", function (done) {
                    testResultProvider.calculateTestResult(cat, mocks.fifteenDrivingFaultsWithSeriousMock)
                        .subscribe(function (result) {
                        expect(result).toBe(ActivityCodes.FAIL);
                        done();
                    });
                });
                it("should return a Pass when there are 15 driving faults for a Cat " + cat + " test", function (done) {
                    testResultProvider.calculateTestResult(cat, mocks.fifteenDrivingFaultsMock).subscribe(function (result) {
                        expect(result).toBe(ActivityCodes.PASS);
                        done();
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=test-result.spec.js.map