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
import { CPCEndTestModal } from '../cpc-end-test-modal';
import { IonicModule, NavParams, ViewController } from 'ionic-angular';
import { NavParamsMock, ViewControllerMock } from 'ionic-mocks';
import { AppModule } from '../../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { configureTestSuite } from 'ng-bullet';
import { ModalResultItemComponent } from '../components/modal-result-item/modal-result-item';
import { ModalEvent } from '../../../../test-report.constants';
import { ActivityCodes } from '../../../../../../shared/models/activity-codes';
import { TestOutcome } from '../../../../../../modules/tests/tests.constants';
describe('CPCEndTestModal', function () {
    var fixture;
    var component;
    var viewController;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                CPCEndTestModal,
                ModalResultItemComponent,
            ],
            imports: [
                AppModule,
                IonicModule,
            ],
            providers: [
                { provide: NavParams, useFactory: function () { return NavParamsMock.instance(); } },
                { provide: ViewController, useFactory: function () { return ViewControllerMock.instance(); } },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(CPCEndTestModal);
        component = fixture.componentInstance;
        viewController = TestBed.get(ViewController);
    }));
    describe('DOM', function () {
        it('should call onContinue when the Continue to debrief button is clicked', function () {
            fixture.detectChanges();
            spyOn(component, 'onContinue');
            var button = fixture.debugElement.query(By.css('button.mes-primary-button'));
            button.triggerEventHandler('click', null);
            fixture.detectChanges();
            expect(component.onContinue).toHaveBeenCalled();
        });
        it('should call onCancel when the Return to test button is clicked', function () {
            fixture.detectChanges();
            spyOn(component, 'onCancel');
            var button = fixture.debugElement.query(By.css('button.return-button'));
            button.triggerEventHandler('click', null);
            fixture.detectChanges();
            expect(component.onCancel).toHaveBeenCalled();
        });
        it('should call onTerminate when the Terminate test button is clicked', function () {
            fixture.detectChanges();
            spyOn(component, 'onTerminate');
            var button = fixture.debugElement.query(By.css('button.terminate-button'));
            button.triggerEventHandler('click', null);
            fixture.detectChanges();
            expect(component.onTerminate).toHaveBeenCalled();
        });
    });
    describe('Class', function () {
        describe('onCancel', function () {
            it('should dismiss the view controller with cancel event', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, component.onCancel()];
                        case 1:
                            _a.sent();
                            expect(viewController.dismiss).toHaveBeenCalledWith(ModalEvent.CANCEL);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('onContinue', function () {
            it('should dismiss the view controller with continue event', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, component.onContinue()];
                        case 1:
                            _a.sent();
                            expect(viewController.dismiss).toHaveBeenCalledWith(ModalEvent.CONTINUE);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('onTerminate', function () {
            it('should dismiss the view controller with terminate event', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, component.onTerminate()];
                        case 1:
                            _a.sent();
                            expect(viewController.dismiss).toHaveBeenCalledWith(ModalEvent.TERMINATE);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('getTestResultLabel', function () {
            var label;
            it('should return the correct label for a pass', function () {
                component.testResult = ActivityCodes.PASS;
                label = component.getTestResultLabel();
                expect(label).toEqual(TestOutcome.Passed);
            });
            it('should return the correct label for a fail', function () {
                component.testResult = ActivityCodes.FAIL;
                label = component.getTestResultLabel();
                expect(label).toEqual(TestOutcome.Failed);
            });
        });
        describe('getTestResultClass', function () {
            var cssClass;
            it('should return the correct class for a pass', function () {
                component.testResult = ActivityCodes.PASS;
                cssClass = component.getTestResultClass();
                expect(cssClass).toEqual('test-result-pass-label');
            });
            it('should return the correct class for a fail', function () {
                component.testResult = ActivityCodes.FAIL;
                cssClass = component.getTestResultClass();
                expect(cssClass).toEqual('test-result-fail-label');
            });
        });
    });
});
//# sourceMappingURL=cpc-end-test-modal.spec.js.map