import { AppModule } from '../../../../../app/app.module';
import { StoreModel } from '../../../../../shared/models/store.model';
import { ManoeuvreCompetencies } from '../../../../../modules/tests/test_data/test-data.constants';
import { DrivingFaultsBadgeComponent } from '../../../../../components/driving-faults-badge/driving-faults-badge';
import { DateTimeProvider } from '../../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../../providers/date-time/__mocks__/date-time.mock';
import { SeriousFaultBadgeComponent } from '../../../../../components/serious-fault-badge/serious-fault-badge';
import { DangerousFaultBadgeComponent } from '../../../../../components/dangerous-fault-badge/dangerous-fault-badge';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { testReportReducer } from '../../../test-report.reducer';
import { StartTest } from '../../../../journal/journal.actions';
import { ManoeuvreCompetencyComponent } from '../manoeuvre-competency';
import { AddManoeuvreDrivingFault } from '../../../../../modules/tests/test_data/test-data.actions';
import { By } from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';
import { MockComponent } from 'ng-mocks';
import { StoreModule, Store } from '@ngrx/store';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';

fdescribe('ManoeuvreCompetencyComponent', () => {
  let fixture: ComponentFixture<ManoeuvreCompetencyComponent>;
  let component: ManoeuvreCompetencyComponent;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
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
        StoreModule.forRoot({ tests: testsReducer, testReport : testReportReducer }),
      ],
      providers: [
        { provide: DateTimeProvider, useClass: DateTimeProviderMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ManoeuvreCompetencyComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);

        store$.dispatch(new StartTest(103));
      });
  }));

  describe('DOM', () => {
    it('should display the correct driving fault badge with a count of 1', () => {
      component.competency = Competencies.outcomeReverseRightControl;
      component.manoeuvreCompetencyOutcome = 'DF';
      const result = component.hasDrivingFault();
      fixture.detectChanges();
      const drivingFaultsBadge = fixture.debugElement.query(By.css('.driving-faults'))
      .componentInstance;
      expect(drivingFaultsBadge).toBeDefined();
      expect(result).toEqual(1);
    });
  });

  describe('Class', () => {
    it('should get the competency label from the correct object', () => {
      component.competency = ManoeuvreCompetencies.outcomeReverseRightControl;
      fixture.detectChanges();
      const result = component.getLabel();
      const expected = 'Control';
      expect(result).toEqual(expected);
    });

    describe('hasDrivingFault', () => {
      it('should return 0 when not driving fault', () => {
        component.competency = ManoeuvreCompetencies.outcomeReverseRightControl;
        component.manoeuvreCompetencyOutcome = CompetencyOutcome.S;
        fixture.detectChanges();

        const result = component.hasDrivingFault();
        expect(result).toBe(0);
      });

      it('should return 1 when has a driving fault', () => {
        component.competency = ManoeuvreCompetencies.outcomeReverseRightControl;
        component.manoeuvreCompetencyOutcome = CompetencyOutcome.DF;

        const result = component.hasDrivingFault();
        expect(result).toBe(1);
      });
    });

    describe('hasSeriousFault', () => {
      it('should return false if it does not have a serious fault', () => {
        component.competency = ManoeuvreCompetencies.outcomeReverseRightControl;
        component.manoeuvreCompetencyOutcome = CompetencyOutcome.DF;

        const result = component.hasSeriousFault();
        expect(result).toBe(false);
      });

      it('should return true if it has a serious fault', () => {
        component.competency = ManoeuvreCompetencies.outcomeReverseRightControl;
        component.manoeuvreCompetencyOutcome = CompetencyOutcome.S;

        const result = component.hasSeriousFault();
        expect(result).toBe(true);
      });
    });

    describe('hasDangerousFault', () => {
      it('should return false if it does not have a dangerous fault', () => {
        component.competency = ManoeuvreCompetencies.outcomeReverseRightControl;
        component.manoeuvreCompetencyOutcome = CompetencyOutcome.DF;

        const result = component.hasDangerousFault();
        expect(result).toBe(false);
      });

      it('should return true if it has a dangerous fault', () => {
        component.competency = ManoeuvreCompetencies.outcomeReverseRightControl;
        component.manoeuvreCompetencyOutcome = CompetencyOutcome.D;

        const result = component.hasDangerousFault();
        expect(result).toBe(true);
      });
    });
    describe('AddManoeuvreDrivingFault', () => {
      it('should dispatch the correct action when the competency is a manoeuvre', () => {
        component.competency = ManoeuvreCompetencies.outcomeReverseRightControl;
        fixture.detectChanges();
        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(true);

        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddManoeuvreDrivingFault(component.competency));
      });
    });
  });
});
