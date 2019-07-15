import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { EcoComponent } from '../eco';
import { IonicModule } from 'ionic-angular';
import { StoreModule, Store } from '@ngrx/store';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { testReportReducer } from '../../../test-report.reducer';
import { StoreModel } from '../../../../../shared/models/store.model';
import { MockComponent } from 'ng-mocks';
import { CompetencyButtonComponent } from '../../../components/competency-button/competency-button';
import { TickIndicatorComponent } from '../../../../../components/tick-indicator/tick-indicator';
import { StartTest } from '../../../../journal/journal.actions';
import { ToggleEco, TogglePlanningEco, ToggleControlEco }
  from '../../../../../modules/tests/test-data/test-data.actions';

describe('Eco component', () => {
  let fixture: ComponentFixture<EcoComponent>;
  let component: EcoComponent;
  let store$: Store<StoreModel>;
  let storeDispatchSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EcoComponent,
        MockComponent(TickIndicatorComponent),
        MockComponent(CompetencyButtonComponent),
      ],
      imports: [
        IonicModule,
        StoreModule.forRoot({ tests: testsReducer, testReport : testReportReducer }),
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(EcoComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        store$.dispatch(new StartTest(105));
        storeDispatchSpy = spyOn(store$, 'dispatch');
      });
  }));

  describe('Class', () => {
    it('should compile', () => {
      expect(component).toBeDefined();
    });

    describe('Record that Eco has been assessed', () => {
      it('should dispatch a TOGGLE_ECO action', () => {
        component.toggleEco();
        expect(storeDispatchSpy).toHaveBeenCalledWith(
          new ToggleEco(),
        );
      });
      it('should not dispatch a TOGGLE_ECO action when advice has been given', () => {
        component.adviceGivenControl = true;
        component.toggleEco();
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(
          new ToggleEco(),
        );
      });
    });

    describe('Record that Eco Control advice was given', () => {
      it('should dispatch a TOGGLE_CONTROL_ECO action', () => {
        component.toggleEcoControl();
        expect(storeDispatchSpy).toHaveBeenCalledWith(
          new ToggleControlEco(),
        );
      });
    });

    describe('Record that Eco Planning advice was given', () => {
      it('should dispatch a TOGGLE_PLANNING_ECO action', () => {
        component.toggleEcoPlanning();
        expect(storeDispatchSpy).toHaveBeenCalledWith(
          new TogglePlanningEco(),
        );
      });
    });
  });

});
