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
import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule, NavController, Platform } from 'ionic-angular';
import { NavControllerMock, PlatformMock } from 'ionic-mocks';
import { AppModule } from '../../../../app/app.module';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { Store } from '@ngrx/store';
import { MockComponent } from 'ng-mocks';
import { NonPassFinalisationCatDPage } from '../non-pass-finalisation.cat-d.page';
import { NonPassFinalisationViewDidEnter, NonPassFinalisationValidationError, } from '../../non-pass-finalisation.actions';
import { ActivityCodeComponent } from '../../../office/components/activity-code/activity-code';
import * as testActions from '../../../../modules/tests/tests.actions';
import { D255Component } from '../../../../components/test-finalisation/d255/d255';
import { LanguagePreferencesComponent } from '../../../../components/test-finalisation/language-preference/language-preferences';
import { DebriefWitnessedComponent } from '../../../../components/test-finalisation/debrief-witnessed/debrief-witnessed';
import { FinalisationHeaderComponent } from '../../../../components/test-finalisation/finalisation-header/finalisation-header';
import { D255Yes, D255No, DebriefWitnessed, DebriefUnwitnessed } from '../../../../modules/tests/test-summary/common/test-summary.actions';
import { CandidateChoseToProceedWithTestInWelsh, CandidateChoseToProceedWithTestInEnglish } from '../../../../modules/tests/communication-preferences/communication-preferences.actions';
import { GearboxCategoryChanged } from '../../../../modules/tests/vehicle-details/common/vehicle-details.actions';
import { TransmissionComponent } from '../../../../components/common/transmission/transmission';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { configureTestSuite } from 'ng-bullet';
import { AppConfigProvider } from '../../../../providers/app-config/app-config';
import { AppConfigProviderMock } from '../../../../providers/app-config/__mocks__/app-config.mock';
import { ActivityCodes } from '../../../../shared/models/activity-codes';
import { ActivityCodeDescription } from '../../../../pages/office/components/activity-code/activity-code.constants';
import { ActivityCodeFinalisationProvider, } from '../../../../providers/activity-code-finalisation/activity-code-finalisation';
describe('NonPassFinalisationCatDPage', function () {
    var fixture;
    var component;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                NonPassFinalisationCatDPage,
                MockComponent(ActivityCodeComponent),
                MockComponent(D255Component),
                MockComponent(LanguagePreferencesComponent),
                MockComponent(DebriefWitnessedComponent),
                MockComponent(FinalisationHeaderComponent),
                MockComponent(TransmissionComponent),
            ],
            imports: [
                IonicModule,
                AppModule,
            ],
            providers: [
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
                { provide: Platform, useFactory: function () { return PlatformMock.instance(); } },
                { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
                { provide: AppConfigProvider, useClass: AppConfigProviderMock },
                ActivityCodeFinalisationProvider,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(NonPassFinalisationCatDPage);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch');
    }));
    describe('Class', function () {
        describe('ionViewDidEnter', function () {
            it('should dispatch a view did enter action', function () {
                component.ionViewDidEnter();
                expect(store$.dispatch).toHaveBeenCalledWith(new NonPassFinalisationViewDidEnter());
            });
        });
        describe('d255Changed', function () {
            it('should dispatch the correct action if the inputted value is true', function () {
                component.d255Changed(true);
                expect(store$.dispatch).toHaveBeenCalledWith(new D255Yes());
                expect(store$.dispatch).toHaveBeenCalledTimes(1);
            });
            it('should dispatch the correct action if the inputted value is false', function () {
                component.d255Changed(false);
                expect(store$.dispatch).toHaveBeenCalledWith(new D255No());
                expect(store$.dispatch).toHaveBeenCalledTimes(1);
            });
        });
        describe('debriefWitnessedChanged', function () {
            it('should dispatch the correct action if the inputted value is true', function () {
                component.debriefWitnessedChanged(true);
                expect(store$.dispatch).toHaveBeenCalledWith(new DebriefWitnessed());
                expect(store$.dispatch).toHaveBeenCalledTimes(1);
            });
            it('should dispatch the correct action if the inputted value is false', function () {
                component.debriefWitnessedChanged(false);
                expect(store$.dispatch).toHaveBeenCalledWith(new DebriefUnwitnessed());
                expect(store$.dispatch).toHaveBeenCalledTimes(1);
            });
        });
        describe('isWelshChanged', function () {
            it('should dispatch the correct action if the isWelsh flag is true', function () {
                component.isWelshChanged(true);
                expect(store$.dispatch).toHaveBeenCalledWith(new CandidateChoseToProceedWithTestInWelsh('Cymraeg'));
                expect(store$.dispatch).toHaveBeenCalledTimes(1);
            });
            it('should dispatch the correct action if the isWelsh flag is false', function () {
                component.isWelshChanged(false);
                expect(store$.dispatch).toHaveBeenCalledWith(new CandidateChoseToProceedWithTestInEnglish('English'));
                expect(store$.dispatch).toHaveBeenCalledTimes(1);
            });
        });
        describe('transmissionChanged', function () {
            it('should dispatch the correct action when called', function () {
                component.transmissionChanged('Manual');
                expect(store$.dispatch).toHaveBeenCalledWith(new GearboxCategoryChanged('Manual'));
                expect(store$.dispatch).toHaveBeenCalledTimes(1);
            });
        });
        describe('continue', function () {
            // tslint:disable-next-line:max-line-length
            it('should create the TestFinalisationInvalidTestDataModal when activityCode is 5 and no S/D faults', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Arrange
                            store$.dispatch(new testActions.StartTest(123, "D" /* D */));
                            spyOn(component, 'openTestDataValidationModal').and.callThrough();
                            spyOn(component.modalController, 'create').and.callThrough();
                            component.category = 'D';
                            component.slotId = '123';
                            component.activityCode = {
                                activityCode: ActivityCodes.FAIL_CANDIDATE_STOPS_TEST,
                                description: ActivityCodeDescription.FAIL_CANDIDATE_STOPS_TEST,
                            },
                                component.testData = {
                                    dangerousFaults: {},
                                    seriousFaults: {},
                                };
                            // Act
                            return [4 /*yield*/, component.continue()];
                        case 1:
                            // Act
                            _a.sent();
                            // Assert
                            expect(component.openTestDataValidationModal).toHaveBeenCalled();
                            expect(component.modalController.create).toHaveBeenCalled();
                            return [2 /*return*/];
                    }
                });
            }); });
            // tslint:disable-next-line:max-line-length
            it('should create the TestFinalisationInvalidTestDataModal when activityCode is 4 and no S/D faults', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Arrange
                            store$.dispatch(new testActions.StartTest(123, "D" /* D */));
                            spyOn(component, 'openTestDataValidationModal').and.callThrough();
                            spyOn(component.modalController, 'create').and.callThrough();
                            component.category = 'D';
                            component.slotId = '123';
                            component.activityCode = {
                                activityCode: ActivityCodes.FAIL_PUBLIC_SAFETY,
                                description: ActivityCodeDescription.FAIL_PUBLIC_SAFETY,
                            },
                                component.testData = {
                                    dangerousFaults: {},
                                    seriousFaults: {},
                                };
                            // Act
                            return [4 /*yield*/, component.continue()];
                        case 1:
                            // Act
                            _a.sent();
                            // Assert
                            expect(component.openTestDataValidationModal).toHaveBeenCalled();
                            expect(component.modalController.create).toHaveBeenCalled();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should dispatch the appropriate ValidationError actions', fakeAsync(function () {
                component.form = new FormGroup({
                    requiredControl1: new FormControl(null, [Validators.required]),
                    requiredControl2: new FormControl(null, [Validators.required]),
                    notRequiredControl: new FormControl(null),
                });
                component.activityCode = {
                    activityCode: ActivityCodes.FAIL_CANDIDATE_STOPS_TEST,
                    description: ActivityCodeDescription.FAIL_CANDIDATE_STOPS_TEST,
                },
                    component.testData = {
                        dangerousFaults: {},
                        seriousFaults: {},
                    };
                component.continue();
                tick();
                expect(store$.dispatch)
                    .toHaveBeenCalledWith(new NonPassFinalisationValidationError('requiredControl1 is blank'));
                expect(store$.dispatch)
                    .toHaveBeenCalledWith(new NonPassFinalisationValidationError('requiredControl2 is blank'));
                expect(store$.dispatch)
                    .not
                    .toHaveBeenCalledWith(new NonPassFinalisationValidationError('notRequiredControl is blank'));
            }));
        });
    });
});
//# sourceMappingURL=non-pass-finalisation.cat-d.page.spec.js.map