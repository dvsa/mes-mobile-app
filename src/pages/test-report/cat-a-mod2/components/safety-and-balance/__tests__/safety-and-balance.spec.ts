import { SafetyAndBalanceComponent } from '../safety-and-balance';
import { StoreModel } from '../../../../../../shared/models/store.model';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng-mocks';
import { IonicModule } from 'ionic-angular';
import { testsReducer } from '../../../../../../modules/tests/tests.reducer';
import { StartTest } from '../../../../../../modules/tests/tests.actions';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { DrivingFaultsBadgeComponent }
  from '../../../../../../components/common/driving-faults-badge/driving-faults-badge';
import { FaultCountProvider } from '../../../../../../providers/fault-count/fault-count';
import { SafetyQuestionsScore } from '../../../../../../shared/models/safety-questions-score.model';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/observable/of';
import { configureTestSuite } from 'ng-bullet';

describe('SafetyAndBalanceComponent', () => {
  let fixture: ComponentFixture<SafetyAndBalanceComponent>;
  let component: SafetyAndBalanceComponent;
  let store$: Store<StoreModel>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        SafetyAndBalanceComponent,
        MockComponent(DrivingFaultsBadgeComponent),
      ],
      imports: [
        IonicModule,
        StoreModule.forRoot({
          tests: testsReducer,
        }),
      ],
      providers: [
        FaultCountProvider,
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SafetyAndBalanceComponent);
    component = fixture.componentInstance;
    store$ = TestBed.get(Store);
    store$.dispatch(new StartTest(105, TestCategory.EUA2M2));
  }));

  describe('Class', () => {
    const safetyAndBalanceScore: SafetyQuestionsScore = {
      drivingFaults: 1,
    };

    beforeEach(() => {
      spyOn(component.faultCountProvider, 'getSafetyAndBalanceFaultCount').and.returnValue(safetyAndBalanceScore);
    });

    it('should set the safety and balance questions riding fault count', (done: DoneFn) => {
      component.ngOnInit();
      component.componentState.safetyAndBalanceDrivingFaultCount$.subscribe((result) => {
        expect(component.faultCountProvider.getSafetyAndBalanceFaultCount).toHaveBeenCalled();
        expect(result).toEqual(1);
        done();
      });
    });
  });

  // TODO(MES-4515): Reintroduce once fault count providers are completed
  xdescribe('DOM', () => {
    it('should pass the number of S&B riding faults to the driving faults component', () => {
      fixture.detectChanges();
      const drivingFaultsBadge = fixture.debugElement.query(By.css('.driving-faults'))
        .componentInstance as DrivingFaultsBadgeComponent;
      component.componentState.safetyAndBalanceDrivingFaultCount$ = of(1);
      fixture.detectChanges();
      expect(drivingFaultsBadge.count).toBe(1);
    });
  });
});
