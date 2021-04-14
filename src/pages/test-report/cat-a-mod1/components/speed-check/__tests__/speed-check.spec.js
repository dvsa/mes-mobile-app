import { DrivingFaultsBadgeComponent } from '../../../../../../components/common/driving-faults-badge/driving-faults-badge';
import { SeriousFaultBadgeComponent } from '../../../../../../components/common/serious-fault-badge/serious-fault-badge';
import { DangerousFaultBadgeComponent } from '../../../../../../components/common/dangerous-fault-badge/dangerous-fault-badge';
import { CompetencyButtonComponent } from '../../../../components/competency-button/competency-button';
import { TestBed, async } from '@angular/core/testing';
import { SpeedCheckComponent } from '../speed-check';
import { Store, StoreModule } from '@ngrx/store';
import { configureTestSuite } from 'ng-bullet';
import { MockComponent } from 'ng-mocks';
import { IonicModule } from 'ionic-angular';
import { testsReducer } from '../../../../../../modules/tests/tests.reducer';
import { testReportReducer } from '../../../../test-report.reducer';
import { Competencies } from '../../../../../../modules/tests/test-data/test-data.constants';
import { StartTest } from '../../../../../../modules/tests/tests.actions';
import { AddEmergencyStopSeriousFault, RecordEmergencyStopFirstAttempt, RecordEmergencyStopSecondAttempt, } from '../../../../../../modules/tests/test-data/cat-a-mod1/emergency-stop/emergency-stop.actions';
import { AddAvoidanceSeriousFault, RecordAvoidanceFirstAttempt, RecordAvoidanceSecondAttempt, } from '../../../../../../modules/tests/test-data/cat-a-mod1/avoidance/avoidance.actions';
import { SingleFaultCompetencyComponent } from '../../../../components/single-fault-competency/single-fault-competency';
import { mockBlankSpeed, mockInvalidSpeed, mockValidSpeed, } from './speed-check.mock';
describe('SpeedCheckComponent', function () {
    var fixture;
    var component;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                SpeedCheckComponent,
                MockComponent(DrivingFaultsBadgeComponent),
                MockComponent(SeriousFaultBadgeComponent),
                MockComponent(DangerousFaultBadgeComponent),
                MockComponent(CompetencyButtonComponent),
                MockComponent(SingleFaultCompetencyComponent),
            ],
            imports: [
                IonicModule,
                StoreModule.forRoot({ tests: testsReducer, testReport: testReportReducer }),
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(SpeedCheckComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        store$.dispatch(new StartTest(105, "EUAM1" /* EUAM1 */));
    }));
    describe('Class', function () {
        describe('toggleNotMet function dispatching right actions', function () {
            it('should dispatch AddEmergencyStopSeriousFault when Emergency Stop is the speed check', function () {
                component.competency = Competencies.speedCheckEmergency;
                component.outcome = null;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.toggleNotMet();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new AddEmergencyStopSeriousFault());
            });
            it('should dispatch AddAvoidanceSeriousFault when Avoidance is the speed check', function () {
                component.competency = Competencies.speedCheckAvoidance;
                component.outcome = null;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.toggleNotMet();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new AddAvoidanceSeriousFault());
            });
        });
        describe('getFirstAttempt returning correct speed attempt', function () {
            it('should return null when no firstAttempt is set', function () {
                var result = component.getFirstAttempt();
                expect(result).toBeNull();
            });
            it('should return the speed attempt that has been set', function () {
                var attemptedSpeed = 49;
                component.firstAttempt = attemptedSpeed;
                var result = component.getFirstAttempt();
                expect(result).toBe(attemptedSpeed);
            });
        });
        describe('getSecondAttempt returning correct speed attempt', function () {
            it('should return null when no secondAttempt is set', function () {
                var result = component.getSecondAttempt();
                expect(result).toBeNull();
            });
            it('should return the speed attempt that has been set', function () {
                var attemptedSpeed = 49;
                component.secondAttempt = attemptedSpeed;
                var result = component.getSecondAttempt();
                expect(result).toBe(attemptedSpeed);
            });
        });
        describe('onFirstAttemptChange dispatches the correct actions', function () {
            it('should record emergency stop first attempt', function () {
                component.competency = Competencies.speedCheckEmergency;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                var attemptedSpeed = {
                    target: {
                        value: '48',
                    },
                };
                component.onFirstAttemptChange(attemptedSpeed);
                expect(storeDispatchSpy).toHaveBeenCalledWith(new RecordEmergencyStopFirstAttempt(Number('48')));
            });
            it('should record avoidance first attempt', function () {
                component.competency = Competencies.speedCheckAvoidance;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                var attemptedSpeed = {
                    target: {
                        value: '48',
                    },
                };
                component.onFirstAttemptChange(attemptedSpeed);
                expect(storeDispatchSpy).toHaveBeenCalledWith(new RecordAvoidanceFirstAttempt(Number('48')));
            });
            it('should record undefined as Emergency Stop firstAttempt when attemptedSpeed is an empty string', function () {
                component.competency = Competencies.speedCheckEmergency;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                var attemptedSpeed = {
                    target: {
                        value: '',
                    },
                };
                component.onFirstAttemptChange(attemptedSpeed);
                expect(storeDispatchSpy).toHaveBeenCalledWith(new RecordEmergencyStopFirstAttempt(undefined));
            });
            it('should record undefined as Avoidance firstAttempt when attemptedSpeed is an empty string', function () {
                component.competency = Competencies.speedCheckAvoidance;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                var attemptedSpeed = {
                    target: {
                        value: '',
                    },
                };
                component.onFirstAttemptChange(attemptedSpeed);
                expect(storeDispatchSpy).toHaveBeenCalledWith(new RecordAvoidanceFirstAttempt(undefined));
            });
        });
        describe('onSecondAttemptChange', function () {
            it('should record emergency stop second attempt', function () {
                component.competency = Competencies.speedCheckEmergency;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                var attemptedSpeed = {
                    target: {
                        value: '48',
                    },
                };
                component.onSecondAttemptChange(attemptedSpeed);
                expect(storeDispatchSpy).toHaveBeenCalledWith(new RecordEmergencyStopSecondAttempt(Number('48')));
            });
            it('should record avoidance second attempt', function () {
                component.competency = Competencies.speedCheckAvoidance;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                var attemptedSpeed = {
                    target: {
                        value: '48',
                    },
                };
                component.onSecondAttemptChange(attemptedSpeed);
                expect(storeDispatchSpy).toHaveBeenCalledWith(new RecordAvoidanceSecondAttempt(Number('48')));
            });
            it('should record undefined as Emergency Stop secondAttempt when attemptedSpeed is an empty string', function () {
                component.competency = Competencies.speedCheckEmergency;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                var attemptedSpeed = {
                    target: {
                        value: '',
                    },
                };
                component.onSecondAttemptChange(attemptedSpeed);
                expect(storeDispatchSpy).toHaveBeenCalledWith(new RecordEmergencyStopSecondAttempt(undefined));
            });
            it('should record undefined as Avoidance secondAttempt when attemptedSpeed is an empty string', function () {
                component.competency = Competencies.speedCheckAvoidance;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                var attemptedSpeed = {
                    target: {
                        value: '',
                    },
                };
                component.onSecondAttemptChange(attemptedSpeed);
                expect(storeDispatchSpy).toHaveBeenCalledWith(new RecordAvoidanceSecondAttempt(undefined));
            });
        });
    });
    describe('firstAttemptValid', function () {
        it('should return false if first attempt is null', function () {
            component.firstAttempt = null;
            expect(component.firstAttemptValid()).toEqual(false);
        });
        it('should return true if the first attempt is 0', function () {
            component.firstAttempt = 0;
            expect(component.firstAttemptValid()).toEqual(true);
        });
        it('should return false if the first attempt is undefined', function () {
            component.firstAttempt = undefined;
            expect(component.firstAttemptValid()).toEqual(false);
        });
        it('should return true if the first attempt is a positive number', function () {
            component.firstAttempt = 25;
            expect(component.firstAttemptValid()).toEqual(true);
        });
    });
    describe('formatSpeedAttempt', function () {
        it('should detect valid pattern and cast to number', function () {
            expect(component.formatSpeedAttempt(mockValidSpeed)).toEqual(123);
        });
        it('should detect invalid pattern, strip characters and cast to number', function () {
            expect(component.formatSpeedAttempt(mockInvalidSpeed)).toEqual(145);
        });
        it('should return undefined as could cast empty string to a number', function () {
            expect(component.formatSpeedAttempt(mockBlankSpeed)).toEqual(undefined);
        });
    });
});
//# sourceMappingURL=speed-check.spec.js.map