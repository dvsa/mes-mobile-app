import { IonicModule } from 'ionic-angular';
import { TimerComponent } from '../timer';
import { async, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';
import { Store, StoreModule } from '@ngrx/store';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { testReportReducer } from '../../../test-report.reducer';
import { StartTimer } from '../../../test-report.actions';
describe('TimerComponent', function () {
    var fixture;
    var component;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                TimerComponent,
            ],
            imports: [
                IonicModule,
                StoreModule.forRoot({ tests: testsReducer, testReport: testReportReducer }),
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(TimerComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
    }));
    describe('Class', function () {
        describe('startTimer', function () {
            it('should dispatch the start timer action, hide the start test button and set up an interval', function () {
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.startTimer();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new StartTimer());
                expect(component.showStartTimerButton).toEqual(false);
                expect(component.interval).not.toBeUndefined();
            });
        });
        describe('generateTimerString', function () {
            it('should create the correct string when given 5 seconds', function () {
                component.seconds = 5;
                component.generateTimerString();
                expect(component.timerString).toBe('00:00:05');
            });
            it('should create the correct string when given 30 seconds', function () {
                component.seconds = 30;
                component.generateTimerString();
                expect(component.timerString).toBe('00:00:30');
            });
            it('should create the correct string when given 5 mins', function () {
                component.seconds = 300;
                component.generateTimerString();
                expect(component.timerString).toBe('00:05:00');
            });
            it('should create the correct string when given 30 mins', function () {
                component.seconds = 1800;
                component.generateTimerString();
                expect(component.timerString).toBe('00:30:00');
            });
            it('should create the correct string when given 5 hours', function () {
                component.seconds = 18000;
                component.generateTimerString();
                expect(component.timerString).toBe('05:00:00');
            });
            it('should create the correct string when given 15 hours', function () {
                component.seconds = 54000;
                component.generateTimerString();
                expect(component.timerString).toBe('15:00:00');
            });
        });
    });
    describe('DOM', function () {
    });
});
//# sourceMappingURL=timer.spec.js.map