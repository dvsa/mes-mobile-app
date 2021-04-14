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
import { Store, StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { configureTestSuite } from 'ng-bullet';
import { AlertController, IonicModule, NavController, Platform } from 'ionic-angular';
import { AppModule } from '../../../app/app.module';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { candidateMock } from '../../../modules/tests/__mocks__/tests.mock';
import { NavControllerMock, PlatformMock } from 'ionic-mocks';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { Subscription } from 'rxjs';
import { ConfirmTestDetailsPage } from '../confirm-test-details.page';
import { ConfirmTestDetailsViewDidEnter } from '../confirm-test-details.actions';
import { TestOutcome } from '../../../modules/tests/tests.constants';
import * as pageConstants from '../../page-names.constants';
import { SetTestStatusWriteUp } from '../../../modules/tests/test-status/test-status.actions';
import { PersistTests } from '../../../modules/tests/tests.actions';
describe('ConfirmTestDetailsPage', function () {
    var fixture;
    var component;
    var store$;
    var navController;
    var mockAlertCtrl = {
        create: function () {
            return {
                present: function () {
                },
            };
        },
    };
    var testSlotAttributes = {
        welshTest: false,
        extendedTest: false,
        slotId: 123,
        specialNeeds: false,
        start: '',
        vehicleTypeCode: '',
    };
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                ConfirmTestDetailsPage,
            ],
            imports: [
                IonicModule,
                AppModule,
                ComponentsModule,
                StoreModule.forRoot({
                    tests: function () { return ({
                        currentTest: {
                            slotId: '123',
                        },
                        testStatus: {},
                        startedTests: {
                            123: {
                                postTestDeclarations: {
                                    healthDeclarationAccepted: false,
                                    passCertificateNumberReceived: false,
                                    postTestSignature: '',
                                },
                                journalData: {
                                    testSlotAttributes: testSlotAttributes,
                                    candidate: candidateMock,
                                },
                            },
                        },
                    }); },
                }),
                TranslateModule,
            ],
            providers: [
                { provide: Platform, useFactory: function () { return PlatformMock.instance(); } },
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
                { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
                { provide: AlertController, useValue: mockAlertCtrl },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(ConfirmTestDetailsPage);
        component = fixture.componentInstance;
        navController = TestBed.get(NavController);
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch').and.callThrough();
        component.subscription = new Subscription();
    }));
    describe('ionViewDidEnter', function () {
        it('should dispatch ConfirmTestDetailsViewDidEnter and call backButtonClick', function () {
            component.ionViewDidEnter();
            expect(store$.dispatch).toHaveBeenCalledWith(new ConfirmTestDetailsViewDidEnter());
        });
    });
    describe('clickBack', function () {
        it('should should trigger the lock screen', function () {
            spyOn(navController, 'pop');
            component.clickBack();
            expect(navController.pop).toHaveBeenCalled();
        });
    });
    describe('isTerminated', function () {
        it('should return true if test outcome is terminated', function () {
            expect(component.isTerminated(TestOutcome.Terminated)).toEqual(true);
        });
        it('should return false if test outcome is not terminated', function () {
            expect(component.isTerminated(TestOutcome.Passed)).toEqual(false);
        });
    });
    describe('isPassed', function () {
        it('should return true if test outcome is Passed', function () {
            expect(component.isPassed(TestOutcome.Passed)).toEqual(true);
        });
        it('should return false if test outcome is not Passed', function () {
            expect(component.isPassed(TestOutcome.Terminated)).toEqual(false);
        });
    });
    describe('getActivityCode', function () {
        it('should return true if test outcome is Passed', function () {
            var activityCode = {
                activityCode: '1',
            };
            expect(component.getActivityCode(activityCode)).toEqual('1');
        });
    });
    describe('getProvisionalText', function () {
        it('should return appropriate string if true', function () {
            expect(component.getProvisionalText(true)).toEqual('Yes - Please retain the candidates licence');
        });
        it('should return appropriate string if false', function () {
            // tslint:disable-next-line:max-line-length
            expect(component.getProvisionalText(false)).toEqual('No - Please ensure that the licence is kept by the candidate');
        });
    });
    describe('getTransmissionText', function () {
        it('should return appropriate string if Manual', function () {
            expect(component.getTransmissionText('Manual')).toEqual('Manual');
        });
        it('should return appropriate string if Automatic', function () {
            expect(component.getTransmissionText('Automatic')).toEqual('Automatic - An automatic licence will be issued');
        });
    });
    describe('getD255Text', function () {
        it('should return appropriate string if true', function () {
            expect(component.getD255Text(true)).toEqual('Yes - Please complete a D255');
        });
        it('should return appropriate string if false', function () {
            expect(component.getD255Text(false)).toEqual('No');
        });
    });
    describe('onSubmit', function () {
        it('should call showConfirmTestDetailsModal', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spyOn(component, 'showConfirmTestDetailsModal');
                        return [4 /*yield*/, component.onSubmit()];
                    case 1:
                        _a.sent();
                        expect(component.showConfirmTestDetailsModal).toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('showConfirmTestDetailsModal', function () {
        it('should call alertController.create', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spyOn(component.alertController, 'create').and.callThrough();
                        return [4 /*yield*/, component.showConfirmTestDetailsModal()];
                    case 1:
                        _a.sent();
                        expect(component.alertController.create).toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('onTestDetailsConfirm', function () {
        it('should call device auth provider triggerLockScreen', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spyOn(pageConstants, 'getPageNameByCategoryAndKey').and.returnValue(pageConstants.CAT_B.BACK_TO_OFFICE_PAGE);
                        component.testOutcome = TestOutcome.Passed;
                        component.slotId = '123';
                        return [4 /*yield*/, component.onTestDetailsConfirm()];
                    case 1:
                        _a.sent();
                        expect(navController.push).toHaveBeenCalledWith(pageConstants.CAT_B.BACK_TO_OFFICE_PAGE);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not call dispatch for SetTestStatusWriteUp and PersistTests if test outcome is passed', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spyOn(pageConstants, 'getPageNameByCategoryAndKey').and.returnValue(pageConstants.CAT_B.BACK_TO_OFFICE_PAGE);
                        component.testOutcome = TestOutcome.Passed;
                        component.slotId = '123';
                        return [4 /*yield*/, component.onTestDetailsConfirm()];
                    case 1:
                        _a.sent();
                        expect(store$.dispatch).not.toHaveBeenCalledWith(new SetTestStatusWriteUp('123'));
                        expect(store$.dispatch).not.toHaveBeenCalledWith(new PersistTests);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should call dispatch for SetTestStatusWriteUp and PersistTests if test outcome is not passed', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spyOn(pageConstants, 'getPageNameByCategoryAndKey').and.returnValue(pageConstants.CAT_B.BACK_TO_OFFICE_PAGE);
                        component.testOutcome = TestOutcome.Terminated;
                        component.slotId = '123';
                        return [4 /*yield*/, component.onTestDetailsConfirm()];
                    case 1:
                        _a.sent();
                        expect(store$.dispatch).toHaveBeenCalledWith(new SetTestStatusWriteUp('123'));
                        expect(store$.dispatch).toHaveBeenCalledWith(new PersistTests);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('ionViewDidLeave', function () {
        it('should unsubscribe when subscription', function () {
            component.subscription = new Subscription();
            spyOn(component.subscription, 'unsubscribe');
            component.ionViewDidLeave();
            expect(component.subscription.unsubscribe).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=confirm-test-details.page.spec.js.map