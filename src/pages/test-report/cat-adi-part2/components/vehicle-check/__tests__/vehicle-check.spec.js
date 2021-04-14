import { async, TestBed } from '@angular/core/testing';
import { VehicleCheckComponent } from '../vehicle-check';
import { IonicModule } from 'ionic-angular';
import { StoreModule, Store } from '@ngrx/store';
import { testReportReducer } from '../../../../test-report.reducer';
import { MockComponent } from 'ng-mocks';
import { CompetencyButtonComponent } from '../../../../components/competency-button/competency-button';
import { TickIndicatorComponent } from '../../../../../../components/common/tick-indicator/tick-indicator';
import { DrivingFaultsBadgeComponent, } from '../../../../../../components/common/driving-faults-badge/driving-faults-badge';
import { SeriousFaultBadgeComponent, } from '../../../../../../components/common/serious-fault-badge/serious-fault-badge';
import { DangerousFaultBadgeComponent, } from '../../../../../../components/common/dangerous-fault-badge/dangerous-fault-badge';
import { StartTest } from '../../../../../../modules/tests/tests.actions';
import { By } from '@angular/platform-browser';
import { TellMeQuestionOutcomeChanged, ShowMeQuestionAddDrivingFault, ShowMeQuestionRemoveDrivingFault, VehicleChecksAddSeriousFault, VehicleChecksAddDangerousFault, VehicleChecksRemoveSeriousFault, VehicleChecksRemoveDangerousFault, } from '../../../../../../modules/tests/test-data/cat-adi-part2/vehicle-checks/vehicle-checks.cat-adi-part2.action';
import { configureTestSuite } from 'ng-bullet';
import { CompetencyOutcome } from '../../../../../../shared/models/competency-outcome';
import { FaultCountProvider } from '../../../../../../providers/fault-count/fault-count';
describe('VehicleCheckComponent', function () {
    var fixture;
    var component;
    var store$;
    var mockTestData = {
        dangerousFaults: {},
        drivingFaults: {},
        manoeuvres: [{ reverseRight: { selected: true } }, {}],
        seriousFaults: {},
        testRequirements: {},
        ETA: {},
        eco: {},
        vehicleChecks: {
            showMeQuestion: [
                {
                    code: 'S3',
                    description: '',
                    outcome: 'P',
                },
            ],
            tellMeQuestion: [
                {
                    code: 'T4',
                    description: '',
                    outcome: 'P',
                },
            ],
        },
        eyesightTest: {},
    };
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                VehicleCheckComponent,
                MockComponent(TickIndicatorComponent),
                MockComponent(DrivingFaultsBadgeComponent),
                MockComponent(SeriousFaultBadgeComponent),
                MockComponent(DangerousFaultBadgeComponent),
                MockComponent(CompetencyButtonComponent),
            ],
            imports: [
                IonicModule,
                StoreModule.forRoot({
                    tests: function () { return ({
                        currentTest: {
                            slotId: '123',
                        },
                        testStatus: {},
                        startedTests: {
                            123: {
                                testData: mockTestData,
                                postTestDeclarations: {
                                    healthDeclarationAccepted: false,
                                    passCertificateNumberReceived: false,
                                    postTestSignature: '',
                                },
                                journalData: {},
                                category: 'ADI2',
                                communicationPreferences: {
                                    updatedEmail: '',
                                    communicationMethod: 'Not provided',
                                    conductedLanguage: 'Not provided',
                                },
                            },
                        },
                    }); },
                    testReport: testReportReducer,
                }),
            ],
            providers: [
                FaultCountProvider,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(VehicleCheckComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        store$.dispatch(new StartTest(105, "ADI2" /* ADI2 */));
    }));
    describe('Class', function () {
        describe('addFault', function () {
            it('should dispatch VEHICLE_CHECK_SERIOUS_FAULT when serious mode is on', function () {
                fixture.detectChanges();
                component.isSeriousMode = true;
                var storeDisptachSpy = spyOn(store$, 'dispatch');
                component.addFault(false);
                expect(storeDisptachSpy).toHaveBeenCalledWith(new VehicleChecksAddSeriousFault());
            });
            it('should dispatch VEHICLE_CHECK_DANGEROUS_FAULT when dangerous mode is on', function () {
                fixture.detectChanges();
                component.isDangerousMode = true;
                var storeDisptachSpy = spyOn(store$, 'dispatch');
                component.addFault(false);
                expect(storeDisptachSpy).toHaveBeenCalledWith(new VehicleChecksAddDangerousFault());
            });
            it('should dispatch SHOW_ME_QUESTION_DRIVING_FAULT when competency is pressed', function () {
                fixture.detectChanges();
                var storeDisptachSpy = spyOn(store$, 'dispatch');
                component.addFault(true);
                expect(storeDisptachSpy).toHaveBeenCalledWith(new ShowMeQuestionAddDrivingFault(0));
            });
            it('should not dispatch SHOW_ME_QUESTION_DRIVING_FAULT when competency was just tapped', function () {
                fixture.detectChanges();
                var storeDisptachSpy = spyOn(store$, 'dispatch');
                component.addFault(false);
                expect(storeDisptachSpy).not.toHaveBeenCalledWith(new ShowMeQuestionAddDrivingFault(3));
            });
        });
        describe('removeFault', function () {
            it('should dispatch a SHOW_ME_QUESTION_REMOVE_DRIVING_FAULT action on remove fault', function () {
                store$.dispatch(new ShowMeQuestionAddDrivingFault(0));
                fixture.detectChanges();
                component.isRemoveFaultMode = true;
                component.vehicleChecks.showMeQuestions = [
                    {
                        code: '123',
                        outcome: 'DF',
                    },
                ];
                component.isRemoveFaultMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.removeFault();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new ShowMeQuestionRemoveDrivingFault(-1));
            });
            it('should dispatch a VEHICLE_CHECK_REMOVE_SERIOUS_FAULT action if there is a serious fault', function () {
                store$.dispatch(new VehicleChecksAddSeriousFault());
                fixture.detectChanges();
                component.isRemoveFaultMode = true;
                component.isSeriousMode = true;
                component.vehicleChecks.seriousFault = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault(true);
                expect(storeDispatchSpy).toHaveBeenCalledWith(new VehicleChecksRemoveSeriousFault());
            });
            it('should dispatch a VEHICLE_CHECK_REMOVE_DANGEROUS_FAULT action if there is a dangerous fault', function () {
                store$.dispatch(new VehicleChecksAddDangerousFault());
                fixture.detectChanges();
                component.isRemoveFaultMode = true;
                component.isDangerousMode = true;
                component.vehicleChecks.dangerousFault = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new VehicleChecksRemoveDangerousFault());
            });
        });
        describe('hasShowMeDrivingFault', function () {
            it('should return true if a show me driving fault exists', function () {
                component.vehicleChecks = {
                    showMeQuestions: [
                        {
                            code: '123',
                            outcome: CompetencyOutcome.DF,
                        },
                    ],
                };
                var outcome = component.hasShowMeDrivingFault();
                expect(outcome).toEqual(true);
            });
            it('should return false no show me driving fault exists', function () {
                component.vehicleChecks = {
                    showMeQuestions: [
                        {
                            code: '123',
                            outcome: CompetencyOutcome.P,
                        },
                    ],
                };
                var outcome = component.hasShowMeDrivingFault();
                expect(outcome).toEqual(false);
            });
        });
        describe('hasTellMeDrivingFault', function () {
            it('should return true if a tell me driving fault exists', function () {
                component.vehicleChecks = {
                    tellMeQuestions: [
                        {
                            code: '123',
                            outcome: CompetencyOutcome.DF,
                        },
                    ],
                };
                var outcome = component.hasTellMeDrivingFault();
                expect(outcome).toEqual(true);
            });
            it('should return false no tell me driving fault exists', function () {
                component.vehicleChecks = {
                    tellMeQuestions: [
                        {
                            code: '123',
                            outcome: CompetencyOutcome.P,
                        },
                    ],
                };
                var outcome = component.hasTellMeDrivingFault();
                expect(outcome).toEqual(false);
            });
        });
    });
    describe('DOM', function () {
        it('should pass 0 driving faults to the driving faults badge component when no tell me fault', function () {
            fixture.detectChanges();
            component.tellMeQuestionFaultCount = 0;
            component.showMeQuestionFaultCount = 0;
            var drivingFaultsBadge = fixture.debugElement.query(By.css('.driving-faults'))
                .componentInstance;
            fixture.detectChanges();
            expect(drivingFaultsBadge.count).toBe(0);
        });
        it('should have a serious fault badge on if there was serious fault recorded against the vehicle checks', function () {
            store$.dispatch(new VehicleChecksAddSeriousFault());
            fixture.detectChanges();
            var seriousFaultBadge = fixture.debugElement.query(By.css('serious-fault-badge'))
                .componentInstance;
            fixture.detectChanges();
            expect(seriousFaultBadge.showBadge).toBe(true);
        });
        it('should have a serious fault badge on if tell me has driving fault but vehicle checks has serious', function () {
            store$.dispatch(new TellMeQuestionOutcomeChanged(CompetencyOutcome.DF, 0));
            store$.dispatch(new VehicleChecksAddSeriousFault());
            fixture.detectChanges();
            var drivingFaultsBadge = fixture.debugElement.query(By.css('.driving-faults'))
                .componentInstance;
            fixture.detectChanges();
            expect(drivingFaultsBadge.count).toBe(1);
            var seriousFaultBadge = fixture.debugElement.query(By.css('serious-fault-badge'))
                .componentInstance;
            fixture.detectChanges();
            expect(seriousFaultBadge.showBadge).toBe(true);
        });
        it('should have a dangerous fault badge on if there was serious fault recorded against vehicle checks', function () {
            store$.dispatch(new VehicleChecksAddDangerousFault());
            fixture.detectChanges();
            var dangerousFaultBadge = fixture.debugElement.query(By.css('dangerous-fault-badge'))
                .componentInstance;
            fixture.detectChanges();
            expect(dangerousFaultBadge.showBadge).toBe(true);
        });
        it('should have a dangerous fault badge on if tell me has driving fault but vehicle checks has dangerous', function () {
            store$.dispatch(new TellMeQuestionOutcomeChanged(CompetencyOutcome.DF, 0));
            store$.dispatch(new VehicleChecksAddDangerousFault());
            fixture.detectChanges();
            var drivingFaultsBadge = fixture.debugElement.query(By.css('.driving-faults'))
                .componentInstance;
            fixture.detectChanges();
            expect(drivingFaultsBadge.count).toBe(1);
            var dangerousFaultBadge = fixture.debugElement.query(By.css('dangerous-fault-badge'))
                .componentInstance;
            fixture.detectChanges();
            expect(dangerousFaultBadge.showBadge).toBe(true);
        });
    });
});
//# sourceMappingURL=vehicle-check.spec.js.map