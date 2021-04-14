import { IonicModule, Config, NavController } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { async, TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { ConfigMock, NavControllerMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { ToolbarComponent } from '../toolbar';
import { DrivingFaultSummaryComponent } from '../../driving-fault-summary/driving-fault-summary';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { SeriousTooltipComponent } from '../../serious-tooltip/serious-tooltip';
import { ToggleRemoveFaultMode, ToggleSeriousFaultMode, ToggleDangerousFaultMode } from '../../../test-report.actions';
import { testReportReducer } from '../../../test-report.reducer';
import { DangerousTooltipComponent } from '../../dangerous-tooltip/dangerous-tooltip';
import { TimerComponent } from '../../timer/timer';
import { configureTestSuite } from 'ng-bullet';
describe('ToolbarComponent', function () {
    var fixture;
    var component;
    var store$;
    var storeDispatchSpy;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                ToolbarComponent,
                MockComponent(DrivingFaultSummaryComponent),
                MockComponent(SeriousTooltipComponent),
                MockComponent(DangerousTooltipComponent),
                MockComponent(TimerComponent),
            ],
            imports: [
                IonicModule,
                StoreModule.forRoot({ tests: testsReducer, testReport: testReportReducer }),
            ],
            providers: [
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(ToolbarComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        storeDispatchSpy = spyOn(store$, 'dispatch');
    }));
    describe('Class', function () {
        describe('togglRemoveFaultMode', function () {
            it('should dispatch a TOGGLE_REMOVE_FAULT_MODE action', function () {
                component.toggleRemoveFaultMode();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleRemoveFaultMode(true));
            });
        });
        describe('toggleSeriousMode', function () {
            it('should dispatch a TOGGLE_SERIOUS_FAULT_MODE action', function () {
                component.toggleSeriousMode();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleSeriousFaultMode(true));
            });
            it('should dispatch a TOGGLE_DANGEROUS_FAULT_MODE action if dangerous mode is active', function () {
                component.isDangerousMode = true;
                component.toggleSeriousMode();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleDangerousFaultMode());
            });
        });
        describe('toggleDangerousMode', function () {
            it('should dispatch a TOGGLE_DANGEROUS_FAULT_MODE action', function () {
                component.toggleDangerousMode();
                expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleDangerousFaultMode(true));
            });
        });
    });
    describe('DOM', function () {
        it('should not show any tooltips in default mode', function () {
            fixture.detectChanges();
            expect(component.isSeriousMode).toEqual(false);
            expect(component.isDangerousMode).toEqual(false);
            expect(fixture.debugElement.query(By.css('#serious-button'))).toBeDefined();
            expect(fixture.debugElement.query(By.css('#dangerous-button'))).toBeDefined();
            expect(fixture.debugElement.query(By.css('driving-faults-badge'))).toBeDefined();
            expect(fixture.debugElement.query(By.css('serious-tooltip'))).toBeNull();
            expect(fixture.debugElement.query(By.css('dangerous-tooltip'))).toBeNull();
        });
        it('should show the correct components when serious mode is activated', function () {
            fixture.detectChanges();
            component.isSeriousMode = true;
            fixture.detectChanges();
            expect(component.isSeriousMode).toEqual(true);
            expect(component.isDangerousMode).toEqual(false);
            expect(component.isRemoveFaultMode).toEqual(false);
            expect(fixture.debugElement.query(By.css('#serious-button'))).toBeDefined();
            expect(fixture.debugElement.query(By.css('serious-tooltip'))).toBeDefined();
            expect(fixture.debugElement.query(By.css('#dangerous-button'))).toBeDefined();
            expect(fixture.debugElement.query(By.css('driving-faults-badge'))).toBeNull();
            expect(fixture.debugElement.query(By.css('dangerous-tooltip'))).toBeNull();
        });
        it('should show the correct components when dangerous mode is actived', function () {
            fixture.detectChanges();
            component.isDangerousMode = true;
            fixture.detectChanges();
            expect(component.isRemoveFaultMode).toEqual(false);
            expect(component.isSeriousMode).toEqual(false);
            expect(component.isDangerousMode).toEqual(true);
            expect(fixture.debugElement.query(By.css('#serious-button'))).toBeDefined();
            expect(fixture.debugElement.query(By.css('#dangerous-button'))).toBeDefined();
            expect(fixture.debugElement.query(By.css('dangerous-tooltip'))).toBeDefined();
            expect(fixture.debugElement.query(By.css('driving-faults-badge'))).toBeNull();
            expect(fixture.debugElement.query(By.css('serious-tooltip'))).toBeNull();
        });
    });
});
//# sourceMappingURL=toolbar.spec.js.map