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
import { DeviceProvider } from '../device';
import { AppConfigProvider } from '../../app-config/app-config';
import { AppConfigProviderMock } from '../../app-config/__mocks__/app-config.mock';
import { Device } from '@ionic-native/device';
import { DeviceMock } from '@ionic-native-mocks/device';
import { LogHelperMock } from '../../logs/__mocks__/logsHelper.mock';
import { StoreModule, Store } from '@ngrx/store';
import { LogHelper } from '../../logs/logsHelper';
import { SaveLog } from '../../../modules/logs/logs.actions';
import { LogType } from '../../../shared/models/log.model';
import { configureTestSuite } from 'ng-bullet';
describe('Device Provider', function () {
    var deviceProvider;
    var store$;
    var logHelper;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    appInfo: function () { return ({
                        versionNumber: '5',
                    }); },
                }),
            ],
            providers: [
                DeviceProvider,
                { provide: AppConfigProvider, useClass: AppConfigProviderMock },
                { provide: Device, useClass: DeviceMock },
                Store,
                { provide: LogHelper, useClass: LogHelperMock },
            ],
        });
    });
    beforeEach(function () {
        store$ = TestBed.get(Store);
        deviceProvider = TestBed.get(DeviceProvider);
        logHelper = TestBed.get(LogHelper);
    });
    describe('getDeviceType', function () {
        it('should return the device type', function () {
            spyOn(deviceProvider, 'getDeviceType').and.returnValue('iPad7,4');
            var deviceType = deviceProvider.getDeviceType();
            expect(deviceType).toBe('iPad7,4');
        });
    });
    describe('validDeviceType', function () {
        it('should return true if the device in supported devices list', function () {
            spyOn(deviceProvider, 'getDeviceType').and.returnValue('iPad7,4');
            var deviceValid = deviceProvider.validDeviceType();
            expect(deviceValid).toEqual(true);
        });
    });
    describe('validDeviceType', function () {
        it('should return false if the device is not in supported devices list', function () {
            spyOn(deviceProvider, 'getDeviceType').and.returnValue('nonIpad7,4');
            var deviceValid = deviceProvider.validDeviceType();
            expect(deviceValid).toEqual(false);
        });
    });
    describe('getUniqueDeviceId', function () {
        it('should return the unique device id', function () {
            spyOn(deviceProvider, 'getUniqueDeviceId').and.returnValue('A1234');
            var deviceId = deviceProvider.getUniqueDeviceId();
            expect(deviceId).toBe('A1234');
        });
    });
    describe('singleAppMode', function () {
        it('should return true when enabling single app mode', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, deviceProvider.enableSingleAppMode()];
                    case 1:
                        result = _a.sent();
                        expect(result).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should retry uptil the specified limit if calling setSingleAppMode(true) fails', function () { return __awaiter(void 0, void 0, void 0, function () {
            var asamFailureLog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Simulate the ASAM toggle failing
                        spyOn(deviceProvider, 'setSingleAppMode').and.returnValue(Promise.resolve(false));
                        spyOn(store$, 'dispatch').and.callThrough();
                        asamFailureLog = new SaveLog(logHelper.createLog(LogType.ERROR, null, this.enableASAMRetryFailureMessage));
                        return [4 /*yield*/, deviceProvider.enableSingleAppMode()];
                    case 1:
                        _a.sent();
                        expect(deviceProvider.setSingleAppMode).toHaveBeenCalledTimes(4);
                        expect(store$.dispatch).toHaveBeenCalledWith(asamFailureLog);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return true when disabling single app mode', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, deviceProvider.disableSingleAppMode()];
                    case 1:
                        result = _a.sent();
                        expect(result).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should detect examiner role as DLG and resolve with false', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spyOn(deviceProvider.appConfig, 'getAppConfig').and.returnValue({ role: 'DLG' });
                        return [4 /*yield*/, deviceProvider.enableSingleAppMode()];
                    case 1:
                        result = _a.sent();
                        expect(result).toBe(false);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=device.spec.js.map