var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
import { Injectable } from '@angular/core';
import { AppConfigProvider } from '../app-config/app-config';
import { NetworkStateProvider, ConnectionStatus } from '../network-state/network-state';
import { TestPersistenceProvider } from '../test-persistence/test-persistence';
import { IonicAuth } from '@ionic-enterprise/auth';
import { DataStoreProvider } from '../data-store/data-store';
import { CompletedTestPersistenceProvider } from '../completed-test-persistence/completed-test-persistence';
export var Token;
(function (Token) {
    Token["ID"] = "idToken";
    Token["ACCESS"] = "accessToken";
    Token["REFRESH"] = "refreshToken";
})(Token || (Token = {}));
var AuthenticationProvider = /** @class */ (function () {
    function AuthenticationProvider(dataStoreProvider, networkState, appConfig, testPersistenceProvider, completedTestPersistenceProvider) {
        var _this = this;
        this.dataStoreProvider = dataStoreProvider;
        this.networkState = networkState;
        this.appConfig = appConfig;
        this.testPersistenceProvider = testPersistenceProvider;
        this.completedTestPersistenceProvider = completedTestPersistenceProvider;
        this.getAuthOptions = function () {
            var authSettings = _this.appConfig.getAppConfig().authentication;
            return {
                logLevel: 'DEBUG',
                authConfig: 'azure',
                platform: 'cordova',
                clientID: authSettings.clientId,
                discoveryUrl: authSettings.context + "/v2.0/.well-known/openid-configuration?appid=" + authSettings.clientId,
                redirectUri: authSettings.redirectUrl,
                scope: 'openid offline_access profile email',
                logoutUrl: authSettings.logoutUrl,
                iosWebView: 'shared',
                tokenStorageProvider: {
                    getAccessToken: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.getToken(Token.ACCESS)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); },
                    setAccessToken: function (token) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.setToken(Token.ACCESS, token)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); },
                    getIdToken: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.getToken(Token.ID)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); },
                    setIdToken: function (token) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.setToken(Token.ID, token)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); },
                    getRefreshToken: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.getToken(Token.REFRESH)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); },
                    setRefreshToken: function (token) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.setToken(Token.REFRESH, token)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); },
                },
            };
        };
        this.initialiseAuthentication = function () {
            _this.authenticationSettings = _this.appConfig.getAppConfig().authentication;
            _this.employeeIdKey = _this.appConfig.getAppConfig().authentication.employeeIdKey;
            _this.inUnAuthenticatedMode = false;
            _this.ionicAuth = new IonicAuth(_this.getAuthOptions());
        };
        this.isInUnAuthenticatedMode = function () {
            return _this.inUnAuthenticatedMode;
        };
        this.setUnAuthenticatedMode = function (mode) {
            _this.inUnAuthenticatedMode = mode;
        };
        this.determineAuthenticationMode = function () {
            var mode = _this.networkState.getNetworkState() === ConnectionStatus.OFFLINE;
            _this.setUnAuthenticatedMode(mode);
        };
        this.getAuthenticationToken = function () { return __awaiter(_this, void 0, void 0, function () {
            var hasValidToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.hasValidToken()];
                    case 1:
                        hasValidToken = _a.sent();
                        if (!!hasValidToken) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.expireTokens()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.isAuthenticated()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, this.getToken(Token.ID)];
                }
            });
        }); };
        this.getEmployeeId = function () {
            return _this.employeeId || null;
        };
        this.loadEmployeeName = function () { return __awaiter(_this, void 0, void 0, function () {
            var idToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ionicAuth.getIdToken()];
                    case 1:
                        idToken = _a.sent();
                        if (idToken) {
                            return [2 /*return*/, idToken[this.appConfig.getAppConfig().authentication.employeeNameKey]];
                        }
                        return [2 /*return*/, ''];
                }
            });
        }); };
        this.logoutEnabled = function () {
            return _this.appConfig.getAppConfig().journal.enableLogoutButton;
        };
    }
    AuthenticationProvider.prototype.expireTokens = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ionicAuth.expire()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthenticationProvider.prototype.getToken = function (tokenName) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, this.dataStoreProvider.getItem(tokenName)];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                    case 2:
                        error_1 = _c.sent();
                        return [2 /*return*/, Promise.resolve(null)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthenticationProvider.prototype.setToken = function (tokenName, token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dataStoreProvider.setItem(tokenName, JSON.stringify(token))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, Promise.resolve()];
                }
            });
        });
    };
    AuthenticationProvider.prototype.clearTokens = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dataStoreProvider.removeItem(Token.ACCESS)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.dataStoreProvider.removeItem(Token.ID)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.dataStoreProvider.removeItem(Token.REFRESH)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthenticationProvider.prototype.isAuthenticated = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isInUnAuthenticatedMode()) {
                            return [2 /*return*/, Promise.resolve(true)];
                        }
                        return [4 /*yield*/, this.ionicAuth.isAuthenticated()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthenticationProvider.prototype.hasValidToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // refresh token if required
                    return [4 /*yield*/, this.ionicAuth.isAuthenticated()];
                    case 1:
                        // refresh token if required
                        _a.sent();
                        return [4 /*yield*/, this.refreshTokenIfExpired()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.ionicAuth.getIdToken()];
                    case 3:
                        token = _a.sent();
                        return [2 /*return*/, token.exp && new Date(token.exp * 1000) > new Date()];
                }
            });
        });
    };
    AuthenticationProvider.prototype.refreshTokenIfExpired = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ionicAuth.getIdToken()];
                    case 1:
                        token = _a.sent();
                        if (!this.isTokenExpired(token)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.ionicAuth.refreshSession()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthenticationProvider.prototype.isTokenExpired = function (token) {
        return token.exp && new Date(token.exp * 1000) < new Date();
    };
    AuthenticationProvider.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isInUnAuthenticatedMode()) {
                            return [2 /*return*/, Promise.resolve()];
                        }
                        return [4 /*yield*/, this.ionicAuth.login()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthenticationProvider.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.appConfig.getAppConfig().logoutClearsTestPersistence) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.testPersistenceProvider.clearPersistedTests()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.completedTestPersistenceProvider.clearPersistedCompletedTests()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.clearTokens()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.ionicAuth.logout()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthenticationProvider.prototype.setEmployeeId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var idToken, employeeId, employeeIdClaim, numericEmployeeId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ionicAuth.getIdToken()];
                    case 1:
                        idToken = _a.sent();
                        employeeId = idToken[this.employeeIdKey];
                        employeeIdClaim = Array.isArray(employeeId) ? employeeId[0] : employeeId;
                        numericEmployeeId = Number.parseInt(employeeIdClaim, 10);
                        this.employeeId = numericEmployeeId.toString();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthenticationProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [DataStoreProvider,
            NetworkStateProvider,
            AppConfigProvider,
            TestPersistenceProvider,
            CompletedTestPersistenceProvider])
    ], AuthenticationProvider);
    return AuthenticationProvider;
}());
export { AuthenticationProvider };
//# sourceMappingURL=authentication.js.map