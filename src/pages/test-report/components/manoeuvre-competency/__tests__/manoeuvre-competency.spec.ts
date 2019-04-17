import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { AppModule } from '../../../../../app/app.module';
import { StoreModule, Store } from '@ngrx/store';
import { StoreModel } from '../../../../../shared/models/store.model';
import { MockComponent } from 'ng-mocks';
import { Competencies } from '../../../../../modules/tests/test_data/test-data.constants';
import { DrivingFaultsBadgeComponent } from '../../../../../components/driving-faults-badge/driving-faults-badge';
import { DateTimeProvider } from '../../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../../providers/date-time/__mocks__/date-time.mock';
import { SeriousFaultBadgeComponent } from '../../../../../components/serious-fault-badge/serious-fault-badge';
import { IonicModule } from 'ionic-angular';
import { DangerousFaultBadgeComponent } from '../../../../../components/dangerous-fault-badge/dangerous-fault-badge';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { testReportReducer } from '../../../test-report.reducer';
import { StartTest } from '../../../../journal/journal.actions';
import { ManoeuvreCompetencyComponent } from '../manoeuvre-competency';
import { AddManoeuvreDrivingFault } from '../../../../../modules/tests/test_data/test-data.actions';
import { By } from '@angular/platform-browser';

describe('ManoeuvreCompetencyComponent', () => {
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

  describe('Manoeuvre competency', () => {
    it('should get the competency label from the correct object', () => {
      component.competency = Competencies.outcomeReverseRightControl;
      fixture.detectChanges();
      const result = component.getLabel();
      const expected = 'Control';
      expect(result).toEqual(expected);
    });

    describe('AddManoeuvreDrivingFault', () => {
      it('should dispatch the correct action when the competency is a manoeuvre', () => {
        component.competency = Competencies.outcomeReverseRightControl;
        fixture.detectChanges();
        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(true);

        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddManoeuvreDrivingFault(component.competency));
      });
    });

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
  });
});
