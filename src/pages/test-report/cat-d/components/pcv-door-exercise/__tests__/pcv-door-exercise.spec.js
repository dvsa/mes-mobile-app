import { async, TestBed } from '@angular/core/testing';
import { AppModule } from '../../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { StoreModule, Store } from '@ngrx/store';
import { MockComponent } from 'ng-mocks';
import { DrivingFaultsBadgeComponent, } from '../../../../../../components/common/driving-faults-badge/driving-faults-badge';
import { DateTimeProvider } from '../../../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../../../providers/date-time/__mocks__/date-time.mock';
import { SeriousFaultBadgeComponent } from '../../../../../../components/common/serious-fault-badge/serious-fault-badge';
import { IonicModule } from 'ionic-angular';
import { DangerousFaultBadgeComponent, } from '../../../../../../components/common/dangerous-fault-badge/dangerous-fault-badge';
import { testReportReducer } from '../../../../test-report.reducer';
import { ToggleSeriousFaultMode, ToggleDangerousFaultMode, ToggleRemoveFaultMode } from '../../../../test-report.actions';
import { NavigationStateProvider } from '../../../../../../providers/navigation-state/navigation-state';
import { NavigationStateProviderMock } from '../../../../../../providers/navigation-state/__mocks__/navigation-state.mock';
import { configureTestSuite } from 'ng-bullet';
import { PcvDoorExerciseComponent } from '../pcv-door-exercise';
import { PcvDoorExerciseAddDrivingFault, PcvDoorExerciseAddDangerousFault, PcvDoorExerciseAddSeriousFault, PcvDoorExerciseRemoveDrivingFault, PcvDoorExerciseRemoveDangerousFault, PcvDoorExerciseRemoveSeriousFault, } from '../../../../../../modules/tests/test-data/cat-d/pcv-door-exercise/pcv-door-exercise.actions';
import { CompetencyButtonComponent } from '../../../../components/competency-button/competency-button';
describe('PcvDoorExerciseComponent', function () {
    var fixture;
    var component;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                PcvDoorExerciseComponent,
                MockComponent(CompetencyButtonComponent),
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
        fixture = TestBed.createComponent(PcvDoorExerciseComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
    }));
    describe('Class', function () {
        describe('addDrivingFault', function () {
            it('should dispatch a THROTTLE_ADD_DRIVING_FAULT action for press', function () {
                component.pcvDoorExercise = { drivingFault: false };
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault(true);
                expect(storeDispatchSpy).toHaveBeenCalledWith(new PcvDoorExerciseAddDrivingFault());
            });
            it('should not dispatch an ADD_DRIVING_FAULT action if there is a serious fault', function () {
                component.pcvDoorExercise = { seriousFault: true };
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new PcvDoorExerciseAddDrivingFault());
            });
            it('should not dispatch an ADD_DRIVING_FAULT action if serious mode is active', function () {
                component.isSeriousMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new PcvDoorExerciseAddDrivingFault());
            });
            it('should not dispatch an ADD_DRIVING_FAULT action if there is a dangerous fault', function () {
                component.pcvDoorExercise = { dangerousFault: true };
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new PcvDoorExerciseAddDrivingFault());
            });
            it('should not dispatch an ADD_DRIVING_FAULT action if dangerous mode is active', function () {
                component.isDangerousMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new PcvDoorExerciseAddDrivingFault());
            });
        });
        describe('addDangerousFault', function () {
            it('should dispatch a ADD_DANGEROUS_FAULT action if dangerous mode is active on press', function () {
                component.isDangerousMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new PcvDoorExerciseAddDangerousFault());
                expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleDangerousFaultMode());
            });
            it('should not dispatch a ADD_DANGEROUS_FAULT action if there is a dangerous fault', function () {
                component.pcvDoorExercise = { dangerousFault: true };
                component.isDangerousMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new PcvDoorExerciseAddDangerousFault());
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleDangerousFaultMode());
            });
        });
        describe('addSeriousFault', function () {
            it('should dispatch an ADD_SERIOUS_FAULT action if serious mode is active', function () {
                component.isSeriousMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new PcvDoorExerciseAddSeriousFault());
                expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleSeriousFaultMode());
            });
            it('should not dispatch a ADD_SERIOUS_FAULT action if there is a serious fault', function () {
                component.pcvDoorExercise = { seriousFault: true };
                component.isSeriousMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new PcvDoorExerciseAddSeriousFault());
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleSeriousFaultMode());
            });
            it('should not dispatch a ADD_SERIOUS_FAULT action if dangerous mode is active', function () {
                component.isDangerousMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new PcvDoorExerciseAddSeriousFault());
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleSeriousFaultMode());
            });
            it('should not dispatch a ADD_SERIOUS_FAULT action if there is a dangerous fault', function () {
                component.pcvDoorExercise = { dangerousFault: true };
                component.isSeriousMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new PcvDoorExerciseAddSeriousFault());
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleSeriousFaultMode());
            });
        });
        describe('removeDrivingFault', function () {
            it('should dispatch a REMOVE_DRIVING_FAULT', function () {
                component.pcvDoorExercise = { drivingFault: true };
                component.isRemoveFaultMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new PcvDoorExerciseRemoveDrivingFault());
            });
            it('should not dispatch a REMOVE_DRIVING_FAULT when no driving fault', function () {
                component.pcvDoorExercise = { dangerousFault: false };
                component.isRemoveFaultMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new PcvDoorExerciseRemoveDrivingFault());
            });
            it('should NOT remove driving fault when serious mode is active', function () {
                component.pcvDoorExercise = { drivingFault: true };
                component.isSeriousMode = true;
                component.isRemoveFaultMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new PcvDoorExerciseRemoveDrivingFault());
            });
            it('should NOT remove driving fault when dangerous mode is active', function () {
                component.pcvDoorExercise = { drivingFault: true };
                component.isDangerousMode = true;
                component.isRemoveFaultMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new PcvDoorExerciseRemoveDrivingFault());
            });
        });
        describe('removeSeriousFault', function () {
            it('should not dispatch a REMOVE_SERIOUS_FAULT when not in remove mode', function () {
                component.pcvDoorExercise = { seriousFault: true };
                component.isSeriousMode = true;
                component.isRemoveFaultMode = false;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new PcvDoorExerciseRemoveSeriousFault());
            });
            it('should dispatch a REMOVE_SERIOUS_FAULT for press and hold', function () {
                component.pcvDoorExercise = { seriousFault: true };
                component.isSeriousMode = true;
                component.isRemoveFaultMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new PcvDoorExerciseRemoveSeriousFault());
            });
            it('should dispatch a REMOVE_SERIOUS_FAULT for press', function () {
                component.pcvDoorExercise = { seriousFault: true };
                component.isSeriousMode = true;
                component.isRemoveFaultMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new PcvDoorExerciseRemoveSeriousFault());
            });
            it('should not dispatch a REMOVE_SERIOUS_FAULT when is dangerous mode', function () {
                component.pcvDoorExercise = { seriousFault: true };
                component.isDangerousMode = true;
                component.isRemoveFaultMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new PcvDoorExerciseRemoveSeriousFault());
            });
            it('should not remove serious mode after removal attempt on competency with no serious fault', function () {
                component.pcvDoorExercise = { seriousFault: false };
                component.isSeriousMode = true;
                component.isRemoveFaultMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleSeriousFaultMode());
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleRemoveFaultMode());
                fixture.detectChanges();
            });
        });
        describe('removeDangerousFault', function () {
            it('should not dispatch a REMOVE_DANGEROUS_FAULT when not in remove mode', function () {
                component.pcvDoorExercise = { dangerousFault: true };
                component.isDangerousMode = true;
                component.isRemoveFaultMode = false;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new PcvDoorExerciseRemoveDangerousFault());
            });
            it('should dispatch a REMOVE_DANGEROUS_FAULT for press and hold', function () {
                component.pcvDoorExercise = { dangerousFault: true };
                component.isDangerousMode = true;
                component.isRemoveFaultMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new PcvDoorExerciseRemoveDangerousFault());
            });
            it('should dispatch a REMOVE_DANGEROUS_FAULT for press', function () {
                component.pcvDoorExercise = { dangerousFault: true };
                component.isDangerousMode = true;
                component.isRemoveFaultMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new PcvDoorExerciseRemoveDangerousFault());
            });
            it('should not dispatch a REMOVE_DANGEROUS_FAULT when is serious mode', function () {
                component.pcvDoorExercise = { dangerousFault: true };
                component.isSeriousMode = true;
                component.isRemoveFaultMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new PcvDoorExerciseRemoveDangerousFault());
            });
            it('should not remove dangerous mode after removal attempt on competency with no dangerous fault', function () {
                component.pcvDoorExercise = { dangerousFault: false };
                component.isDangerousMode = true;
                component.isRemoveFaultMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleDangerousFaultMode());
                expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleRemoveFaultMode());
                fixture.detectChanges();
            });
        });
        describe('buttonClick', function () {
            it('should dispatch ADD_DANGEROUS_FAULT action if dangerous mode is active', function () {
                component.isDangerousMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new PcvDoorExerciseAddDangerousFault());
                expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleDangerousFaultMode());
            });
            it('should dispatch ADD_SERIOUS_FAULT action if serious mode is active', function () {
                component.isSeriousMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new PcvDoorExerciseAddSeriousFault());
                expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleSeriousFaultMode());
            });
        });
    });
    describe('canButtonRipple', function () {
        it('should allow ripple when in remove dangerous mode and there is a dangerous fault', function () {
            component.isRemoveFaultMode = true;
            component.isDangerousMode = true;
            component.pcvDoorExercise = { dangerousFault: true };
            component.canButtonRipple();
            expect(component.allowRipple).toEqual(true);
        });
        it('should not allow ripple when in remove dangerous mode and there is not a dangerous fault', function () {
            component.isRemoveFaultMode = true;
            component.isDangerousMode = true;
            component.pcvDoorExercise = { dangerousFault: false };
            component.canButtonRipple();
            expect(component.allowRipple).toEqual(false);
        });
        it('should allow ripple when in remove serious mode and there is a serious fault', function () {
            component.isRemoveFaultMode = true;
            component.isSeriousMode = true;
            component.pcvDoorExercise = { seriousFault: true };
            component.canButtonRipple();
            expect(component.allowRipple).toEqual(true);
        });
        it('should not allow ripple when in remove serious mode and there is not a serious fault', function () {
            component.isRemoveFaultMode = true;
            component.isSeriousMode = true;
            component.pcvDoorExercise = { seriousFault: false };
            component.canButtonRipple();
            expect(component.allowRipple).toEqual(false);
        });
        it('should allow ripple when in remove fault mode and there is a driving fault', function () {
            component.isRemoveFaultMode = true;
            component.pcvDoorExercise = { drivingFault: true };
            component.canButtonRipple();
            expect(component.allowRipple).toEqual(true);
        });
        it('should not allow ripple when in remove fault mode and there is not a driving fault', function () {
            component.isRemoveFaultMode = true;
            component.pcvDoorExercise = { drivingFault: false };
            component.canButtonRipple();
            expect(component.allowRipple).toEqual(false);
        });
        it('should not allow ripple when in remove fault mode and driving fault is undefined', function () {
            component.isRemoveFaultMode = true;
            component.canButtonRipple();
            expect(component.allowRipple).toEqual(false);
        });
        it('should not allow ripple when in add dangerous mode and there is a dangerous fault', function () {
            component.isRemoveFaultMode = false;
            component.isDangerousMode = true;
            component.pcvDoorExercise = { dangerousFault: true };
            component.canButtonRipple();
            expect(component.allowRipple).toEqual(false);
        });
        it('should allow ripple when in add dangerous mode and there is not a dangerous fault', function () {
            component.isRemoveFaultMode = false;
            component.isDangerousMode = true;
            component.pcvDoorExercise = { dangerousFault: false };
            component.canButtonRipple();
            expect(component.allowRipple).toEqual(true);
        });
        it('should not allow ripple when in add serious mode and there is a serious fault', function () {
            component.isRemoveFaultMode = false;
            component.isSeriousMode = true;
            component.pcvDoorExercise = { seriousFault: true };
            component.canButtonRipple();
            expect(component.allowRipple).toEqual(false);
        });
        it('should allow ripple when in add serious mode and there is not a serious fault', function () {
            component.isRemoveFaultMode = false;
            component.isSeriousMode = true;
            component.pcvDoorExercise = { seriousFault: false };
            component.canButtonRipple();
            expect(component.allowRipple).toEqual(true);
        });
        it('should allow ripple when in add fault mode and there is a driving fault', function () {
            component.isRemoveFaultMode = false;
            component.pcvDoorExercise = { drivingFault: true };
            component.canButtonRipple();
            expect(component.allowRipple).toEqual(true);
        });
        it('should allow ripple when in add fault mode and there is not a driving fault', function () {
            component.isRemoveFaultMode = false;
            component.pcvDoorExercise = { drivingFault: false };
            component.canButtonRipple();
            expect(component.allowRipple).toEqual(true);
        });
        it('should allow ripple when in add fault mode and driving fault is undefined', function () {
            component.isRemoveFaultMode = false;
            component.canButtonRipple();
            expect(component.allowRipple).toEqual(true);
        });
    });
    describe('DOM', function () {
        it('should show 1 driving fault when passing driving fault as true to the driving faults badge component', function () {
            fixture.detectChanges();
            var drivingFaultsBadge = fixture.debugElement.query(By.css('.driving-faults'))
                .componentInstance;
            component.pcvDoorExercise = { drivingFault: true };
            fixture.detectChanges();
            expect(drivingFaultsBadge.count).toBe(1);
        });
    });
});
//# sourceMappingURL=pcv-door-exercise.spec.js.map