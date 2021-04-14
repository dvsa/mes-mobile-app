var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { TestBed, async } from '@angular/core/testing';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { MSAdal } from '@ionic-native/ms-adal';
import { MSAdalMock } from '../__mocks__/ms-adal.mock';
import { AuthenticationProvider, Token } from '../authentication';
import { AppConfigProvider } from '../../app-config/app-config';
import { AppConfigProviderMock } from '../../app-config/__mocks__/app-config.mock';
import { InAppBrowserMock } from '../__mocks__/in-app-browser.mock';
import { NetworkStateProvider, ConnectionStatus } from '../../network-state/network-state';
import { NetworkStateProviderMock } from '../../network-state/__mocks__/network-state.mock';
import { TestPersistenceProvider } from '../../test-persistence/test-persistence';
import { TestPersistenceProviderMock } from '../../test-persistence/__mocks__/test-persistence.mock';
import { configureTestSuite } from 'ng-bullet';
import { DataStoreProvider } from '../../data-store/data-store';
import { DataStoreProviderMock } from '../../data-store/__mocks__/data-store.mock';
import { CompletedTestPersistenceProvider } from '../../completed-test-persistence/completed-test-persistence';
import { CompletedTestPersistenceProviderMock } from '../../completed-test-persistence/__mocks__/completed-test-persistence.mock';
describe('Authentication', function () {
    var authenticationProvider;
    var networkStateProvider;
    var appConfigProvider;
    var testPersistenceProvider;
    var dataStoreProvider;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            providers: [
                AuthenticationProvider,
                { provide: MSAdal, useClass: MSAdalMock },
                { provide: AppConfigProvider, useClass: AppConfigProviderMock },
                { provide: InAppBrowser, useClass: InAppBrowserMock },
                { provide: NetworkStateProvider, useClass: NetworkStateProviderMock },
                { provide: TestPersistenceProvider, useClass: TestPersistenceProviderMock },
                { provide: DataStoreProvider, useClass: DataStoreProviderMock },
                { provide: CompletedTestPersistenceProvider, useClass: CompletedTestPersistenceProviderMock },
            ],
        });
    });
    beforeEach(async(function () {
        networkStateProvider = TestBed.get(NetworkStateProvider);
        authenticationProvider = TestBed.get(AuthenticationProvider);
        appConfigProvider = TestBed.get(AppConfigProvider);
        testPersistenceProvider = TestBed.get(TestPersistenceProvider);
        dataStoreProvider = TestBed.get(DataStoreProvider);
        authenticationProvider.initialiseAuthentication();
    }));
    describe('Provider', function () {
        it('should compile', function () {
            expect(authenticationProvider).toBeDefined();
        });
        it('determineAuthenticationMode() should set unauthenticated mode to true if offline', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                spyOn(networkStateProvider, 'getNetworkState').and.returnValue(ConnectionStatus.OFFLINE);
                authenticationProvider.determineAuthenticationMode();
                expect(authenticationProvider.isInUnAuthenticatedMode()).toEqual(true);
                return [2 /*return*/];
            });
        }); });
        it('determineAuthenticationMode() should set unauthenticated mode to false if online', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                spyOn(networkStateProvider, 'getNetworkState').and.returnValue(ConnectionStatus.ONLINE);
                authenticationProvider.determineAuthenticationMode();
                expect(authenticationProvider.isInUnAuthenticatedMode()).toEqual(false);
                return [2 /*return*/];
            });
        }); });
        it('isAuthenticated() should return false when no login has happened', function () { return __awaiter(void 0, void 0, void 0, function () {
            var isAuthenticated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spyOn(authenticationProvider.ionicAuth, 'isAuthenticated').and.returnValue(Promise.resolve(false));
                        return [4 /*yield*/, authenticationProvider.isAuthenticated()];
                    case 1:
                        isAuthenticated = _a.sent();
                        expect(isAuthenticated).toEqual(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('getAuthenticationToken() should return a token', function () { return __awaiter(void 0, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spyOn(dataStoreProvider, 'getItem').and.returnValue(Promise.resolve('"U0lMRU5UIEFZU05DIFRFU1QgVE9LRU4"'));
                        spyOn(authenticationProvider.ionicAuth, 'isAuthenticated').and.returnValue(Promise.resolve(true));
                        spyOn(authenticationProvider.ionicAuth, 'getIdToken').and.returnValue(Promise.resolve({
                            exp: 1602686015366,
                        }));
                        return [4 /*yield*/, authenticationProvider.getAuthenticationToken()];
                    case 1:
                        token = _a.sent();
                        expect(token).toEqual('U0lMRU5UIEFZU05DIFRFU1QgVE9LRU4');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should call ionic login', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spyOn(authenticationProvider.ionicAuth, 'login').and.returnValue(Promise.resolve());
                        return [4 /*yield*/, authenticationProvider.login()];
                    case 1:
                        _a.sent();
                        expect(authenticationProvider.ionicAuth.login).toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should login without authenticating in unauthenticated mode', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spyOn(authenticationProvider, 'isInUnAuthenticatedMode').and.returnValue(true);
                        spyOn(authenticationProvider.ionicAuth, 'login').and.returnValue(Promise.resolve());
                        return [4 /*yield*/, authenticationProvider.login()];
                    case 1:
                        _a.sent();
                        expect(authenticationProvider.ionicAuth.login).toHaveBeenCalledTimes(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should login with authenticating in unauthenticated mode', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spyOn(authenticationProvider, 'isInUnAuthenticatedMode').and.returnValue(false);
                        spyOn(authenticationProvider.ionicAuth, 'login').and.returnValue(Promise.resolve());
                        return [4 /*yield*/, authenticationProvider.login()];
                    case 1:
                        _a.sent();
                        expect(authenticationProvider.ionicAuth.login).toHaveBeenCalledTimes(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should set the correct employeeId when it is an array', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spyOn(authenticationProvider.ionicAuth, 'getIdToken').and.returnValue(Promise.resolve({
                            localemployeeIdKey: ['12345678'],
                        }));
                        return [4 /*yield*/, authenticationProvider.setEmployeeId()];
                    case 1:
                        _a.sent();
                        expect(authenticationProvider.getEmployeeId()).toEqual('12345678');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should set the correct employeeId when it is a string', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spyOn(authenticationProvider.ionicAuth, 'getIdToken').and.returnValue(Promise.resolve({
                            localemployeeIdKey: '12345678',
                        }));
                        return [4 /*yield*/, authenticationProvider.setEmployeeId()];
                    case 1:
                        _a.sent();
                        expect(authenticationProvider.getEmployeeId()).toEqual('12345678');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should strip leading zeroes from the employeeId', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spyOn(authenticationProvider.ionicAuth, 'getIdToken').and.returnValue(Promise.resolve({
                            localemployeeIdKey: ['0123456'],
                        }));
                        return [4 /*yield*/, authenticationProvider.setEmployeeId()];
                    case 1:
                        _a.sent();
                        expect(authenticationProvider.getEmployeeId()).toEqual('123456');
                        return [2 /*return*/];
                }
            });
        }); });
        describe('logout', function () {
            it('should logout successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            spyOn(authenticationProvider.ionicAuth, 'logout');
                            spyOn(dataStoreProvider, 'removeItem');
                            return [4 /*yield*/, authenticationProvider.logout()];
                        case 1:
                            _a.sent();
                            expect(authenticationProvider.ionicAuth.logout).toHaveBeenCalled();
                            expect(dataStoreProvider.removeItem).toHaveBeenCalledWith(Token.ID);
                            expect(dataStoreProvider.removeItem).toHaveBeenCalledWith(Token.ACCESS);
                            expect(dataStoreProvider.removeItem).toHaveBeenCalledWith(Token.REFRESH);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should clear the persisted tests when the configuration to do so is enabled', function () { return __awaiter(void 0, void 0, void 0, function () {
                var configWithPersistenceClearing;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            configWithPersistenceClearing = __assign(__assign({}, appConfigProvider.getAppConfig()), { logoutClearsTestPersistence: true });
                            spyOn(appConfigProvider, 'getAppConfig').and.returnValue(configWithPersistenceClearing);
                            spyOn(authenticationProvider.ionicAuth, 'logout');
                            spyOn(dataStoreProvider, 'removeItem');
                            return [4 /*yield*/, authenticationProvider.logout()];
                        case 1:
                            _a.sent();
                            expect(authenticationProvider.ionicAuth.logout).toHaveBeenCalled();
                            expect(testPersistenceProvider.clearPersistedTests).toHaveBeenCalled();
                            expect(dataStoreProvider.removeItem).toHaveBeenCalledWith(Token.ID);
                            expect(dataStoreProvider.removeItem).toHaveBeenCalledWith(Token.ACCESS);
                            expect(dataStoreProvider.removeItem).toHaveBeenCalledWith(Token.REFRESH);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('loadEmployeeName', function () {
            it('should load the employee name from the token', function () { return __awaiter(void 0, void 0, void 0, function () {
                var expectedName, actualName;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            expectedName = 'A N Examiner';
                            spyOn(authenticationProvider.ionicAuth, 'getIdToken').and.returnValue(Promise.resolve({
                                localemployeenamekey: expectedName,
                            }));
                            return [4 /*yield*/, authenticationProvider.loadEmployeeName()];
                        case 1:
                            actualName = _a.sent();
                            expect(actualName).toEqual(expectedName);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('logoutEnabled', function () {
            it('should return value from config', function () { return __awaiter(void 0, void 0, void 0, function () {
                var logoutEnabled;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, authenticationProvider.logoutEnabled()];
                        case 1:
                            logoutEnabled = _a.sent();
                            expect(logoutEnabled).toEqual(true);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('expireTokens', function () {
            it('should call through to ionic auth expire() method', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            spyOn(authenticationProvider.ionicAuth, 'expire').and.returnValue(Promise.resolve());
                            return [4 /*yield*/, authenticationProvider.expireTokens()];
                        case 1:
                            _a.sent();
                            expect(authenticationProvider.ionicAuth.expire).toHaveBeenCalled();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
//# sourceMappingURL=authentication.spec.js.map