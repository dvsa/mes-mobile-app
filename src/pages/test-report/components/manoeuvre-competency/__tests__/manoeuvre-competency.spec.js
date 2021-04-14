import { AppModule } from '../../../../../app/app.module';
import { ManoeuvreCompetencies, ManoeuvreTypes } from '../../../../../modules/tests/test-data/test-data.constants';
import { DrivingFaultsBadgeComponent, } from '../../../../../components/common/driving-faults-badge/driving-faults-badge';
import { DateTimeProvider } from '../../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../../providers/date-time/__mocks__/date-time.mock';
import { SeriousFaultBadgeComponent, } from '../../../../../components/common/serious-fault-badge/serious-fault-badge';
import { DangerousFaultBadgeComponent, } from '../../../../../components/common/dangerous-fault-badge/dangerous-fault-badge';
import { testReportReducer } from '../../../test-report.reducer';
import { ManoeuvreCompetencyComponent } from '../manoeuvre-competency';
import { AddManoeuvreDrivingFault, AddManoeuvreDangerousFault, AddManoeuvreSeriousFault, RemoveManoeuvreFault, } from '../../../../../modules/tests/test-data/common/manoeuvres/manoeuvres.actions';
import { By } from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';
import { MockComponent } from 'ng-mocks';
import { StoreModule, Store } from '@ngrx/store';
import { async, TestBed } from '@angular/core/testing';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
import { ToggleDangerousFaultMode, ToggleSeriousFaultMode, ToggleRemoveFaultMode, } from '../../../test-report.actions';
import { NavigationStateProvider } from '../../../../../providers/navigation-state/navigation-state';
import { NavigationStateProviderMock, } from '../../../../../providers/navigation-state/__mocks__/navigation-state.mock';
import { configureTestSuite } from 'ng-bullet';
describe('ManoeuvreCompetencyComponent', function () {
    var fixture;
    var component;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                ManoeuvreCompetencyComponent,
                MockComponent(DrivingFaultsBadgeComponent),
                MockComponent(SeriousFaultBadgeComponent),
                MockComponent(DangerousFaultBadgeComponent),
            ],
            imports: [
                AppModule,
                IonicModule,
                StoreModule.forRoot({
                    journal: function () { return ({
                        isLoading: false,
                        lastRefreshed: null,
                        slots: {},
                        selectedDate: '',
                        examiner: {
                            staffNumber: '1234567',
                        },
                    }); },
                    tests: function () { return ({
                        currentTest: {
                            slotId: '123',
                        },
                        testStatus: {},
                        startedTests: {
                            123: {
                                vehicleDetails: {},
                                accompaniment: {},
                                testData: {
                                    dangerousFaults: {},
                                    drivingFaults: {},
                                    manoeuvres: {},
                                    seriousFaults: {},
                                    testRequirements: {},
                                    ETA: {},
                                    eco: {},
                                    vehicleChecks: {
                                        showMeQuestion: {
                                            code: 'S3',
                                            description: '',
                                            outcome: '',
                                        },
                                        tellMeQuestion: {
                                            code: '',
                                            description: '',
                                            outcome: '',
                                        },
                                    },
                                    eyesightTest: {},
                                },
                                activityCode: '28',
                                journalData: {
                                    candidate: {
                                        candidateName: 'Joe Bloggs',
                                        driverNumber: '123',
                                    },
                                },
                                rekey: false,
                            },
                        },
                    }); },
                    testReport: testReportReducer,
                }),
            ],
            providers: [
                { provide: DateTimeProvider, useClass: DateTimeProviderMock },
                { provide: NavigationStateProvider, useClass: NavigationStateProviderMock },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(ManoeuvreCompetencyComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
    }));
    describe('DOM', function () {
        it('should display the correct driving fault badge with a count of 1', function () {
            component.manoeuvre = ManoeuvreTypes.reverseRight;
            component.competency = ManoeuvreCompetencies.controlFault;
            component.manoeuvreCompetencyOutcome = 'DF';
            var result = component.hasDrivingFault();
            fixture.detectChanges();
            var drivingFaultsBadge = fixture.debugElement.query(By.css('.driving-faults'))
                .componentInstance;
            expect(drivingFaultsBadge).toBeDefined();
            expect(result).toEqual(1);
        });
    });
    describe('Class', function () {
        it('should get the competency label from the correct object', function () {
            component.manoeuvre = ManoeuvreTypes.reverseRight;
            component.competency = ManoeuvreCompetencies.controlFault;
            fixture.detectChanges();
            var result = component.getLabel();
            var expected = 'Control';
            expect(result).toEqual(expected);
        });
        describe('hasDrivingFault', function () {
            it('should return 0 when not driving fault', function () {
                component.manoeuvre = ManoeuvreTypes.reverseRight;
                component.competency = ManoeuvreCompetencies.controlFault;
                component.manoeuvreCompetencyOutcome = CompetencyOutcome.S;
                fixture.detectChanges();
                var result = component.hasDrivingFault();
                expect(result).toBe(0);
            });
            it('should return 1 when has a driving fault', function () {
                component.manoeuvre = ManoeuvreTypes.reverseRight;
                component.competency = ManoeuvreCompetencies.controlFault;
                component.manoeuvreCompetencyOutcome = CompetencyOutcome.DF;
                var result = component.hasDrivingFault();
                expect(result).toBe(1);
            });
        });
        describe('hasSeriousFault', function () {
            it('should return false if it does not have a serious fault', function () {
                component.manoeuvre = ManoeuvreTypes.reverseRight;
                component.competency = ManoeuvreCompetencies.controlFault;
                component.manoeuvreCompetencyOutcome = CompetencyOutcome.DF;
                var result = component.hasSeriousFault();
                expect(result).toBe(false);
            });
            it('should return true if it has a serious fault', function () {
                component.manoeuvre = ManoeuvreTypes.reverseRight;
                component.competency = ManoeuvreCompetencies.controlFault;
                component.manoeuvreCompetencyOutcome = CompetencyOutcome.S;
                var result = component.hasSeriousFault();
                expect(result).toBe(true);
            });
        });
        describe('hasDangerousFault', function () {
            it('should return false if it does not have a dangerous fault', function () {
                component.manoeuvre = ManoeuvreTypes.reverseRight;
                component.competency = ManoeuvreCompetencies.controlFault;
                component.manoeuvreCompetencyOutcome = CompetencyOutcome.DF;
                var result = component.hasDangerousFault();
                expect(result).toBe(false);
            });
            it('should return true if it has a dangerous fault', function () {
                component.manoeuvre = ManoeuvreTypes.reverseRight;
                component.competency = ManoeuvreCompetencies.controlFault;
                component.manoeuvreCompetencyOutcome = CompetencyOutcome.D;
                var result = component.hasDangerousFault();
                expect(result).toBe(true);
            });
        });
        describe('addFault', function () {
            it('should dispatch a ADD_MANOEUVRE_DANGEROUS_FAULT action if dangerous mode is active on press', function () {
                component.manoeuvre = ManoeuvreTypes.reverseRight;
                component.competency = ManoeuvreCompetencies.controlFault;
                component.isDangerousMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new AddManoeuvreDangerousFault({
                    manoeuvre: component.manoeuvre,
                    competency: component.competency,
                }));
                expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleDangerousFaultMode());
            });
            it('should dispatch a ADD_MANOEUVRE_SERIOUS_FAULT action if serious mode is active on press', function () {
                component.manoeuvre = ManoeuvreTypes.reverseRight;
                component.competency = ManoeuvreCompetencies.controlFault;
                component.isSeriousMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new AddManoeuvreSeriousFault({
                    manoeuvre: component.manoeuvre,
                    competency: component.competency,
                }));
                expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleSeriousFaultMode());
            });
            it('should dispatch a ADD_MANOEUVRE_DRIVING_FAULT action if simple driving fault mode is active on press', function () {
                component.manoeuvre = ManoeuvreTypes.reverseRight;
                component.competency = ManoeuvreCompetencies.controlFault;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault(true);
                expect(storeDispatchSpy).toHaveBeenCalledWith(new AddManoeuvreDrivingFault({
                    manoeuvre: component.manoeuvre,
                    competency: component.competency,
                }));
            });
        });
        describe('AddManoeuvreDrivingFault', function () {
            it('should dispatch the correct action when the competency is a manoeuvre', function () {
                component.manoeuvre = ManoeuvreTypes.reverseRight;
                component.competency = ManoeuvreCompetencies.controlFault;
                fixture.detectChanges();
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault(true);
                expect(storeDispatchSpy).toHaveBeenCalledWith(new AddManoeuvreDrivingFault({
                    manoeuvre: component.manoeuvre,
                    competency: component.competency,
                }));
            });
        });
        describe('Remove faults', function () {
            describe('dispatched the actions competency outcome is undefined', function () {
                beforeEach(function () {
                    fixture.detectChanges();
                    component.manoeuvre = ManoeuvreTypes.reverseRight;
                    component.competency = ManoeuvreCompetencies.controlFault;
                    component.isRemoveFaultMode = true;
                    component.manoeuvreCompetencyOutcome = undefined;
                });
                it('should only toggle remove fault when remove fault mode is true', function () {
                    fixture.detectChanges();
                    var storeDispatchSpy = spyOn(store$, 'dispatch');
                    component.addOrRemoveFault();
                    expect(storeDispatchSpy).toHaveBeenCalledTimes(1);
                    expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleRemoveFaultMode());
                });
                it('should only toggle remove and serious fault when remove and serious fault modes are true', function () {
                    component.isSeriousMode = true;
                    fixture.detectChanges();
                    var storeDispatchSpy = spyOn(store$, 'dispatch');
                    component.addOrRemoveFault();
                    expect(storeDispatchSpy).toHaveBeenCalledTimes(2);
                    expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleRemoveFaultMode());
                    expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleSeriousFaultMode());
                });
                it('should only toggle remove and serious fault when remove and serious fault modes are true', function () {
                    component.isDangerousMode = true;
                    fixture.detectChanges();
                    var storeDispatchSpy = spyOn(store$, 'dispatch');
                    component.addOrRemoveFault();
                    expect(storeDispatchSpy).toHaveBeenCalledTimes(2);
                    expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleRemoveFaultMode());
                    expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleDangerousFaultMode());
                });
            });
            it('should remove a dangerous fault and toggle dangerous mode when dangerous mode is true', function () {
                fixture.detectChanges();
                component.manoeuvre = ManoeuvreTypes.reverseRight;
                component.competency = ManoeuvreCompetencies.controlFault;
                component.isRemoveFaultMode = true;
                component.isDangerousMode = true;
                component.manoeuvreCompetencyOutcome = CompetencyOutcome.D;
                fixture.detectChanges();
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).toHaveBeenCalledTimes(3);
                expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveManoeuvreFault({
                    competency: component.competency,
                    manoeuvre: component.manoeuvre,
                }));
                expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleRemoveFaultMode());
                expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleDangerousFaultMode());
            });
            it('should remove a serious fault and toggle serious mode when serious mode is true', function () {
                fixture.detectChanges();
                component.manoeuvre = ManoeuvreTypes.reverseRight;
                component.competency = ManoeuvreCompetencies.controlFault;
                component.isRemoveFaultMode = true;
                component.isSeriousMode = true;
                component.manoeuvreCompetencyOutcome = CompetencyOutcome.S;
                fixture.detectChanges();
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).toHaveBeenCalledTimes(3);
                expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveManoeuvreFault({
                    competency: component.competency,
                    manoeuvre: component.manoeuvre,
                }));
                expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleRemoveFaultMode());
                expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleSeriousFaultMode());
            });
            it('should remove a driving fault and toggle remove mode', function () {
                fixture.detectChanges();
                component.manoeuvre = ManoeuvreTypes.reverseRight;
                component.competency = ManoeuvreCompetencies.controlFault;
                component.isRemoveFaultMode = true;
                component.manoeuvreCompetencyOutcome = CompetencyOutcome.DF;
                fixture.detectChanges();
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).toHaveBeenCalledTimes(2);
                expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveManoeuvreFault({
                    competency: component.competency,
                    manoeuvre: component.manoeuvre,
                }));
                expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleRemoveFaultMode());
            });
        });
    });
});
//# sourceMappingURL=manoeuvre-competency.spec.js.map