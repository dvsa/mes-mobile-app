import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { VehicleCheckComponent } from '../vehicle-check';
import { IonicModule } from 'ionic-angular';
import { StoreModule, Store } from '@ngrx/store';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { testReportReducer } from '../../../test-report.reducer';
import { StoreModel } from '../../../../../shared/models/store.model';
import { MockComponent } from 'ng-mocks';
import { CompetencyButtonComponent } from '../../../components/competency-button/competency-button';
import { TickIndicatorComponent } from '../../tick-indicator/tick-indicator';
import { DrivingFaultsBadgeComponent } from '../../../../../components/driving-faults-badge/driving-faults-badge';
import { SeriousFaultBadgeComponent } from '../../../../../components/serious-fault-badge/serious-fault-badge';
import { DangerousFaultBadgeComponent } from '../../../../../components/dangerous-fault-badge/dangerous-fault-badge';
import { StartTest } from '../../../../journal/journal.actions';

describe('VehicleCheckComponent', () => {

  let fixture: ComponentFixture<VehicleCheckComponent>;
  let component: VehicleCheckComponent;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
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
        StoreModule.forRoot({ tests: testsReducer, testReport : testReportReducer }),
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(VehicleCheckComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        store$.dispatch(new StartTest(105));
      });
  }));

  describe('Class', () => {
    it('should compile', () => {
      expect(component).toBeDefined();
    });
  });
});
