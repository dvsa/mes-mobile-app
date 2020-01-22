import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { ReverseLeftComponent } from '../reverse-left';
import { Store, StoreModule } from '@ngrx/store';
import { StoreModel } from '../../../../../../shared/models/store.model';
import { MockComponent } from 'ng-mocks';
import { TickIndicatorComponent } from '../../../../../../components/common/tick-indicator/tick-indicator';
import { DrivingFaultsBadgeComponent }
  from '../../../../../../components/common/driving-faults-badge/driving-faults-badge';
import { SeriousFaultBadgeComponent }
  from '../../../../../../components/common/serious-fault-badge/serious-fault-badge';
import { DangerousFaultBadgeComponent }
  from '../../../../../../components/common/dangerous-fault-badge/dangerous-fault-badge';
import { CompetencyButtonComponent } from '../../../../components/competency-button/competency-button';
import { IonicModule } from 'ionic-angular';
import { testsReducer } from '../../../../../../modules/tests/tests.reducer';
import { testReportReducer } from '../../../../test-report.reducer';
import { StartTest } from '../../../../../../modules/tests/tests.actions';
import { ReverseLeftPopoverClosed, ReverseLeftPopoverOpened } from '../reverse-left.actions';
import { FaultCountProvider } from '../../../../../../providers/fault-count/fault-count';
import { AppModule } from '../../../../../../app/app.module';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

describe('reverseLeftComponent', () => {
  let fixture: ComponentFixture<ReverseLeftComponent>;
  let component: ReverseLeftComponent;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReverseLeftComponent,
        MockComponent(TickIndicatorComponent),
        MockComponent(DrivingFaultsBadgeComponent),
        MockComponent(SeriousFaultBadgeComponent),
        MockComponent(DangerousFaultBadgeComponent),
        MockComponent(CompetencyButtonComponent),
      ],
      imports: [
        IonicModule,
        AppModule,
        StoreModule.forRoot({ tests: testsReducer, testReport: testReportReducer }),
      ],
      providers: [
        FaultCountProvider,
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ReverseLeftComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        // TODO: MES-4287 use category C
        store$.dispatch(new StartTest(105, TestCategory.BE));
      });
  }));

  describe('DOM', () => {

  });

  describe('Class', () => {
    describe('togglePopoverDisplay', () => {
      it('should dispatch ReverseLeftPopoverClosed and set displayPopover to false', () => {
        const storeDispatchSpy = spyOn(store$, 'dispatch');
        const toggleOverlaySpy = spyOn(component, 'toggleOverlay');
        component.displayPopover = true;
        component.togglePopoverDisplay();
        expect(storeDispatchSpy).toHaveBeenCalledWith(
          new ReverseLeftPopoverClosed(),
        );
        expect(component.displayPopover).toBeFalsy();
        expect(toggleOverlaySpy).toHaveBeenCalled();
      });

      it('should dispatch ReverseLeftPopoverOpened and set displayPopover to true', () => {
        const storeDispatchSpy = spyOn(store$, 'dispatch');
        const toggleOverlaySpy = spyOn(component, 'toggleOverlay');
        component.displayPopover = false;
        component.togglePopoverDisplay();
        expect(storeDispatchSpy).toHaveBeenCalledWith(
          new ReverseLeftPopoverOpened(),
        );
        expect(component.displayPopover).toBeTruthy();
        expect(toggleOverlaySpy).toHaveBeenCalled();
      });
    });

    describe('toggleOverlay', () => {
      it('should call clickCallback when clickCallback exists', () => {
        component.clickCallback = {
          callbackMethod: () => {},
        };
        const callbackMethodSpy = spyOn(component.clickCallback, 'callbackMethod');
        component.toggleOverlay();
        expect(callbackMethodSpy).toHaveBeenCalled();
      });
    });
  });
});
