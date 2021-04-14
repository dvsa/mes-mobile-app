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
import { DataStoreProvider } from '../../data-store/data-store';
import { DataStoreProviderMock } from '../../data-store/__mocks__/data-store.mock';
import { TestPersistenceProvider } from '../test-persistence';
import { StoreModule } from '@ngrx/store';
import { AppConfigProvider } from '../../app-config/app-config';
import { AppConfigProviderMock } from '../../app-config/__mocks__/app-config.mock';
import { DateTime } from '../../../shared/helpers/date-time';
import { TestStatus } from '../../../modules/tests/test-status/test-status.model';
import { configureTestSuite } from 'ng-bullet';
describe('TestPersistenceProvider', function () {
    var testPersistenceProvider;
    var dataStoreProvider;
    var testState;
    var todaysDate = new DateTime().format('YYYY-MM-DDTHH:mm:ss');
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            providers: [
                TestPersistenceProvider,
                { provide: DataStoreProvider, useClass: DataStoreProviderMock },
                { provide: AppConfigProvider, useClass: AppConfigProviderMock },
            ],
            imports: [
                StoreModule.forRoot({
                    tests: function () { return testState; },
                }),
            ],
        });
    });
    beforeEach(function () {
        testState = {
            currentTest: { slotId: '23456789' },
            startedTests: {
                12345678: {
                    rekey: false,
                    changeMarker: false,
                    examinerBooked: 1,
                    examinerConducted: 1,
                    examinerKeyed: 1,
                    version: '0.0.1',
                    category: 'B',
                    activityCode: '1',
                    journalData: {
                        examiner: {
                            staffNumber: '12345',
                        },
                        candidate: {},
                        testCentre: {
                            centreId: 12345,
                            costCode: '12345',
                        },
                        testSlotAttributes: {
                            slotId: 1,
                            welshTest: true,
                            specialNeeds: true,
                            extendedTest: true,
                            vehicleTypeCode: '12345',
                            start: '2019-01-05T18:20:58',
                        },
                        applicationReference: {
                            applicationId: 1,
                            bookingSequence: 1,
                            checkDigit: 1,
                        },
                    },
                },
                23456789: {
                    rekey: false,
                    changeMarker: false,
                    examinerBooked: 1,
                    examinerConducted: 1,
                    examinerKeyed: 1,
                    version: '0.0.1',
                    category: 'B',
                    activityCode: '1',
                    journalData: {
                        examiner: {
                            staffNumber: '12345',
                        },
                        candidate: {},
                        testCentre: {
                            centreId: 12345,
                            costCode: '12345',
                        },
                        testSlotAttributes: {
                            slotId: 1,
                            welshTest: true,
                            specialNeeds: true,
                            extendedTest: true,
                            vehicleTypeCode: '12345',
                            start: todaysDate,
                        },
                        applicationReference: {
                            applicationId: 1,
                            bookingSequence: 1,
                            checkDigit: 1,
                        },
                    },
                },
            },
            testStatus: {
                12345678: TestStatus.Booked,
                23456789: TestStatus.Booked,
            },
        };
        testPersistenceProvider = TestBed.get(TestPersistenceProvider);
        dataStoreProvider = TestBed.get(DataStoreProvider);
    });
    describe('persistTests', function () {
        it('should take the tests state slice and pass it to the data store provider stringified', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testPersistenceProvider.persistTests(testState)];
                    case 1:
                        _a.sent();
                        expect(dataStoreProvider.setItem).toHaveBeenCalledTimes(1);
                        expect(dataStoreProvider.setItem.calls.first().args[0]).toBe('TESTS');
                        expect(JSON.parse(dataStoreProvider.setItem.calls.first().args[1])).toEqual(testState);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('loadPersistedTests', function () {
        it('should return the test JSON from the data store parsed into a TestsModel', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataStoreProvider.getItem.and.returnValue(JSON.stringify(testState));
                        return [4 /*yield*/, testPersistenceProvider.loadPersistedTests()];
                    case 1:
                        result = _a.sent();
                        expect(dataStoreProvider.getItem).toHaveBeenCalledWith('TESTS');
                        expect(result).toEqual({
                            currentTest: { slotId: '23456789' },
                            startedTests: {
                                23456789: testState.startedTests[23456789],
                            },
                            testStatus: {
                                23456789: testState.testStatus[23456789],
                            },
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return null if the data store provider throws', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataStoreProvider.getItem.and.throwError('test error');
                        return [4 /*yield*/, testPersistenceProvider.loadPersistedTests()];
                    case 1:
                        result = _a.sent();
                        expect(dataStoreProvider.getItem).toHaveBeenCalledWith('TESTS');
                        expect(result).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('clearPersistedTests', function () {
        it('should remove item on the data stores test key', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testPersistenceProvider.clearPersistedTests()];
                    case 1:
                        _a.sent();
                        expect(dataStoreProvider.removeItem).toHaveBeenCalledWith('TESTS');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('clearCachedTests', function () {
        it('should return null if there is no data in the store', function () {
            expect(testPersistenceProvider.clearCachedTests(null)).toEqual(null);
        });
        it('should remove all tests that are over 14 days old', function () {
            expect(testPersistenceProvider.clearCachedTests(testState)).toEqual({
                currentTest: { slotId: '23456789' },
                startedTests: {
                    23456789: testState.startedTests[23456789],
                },
                testStatus: {
                    23456789: testState.testStatus[23456789],
                },
            });
        });
    });
    describe('getTestsToDelete', function () {
        it('should return the correct tests to delete', function () {
            var result = testPersistenceProvider.getTestsToDelete(testState);
            expect(result).toEqual(['12345678']);
        });
    });
    describe('deleteTestsFromTestObject', function () {
        it('should delete the correct tests from the started tests object', function () {
            var keysToDelete = ['12345678'];
            var result = testPersistenceProvider.deleteTestsFromTestObject(testState.startedTests, keysToDelete);
            expect(result).toEqual({ 23456789: testState.startedTests[23456789] });
        });
        it('should delete the correct tests from the test status object', function () {
            var keysToDelete = ['12345678'];
            var result = testPersistenceProvider.deleteTestsFromTestObject(testState.testStatus, keysToDelete);
            expect(result).toEqual({ 23456789: TestStatus.Booked });
        });
    });
    describe('shouldResetCurrentTest', function () {
        it('should return true if the current test is in the keys to delete', function () {
            var testsToDelete = ['1', '2', '3'];
            expect(testPersistenceProvider.shouldResetCurrentTest('2', testsToDelete)).toEqual(true);
        });
        it('should return false if the current test is not in the keys to delete', function () {
            var testsToDelete = ['1', '2', '3'];
            expect(testPersistenceProvider.shouldResetCurrentTest('4', testsToDelete)).toEqual(false);
        });
    });
});
//# sourceMappingURL=test-persistence.spec.js.map