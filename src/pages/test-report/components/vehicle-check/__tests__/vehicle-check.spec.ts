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
import { By } from '@angular/platform-browser';
import {
  TellMeQuestionCorrect,
  TellMeQuestionDrivingFault,
  ShowMeQuestionSeriousFault,
} from '../../../../../modules/tests/test-data/test-data.actions';

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
        StoreModule.forRoot({ tests: testsReducer, testReport: testReportReducer }),
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

    describe('addFault', () => {
      it('should dispatch SHOW_ME_QUESTION_SERIOUS_FAULT when serious mode is on', () => {
        fixture.detectChanges();
        component.isSeriousMode = true;

        const storeDisptachSpy = spyOn(store$, 'dispatch');

        component.addFault(false);

        expect(storeDisptachSpy).toHaveBeenCalledWith(new ShowMeQuestionSeriousFault());
      });
    });
  });

  describe('DOM', () => {
    it('should pass 0 driving faults to the driving faults badge component when no tell me fault', () => {
      store$.dispatch(new TellMeQuestionCorrect());
      fixture.detectChanges();
      const drivingFaultsBadge = fixture.debugElement.query(By.css('.driving-faults'))
        .componentInstance as DrivingFaultsBadgeComponent;

      fixture.detectChanges();
      expect(drivingFaultsBadge.count).toBe(0);
    });

    it('should pass 1 driving faults to the driving faults badge component when no tell me fault', () => {
      store$.dispatch(new TellMeQuestionDrivingFault());
      fixture.detectChanges();
      const drivingFaultsBadge = fixture.debugElement.query(By.css('.driving-faults'))
        .componentInstance as DrivingFaultsBadgeComponent;

      fixture.detectChanges();
      expect(drivingFaultsBadge.count).toBe(1);
    });

    it('should have a serious fault badge on if there was serious fault recorded against the show me question', () => {
      store$.dispatch(new ShowMeQuestionSeriousFault());
      fixture.detectChanges();
      const seriousFaultBadge = fixture.debugElement.query(By.css('serious-fault-badge'))
        .componentInstance as SeriousFaultBadgeComponent;

      fixture.detectChanges();
      expect(seriousFaultBadge.showBadge).toBe(true);
    });

    it('should have a serious fault badge on if tell me has driving fault but show me has serious', () => {
      store$.dispatch(new TellMeQuestionDrivingFault());
      store$.dispatch(new ShowMeQuestionSeriousFault());
      fixture.detectChanges();

      const drivingFaultsBadge = fixture.debugElement.query(By.css('.driving-faults'))
        .componentInstance as DrivingFaultsBadgeComponent;

      fixture.detectChanges();
      expect(drivingFaultsBadge.count).toBe(0);

      const seriousFaultBadge = fixture.debugElement.query(By.css('serious-fault-badge'))
        .componentInstance as SeriousFaultBadgeComponent;

      fixture.detectChanges();
      expect(seriousFaultBadge.showBadge).toBe(true);
    });
  });
});
