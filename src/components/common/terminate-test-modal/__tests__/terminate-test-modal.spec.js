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
import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';
import { AppModule } from '../../../../app/app.module';
import { TerminateTestModal } from '../terminate-test-modal';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../providers/date-time/__mocks__/date-time.mock';
import { By } from '@angular/platform-browser';
import { DeviceAuthenticationProvider } from '../../../../providers/device-authentication/device-authentication';
// tslint:disable-next-line:max-line-length
import { DeviceAuthenticationProviderMock } from '../../../../providers/device-authentication/__mocks__/device-authentication.mock';
import { configureTestSuite } from 'ng-bullet';
describe('TerminateTestModal', function () {
    var fixture;
    var component;
    var deviceAuthenticationProvider;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [TerminateTestModal],
            imports: [IonicModule, AppModule],
            providers: [
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
                { provide: NavParams, useFactory: function () { return NavParamsMock.instance(); } },
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
                { provide: Platform, useFactory: function () { return PlatformMock.instance(); } },
                { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
                { provide: DateTimeProvider, useClass: DateTimeProviderMock },
                { provide: DeviceAuthenticationProvider, useClass: DeviceAuthenticationProviderMock },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(TerminateTestModal);
        component = fixture.componentInstance;
        deviceAuthenticationProvider = TestBed.get(DeviceAuthenticationProvider);
        component.onTerminate = jasmine.createSpy('onTerminate');
        component.onCancel = jasmine.createSpy('onCancel');
    }));
    describe('DOM', function () {
        it('should call the provided onCancel function when returning to the test', function () {
            var returnButton = fixture.debugElement.query(By.css('.return-button'));
            returnButton.triggerEventHandler('click', null);
            expect(component.onCancel).toHaveBeenCalled();
        });
        it('should call the provided onTerminate function when confirming test termination', function () {
            spyOn(component, 'terminationWrapper');
            var terminateButton = fixture.debugElement.query(By.css('.terminate-button'));
            terminateButton.triggerEventHandler('click', null);
            expect(component.terminationWrapper).toHaveBeenCalled();
        });
    });
    describe('Class', function () {
        describe('terminationWrapper', function () {
            it('should trigger the lock screen', function () {
                component.shouldAuthenticate = true;
                component.terminationWrapper();
                expect(deviceAuthenticationProvider.triggerLockScreen).toHaveBeenCalled();
            });
            it('should not call the onTerminate callback when the lock screen Promise rejects', function () { return __awaiter(void 0, void 0, void 0, function () {
                var lockScreenRejectionSpy;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            component.shouldAuthenticate = true;
                            lockScreenRejectionSpy = jasmine.createSpy('triggerLockScreen').and.returnValue(Promise.reject('n'));
                            deviceAuthenticationProvider.triggerLockScreen = lockScreenRejectionSpy;
                            return [4 /*yield*/, component.terminationWrapper()];
                        case 1:
                            _a.sent();
                            expect(component.onTerminate).not.toHaveBeenCalled();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should call the onTerminate callback when the lock screen Promise resolves', function () { return __awaiter(void 0, void 0, void 0, function () {
                var lockScreenRejectionSpy;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            component.shouldAuthenticate = true;
                            lockScreenRejectionSpy = jasmine.createSpy('triggerLockScreen').and.returnValue(Promise.resolve('y'));
                            deviceAuthenticationProvider.triggerLockScreen = lockScreenRejectionSpy;
                            return [4 /*yield*/, component.terminationWrapper()];
                        case 1:
                            _a.sent();
                            expect(component.onTerminate).toHaveBeenCalled();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should not trigger the lock screen if shouldAuthenticate equals false', function () { return __awaiter(void 0, void 0, void 0, function () {
                var lockScreenRejectionSpy, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            component.shouldAuthenticate = false;
                            lockScreenRejectionSpy = jasmine.createSpy('triggerLockScreen');
                            deviceAuthenticationProvider.triggerLockScreen = lockScreenRejectionSpy;
                            return [4 /*yield*/, component.terminationWrapper()];
                        case 1:
                            result = _a.sent();
                            expect(result).toEqual(undefined);
                            expect(deviceAuthenticationProvider.triggerLockScreen).not.toHaveBeenCalled();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
//# sourceMappingURL=terminate-test-modal.spec.js.map