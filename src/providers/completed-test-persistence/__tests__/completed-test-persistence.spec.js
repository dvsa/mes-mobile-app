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
import { configureTestSuite } from 'ng-bullet';
import { CompletedTestPersistenceProvider } from '../completed-test-persistence';
import { Store, StoreModule } from '@ngrx/store';
import { LoadCompletedTestsSuccess } from '../../../modules/journal/journal.actions';
describe('TestPersistenceProvider', function () {
    var completedTestPersistenceProvider;
    var dataStoreProvider;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            providers: [
                CompletedTestPersistenceProvider,
                { provide: DataStoreProvider, useClass: DataStoreProviderMock },
            ],
            imports: [
                StoreModule.forRoot({
                    journal: function () { return null; },
                }),
            ],
        });
    });
    var completedTests = [
        { applicationReference: 1234 },
        { applicationReference: 567 },
    ];
    beforeEach(function () {
        dataStoreProvider = TestBed.get(DataStoreProvider);
        completedTestPersistenceProvider = TestBed.get(CompletedTestPersistenceProvider);
        store$ = TestBed.get(Store);
    });
    describe('persistCompletedTests', function () {
        it('should stringify and persist completed tests', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, completedTestPersistenceProvider.persistCompletedTests(completedTests)];
                    case 1:
                        _a.sent();
                        expect(dataStoreProvider.setItem).toHaveBeenCalledTimes(1);
                        expect(dataStoreProvider.setItem.calls.first().args[0]).toBe('COMPLETED_TESTS');
                        expect(JSON.parse(dataStoreProvider.setItem.calls.first().args[1])).toEqual(completedTests);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('loadCompletedPersistedTests', function () {
        it('should get tests from storage and dispatch action', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spyOn(dataStoreProvider, 'getItem').and.returnValue(Promise.resolve(JSON.stringify(completedTests)));
                        spyOn(store$, 'dispatch');
                        return [4 /*yield*/, completedTestPersistenceProvider.loadCompletedPersistedTests()];
                    case 1:
                        _a.sent();
                        expect(store$.dispatch).toHaveBeenCalledTimes(1);
                        expect(store$.dispatch).toHaveBeenCalledWith(new LoadCompletedTestsSuccess(completedTests));
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('clearPersistedCompletedTests', function () {
        it('should clear persisted tests', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spyOn(dataStoreProvider, 'getKeys').and.returnValue(Promise.resolve(['COMPLETED_TESTS']));
                        return [4 /*yield*/, completedTestPersistenceProvider.clearPersistedCompletedTests()];
                    case 1:
                        _a.sent();
                        expect(dataStoreProvider.removeItem).toHaveBeenCalledWith('COMPLETED_TESTS');
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=completed-test-persistence.spec.js.map