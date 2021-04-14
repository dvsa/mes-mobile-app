import { async, TestBed } from '@angular/core/testing';
import { VehicleCheckComponent } from '../vehicle-check';
import { IonicModule } from 'ionic-angular';
import { StoreModule, Store } from '@ngrx/store';
import { testsReducer } from '../../../../../../modules/tests/tests.reducer';
import { testReportReducer } from '../../../../test-report.reducer';
import { MockComponent } from 'ng-mocks';
import { CompetencyButtonComponent } from '../../../../components/competency-button/competency-button';
import { TickIndicatorComponent } from '../../../../../../components/common/tick-indicator/tick-indicator';
import { DrivingFaultsBadgeComponent, } from '../../../../../../components/common/driving-faults-badge/driving-faults-badge';
import { SeriousFaultBadgeComponent, } from '../../../../../../components/common/serious-fault-badge/serious-fault-badge';
import { DangerousFaultBadgeComponent, } from '../../../../../../components/common/dangerous-fault-badge/dangerous-fault-badge';
import { StartTest } from '../../../../../../modules/tests/tests.actions';
import { By } from '@angular/platform-browser';
import { TellMeQuestionCorrect, TellMeQuestionDrivingFault, ShowMeQuestionSeriousFault, ShowMeQuestionDangerousFault, ShowMeQuestionDrivingFault, ShowMeQuestionPassed, ShowMeQuestionRemoveFault, } from '../../../../../../modules/tests/test-data/cat-b/vehicle-checks/vehicle-checks.actions';
import { CompetencyOutcome } from '../../../../../../shared/models/competency-outcome';
import { configureTestSuite } from 'ng-bullet';
describe('VehicleCheckComponent', function () {
    var fixture;
    var component;
    var store$;
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
                StoreModule.forRoot({ tests: testsReducer, testReport: testReportReducer }),
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(VehicleCheckComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        store$.dispatch(new StartTest(105, "B" /* B */));
    }));
    describe('Class', function () {
        describe('addFault', function () {
            it('should dispatch SHOW_ME_QUESTION_SERIOUS_FAULT when serious mode is on', function () {
                fixture.detectChanges();
                component.isSeriousMode = true;
                var storeDisptachSpy = spyOn(store$, 'dispatch');
                component.addFault(false);
                expect(storeDisptachSpy).toHaveBeenCalledWith(new ShowMeQuestionSeriousFault());
            });
            it('should dispatch SHOW_ME_QUESTION_DANGEROUS_FAULT when dangerous mode is on', function () {
                fixture.detectChanges();
                component.isDangerousMode = true;
                var storeDisptachSpy = spyOn(store$, 'dispatch');
                component.addFault(false);
                expect(storeDisptachSpy).toHaveBeenCalledWith(new ShowMeQuestionDangerousFault());
            });
            it('should dispatch SHOW_ME_QUESTION_DRIVING_FAULT when competency is pressed', function () {
                fixture.detectChanges();
                var storeDisptachSpy = spyOn(store$, 'dispatch');
                component.addFault(true);
                expect(storeDisptachSpy).toHaveBeenCalledWith(new ShowMeQuestionDrivingFault());
            });
            it('should not dispatch SHOW_ME_QUESTION_DRIVING_FAULT when competency was just tapped', function () {
                fixture.detectChanges();
                var storeDisptachSpy = spyOn(store$, 'dispatch');
                component.addFault(false);
                expect(storeDisptachSpy).not.toHaveBeenCalledWith(new ShowMeQuestionDrivingFault());
            });
        });
        describe('removeFault', function () {
            it('should dispatch a SHOW_ME_QUESTION_PASSED action on remove fault', function () {
                store$.dispatch(new ShowMeQuestionDrivingFault());
                fixture.detectChanges();
                component.isRemoveFaultMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.removeFault();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new ShowMeQuestionPassed());
            });
            it('should dispatch a SHOW_ME_QUESTION_PASSED action if there is a serious fault', function () {
                store$.dispatch(new ShowMeQuestionSeriousFault());
                fixture.detectChanges();
                component.isRemoveFaultMode = true;
                component.isSeriousMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault(true);
                expect(storeDispatchSpy).toHaveBeenCalledWith(new ShowMeQuestionPassed());
            });
            it('should dispatch a SHOW_ME_QUESTION_PASSED action if there is a dangerous fault', function () {
                store$.dispatch(new ShowMeQuestionDangerousFault());
                fixture.detectChanges();
                component.isRemoveFaultMode = true;
                component.isDangerousMode = true;
                var storeDispatchSpy = spyOn(store$, 'dispatch');
                component.addOrRemoveFault();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new ShowMeQuestionPassed());
            });
        });
        describe('toggleShowMeQuestion', function () {
            it('should dispatch SHOW_ME_QUESTION_PASSED when competency has not got any faults', function () {
                fixture.detectChanges();
                var storeDisptachSpy = spyOn(store$, 'dispatch');
                component.toggleShowMeQuestion();
                expect(storeDisptachSpy).toHaveBeenCalledWith(new ShowMeQuestionPassed());
            });
            it('should not dispatch anything when show me has driving fault', function () {
                fixture.detectChanges();
                component.showMeQuestionFault = CompetencyOutcome.DF;
                var storeDisptachSpy = spyOn(store$, 'dispatch');
                component.toggleShowMeQuestion();
                expect(storeDisptachSpy).not.toHaveBeenCalled();
            });
            it('should not dispatch anything when show me has serious fault', function () {
                fixture.detectChanges();
                component.showMeQuestionFault = CompetencyOutcome.S;
                var storeDisptachSpy = spyOn(store$, 'dispatch');
                component.toggleShowMeQuestion();
                expect(storeDisptachSpy).not.toHaveBeenCalled();
            });
            it('should not dispatch anything when show me has dangerous fault', function () {
                fixture.detectChanges();
                component.showMeQuestionFault = CompetencyOutcome.D;
                var storeDisptachSpy = spyOn(store$, 'dispatch');
                component.toggleShowMeQuestion();
                expect(storeDisptachSpy).not.toHaveBeenCalled();
            });
            it('should dispatch SHOW_ME_QUESTION_REMOVE_FAULT when show me has pass outcome', function () {
                fixture.detectChanges();
                component.showMeQuestionFault = CompetencyOutcome.P;
                var storeDisptachSpy = spyOn(store$, 'dispatch');
                component.toggleShowMeQuestion();
                expect(storeDisptachSpy).toHaveBeenCalledWith(new ShowMeQuestionRemoveFault());
            });
        });
    });
    describe('DOM', function () {
        it('should pass 0 driving faults to the driving faults badge component when no tell me fault', function () {
            store$.dispatch(new TellMeQuestionCorrect());
            fixture.detectChanges();
            var drivingFaultsBadge = fixture.debugElement.query(By.css('.driving-faults'))
                .componentInstance;
            fixture.detectChanges();
            expect(drivingFaultsBadge.count).toBe(0);
        });
        it('should pass 1 driving faults to the driving faults badge component when there is a tell me fault', function () {
            store$.dispatch(new TellMeQuestionDrivingFault());
            fixture.detectChanges();
            var drivingFaultsBadge = fixture.debugElement.query(By.css('.driving-faults'))
                .componentInstance;
            fixture.detectChanges();
            expect(drivingFaultsBadge.count).toBe(1);
        });
        it('should pass 1 driving faults to the driving faults badge component when there is a show me fault', function () {
            store$.dispatch(new ShowMeQuestionDrivingFault());
            fixture.detectChanges();
            var drivingFaultsBadge = fixture.debugElement.query(By.css('.driving-faults'))
                .componentInstance;
            fixture.detectChanges();
            expect(drivingFaultsBadge.count).toBe(1);
        });
        it('should have a serious fault badge on if there was serious fault recorded against the show me question', function () {
            store$.dispatch(new ShowMeQuestionSeriousFault());
            fixture.detectChanges();
            var seriousFaultBadge = fixture.debugElement.query(By.css('serious-fault-badge'))
                .componentInstance;
            fixture.detectChanges();
            expect(seriousFaultBadge.showBadge).toBe(true);
        });
        it('should have a serious fault badge on if tell me has driving fault but show me has serious', function () {
            store$.dispatch(new TellMeQuestionDrivingFault());
            store$.dispatch(new ShowMeQuestionSeriousFault());
            fixture.detectChanges();
            var drivingFaultsBadge = fixture.debugElement.query(By.css('.driving-faults'))
                .componentInstance;
            fixture.detectChanges();
            expect(drivingFaultsBadge.count).toBe(0);
            var seriousFaultBadge = fixture.debugElement.query(By.css('serious-fault-badge'))
                .componentInstance;
            fixture.detectChanges();
            expect(seriousFaultBadge.showBadge).toBe(true);
        });
        it('should have a dangerous fault badge on if there was serious fault recorded against show me question', function () {
            store$.dispatch(new ShowMeQuestionDangerousFault());
            fixture.detectChanges();
            var dangerousFaultBadge = fixture.debugElement.query(By.css('dangerous-fault-badge'))
                .componentInstance;
            fixture.detectChanges();
            expect(dangerousFaultBadge.showBadge).toBe(true);
        });
        it('should have a dangerous fault badge on if tell me has driving fault but show me has dangerous', function () {
            store$.dispatch(new TellMeQuestionDrivingFault());
            store$.dispatch(new ShowMeQuestionDangerousFault());
            fixture.detectChanges();
            var drivingFaultsBadge = fixture.debugElement.query(By.css('.driving-faults'))
                .componentInstance;
            fixture.detectChanges();
            expect(drivingFaultsBadge.count).toBe(0);
            var dangerousFaultBadge = fixture.debugElement.query(By.css('dangerous-fault-badge'))
                .componentInstance;
            fixture.detectChanges();
            expect(dangerousFaultBadge.showBadge).toBe(true);
        });
    });
});
//# sourceMappingURL=vehicle-check.spec.js.map