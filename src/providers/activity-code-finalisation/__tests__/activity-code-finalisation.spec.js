var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';
import { ActivityCodes } from '../../../shared/models/activity-codes';
import { FaultCountProvider } from '../../fault-count/fault-count';
import { TestResultProvider } from '../../test-result/test-result';
import { ActivityCodeFinalisationProvider } from '../activity-code-finalisation';
describe('Activity code finalisation Provider', function () {
    var testResultProvider;
    var activityCodeFinalisationProvider;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            providers: [
                TestResultProvider,
                FaultCountProvider,
                ActivityCodeFinalisationProvider,
            ],
        });
    });
    beforeEach(function () {
        testResultProvider = TestBed.get(TestResultProvider);
        activityCodeFinalisationProvider = TestBed.get(ActivityCodeFinalisationProvider);
        spyOn(testResultProvider, 'calculateTestResult');
    });
    describe('Check if test data for different categories are invalid', function () {
        it('should call testResultProvider with the correct category for B', function () {
            activityCodeFinalisationProvider.catBTestDataIsInvalid(ActivityCodes.FAIL_PUBLIC_SAFETY, {});
            expect(testResultProvider.calculateTestResult).toHaveBeenCalledWith("B" /* B */, {});
        });
        it('should call testResultProvider with the correct category for C', function () {
            activityCodeFinalisationProvider.catCTestDataIsInvalid(ActivityCodes.FAIL_CANDIDATE_STOPS_TEST, {}, "C" /* C */);
            expect(testResultProvider.calculateTestResult).toHaveBeenCalledWith("C" /* C */, {});
        });
        it('should call testResultProvider with the correct category for AM1', function () {
            activityCodeFinalisationProvider.catAMod1TestDataIsInvalid(ActivityCodes.FAIL_PUBLIC_SAFETY, {});
            expect(testResultProvider.calculateTestResult).toHaveBeenCalledWith("EUAM1" /* EUAM1 */, {});
        });
        it('should call testResultProvider with the correct category for AM2', function () {
            activityCodeFinalisationProvider.catAMod2TestDataIsInvalid(ActivityCodes.FAIL_PUBLIC_SAFETY, {});
            expect(testResultProvider.calculateTestResult).toHaveBeenCalledWith("EUAM2" /* EUAM2 */, {});
        });
        it('should call testResultProvider with the correct category for ADI2', function () {
            activityCodeFinalisationProvider.catADIPart2TestDataIsInvalid(ActivityCodes.FAIL_CANDIDATE_STOPS_TEST, {});
            expect(testResultProvider.calculateTestResult).toHaveBeenCalledWith("ADI2" /* ADI2 */, {});
        });
        it('should call testResultProvider with the correct category for BE', function () {
            activityCodeFinalisationProvider.catBETestDataIsInvalid(ActivityCodes.FAIL_PUBLIC_SAFETY, {});
            expect(testResultProvider.calculateTestResult).toHaveBeenCalledWith("B+E" /* BE */, {});
        });
        it('should call testResultProvider with the correct category for Home', function () {
            activityCodeFinalisationProvider.catHomeTestDataIsInvalid(ActivityCodes.FAIL_PUBLIC_SAFETY, {}, "F" /* F */);
            expect(testResultProvider.calculateTestResult).toHaveBeenCalledWith("F" /* F */, {});
        });
    });
    it('should return false when activity code is not 4/5 for Home', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, activityCodeFinalisationProvider.catHomeTestDataIsInvalid(ActivityCodes.BAD_LIGHT, {}, "F" /* F */)];
                case 1:
                    result = _a.sent();
                    expect(result).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return false when activity code is not 4/5 for B', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, activityCodeFinalisationProvider.catBTestDataIsInvalid(ActivityCodes.ACCIDENT, {})];
                case 1:
                    result = _a.sent();
                    expect(result).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return false when activity code is not 4/5 for BE', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, activityCodeFinalisationProvider.catBETestDataIsInvalid(ActivityCodes.CANDIDATE_LATE, {})];
                case 1:
                    result = _a.sent();
                    expect(result).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return false when activity code is not 4/5 for C', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, activityCodeFinalisationProvider.catCTestDataIsInvalid(ActivityCodes.EXAMINER_ILL_PRE_TEST, {}, "C" /* C */)];
                case 1:
                    result = _a.sent();
                    expect(result).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return false when activity code is not 4/5 for D', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, activityCodeFinalisationProvider.catDTestDataIsInvalid(ActivityCodes.CANDIDATE_PREGNANT, {}, "D" /* D */)];
                case 1:
                    result = _a.sent();
                    expect(result).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return false when activity code is not 4/5 for AMod1', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, activityCodeFinalisationProvider.catAMod1TestDataIsInvalid(ActivityCodes.CANDIDATE_REFUSED_TO_SIGN_RESIDENCY_DECLARATION, {})];
                case 1:
                    result = _a.sent();
                    expect(result).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return false when activity code is not 4/5 for AMod2', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, activityCodeFinalisationProvider.catAMod2TestDataIsInvalid(ActivityCodes.ILLEGAL_ACTIVITY_FROM_CANDIDATE, {})];
                case 1:
                    result = _a.sent();
                    expect(result).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return false when activity code is not 4/5 for ADI2', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, activityCodeFinalisationProvider.catADIPart2TestDataIsInvalid(ActivityCodes.BAD_LIGHT, {})];
                case 1:
                    result = _a.sent();
                    expect(result).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=activity-code-finalisation.spec.js.map