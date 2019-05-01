import { AppModule } from '../../../../../app/app.module';
import { StoreModel } from '../../../../../shared/models/store.model';
import { ManoeuvreCompetencies, ManoeuvreTypes } from '../../../../../modules/tests/test-data/test-data.constants';
import { DrivingFaultsBadgeComponent } from '../../../../../components/driving-faults-badge/driving-faults-badge';
import { DateTimeProvider } from '../../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../../providers/date-time/__mocks__/date-time.mock';
import { SeriousFaultBadgeComponent } from '../../../../../components/serious-fault-badge/serious-fault-badge';
import { DangerousFaultBadgeComponent } from '../../../../../components/dangerous-fault-badge/dangerous-fault-badge';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { testReportReducer } from '../../../test-report.reducer';
import { StartTest } from '../../../../journal/journal.actions';
import { ManoeuvreCompetencyComponent } from '../manoeuvre-competency';
import {
  AddManoeuvreDrivingFault,
  AddManoeuvreDangerousFault,
  AddManoeuvreSeriousFault,
  RemoveManoeuvreFault,
} from '../../../../../modules/tests/test-data/test-data.actions';
import { By } from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';
import { MockComponent } from 'ng-mocks';
import { StoreModule, Store } from '@ngrx/store';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
import { ToggleDangerousFaultMode, ToggleSeriousFaultMode, ToggleRemoveFaultMode } from '../../../test-report.actions';

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

  describe('DOM', () => {
    it('should display the correct driving fault badge with a count of 1', () => {
      component.manoeuvre = ManoeuvreTypes.reverseRight;
      component.competency = ManoeuvreCompetencies.controlFault;
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
      component.manoeuvre = ManoeuvreTypes.reverseRight;
      component.competency = ManoeuvreCompetencies.controlFault;
      fixture.detectChanges();
      const result = component.getLabel();
      const expected = 'Control';
      expect(result).toEqual(expected);
    });

    describe('hasDrivingFault', () => {
      it('should return 0 when not driving fault', () => {
        component.manoeuvre = ManoeuvreTypes.reverseRight;
        component.competency = ManoeuvreCompetencies.controlFault;
        component.manoeuvreCompetencyOutcome = CompetencyOutcome.S;
        fixture.detectChanges();

        const result = component.hasDrivingFault();
        expect(result).toBe(0);
      });

      it('should return 1 when has a driving fault', () => {
        component.manoeuvre = ManoeuvreTypes.reverseRight;
        component.competency = ManoeuvreCompetencies.controlFault;
        component.manoeuvreCompetencyOutcome = CompetencyOutcome.DF;

        const result = component.hasDrivingFault();
        expect(result).toBe(1);
      });
    });

    describe('hasSeriousFault', () => {
      it('should return false if it does not have a serious fault', () => {
        component.manoeuvre = ManoeuvreTypes.reverseRight;
        component.competency = ManoeuvreCompetencies.controlFault;
        component.manoeuvreCompetencyOutcome = CompetencyOutcome.DF;

        const result = component.hasSeriousFault();
        expect(result).toBe(false);
      });

      it('should return true if it has a serious fault', () => {
        component.manoeuvre = ManoeuvreTypes.reverseRight;
        component.competency = ManoeuvreCompetencies.controlFault;
        component.manoeuvreCompetencyOutcome = CompetencyOutcome.S;

        const result = component.hasSeriousFault();
        expect(result).toBe(true);
      });
    });

    describe('hasDangerousFault', () => {
      it('should return false if it does not have a dangerous fault', () => {
        component.manoeuvre = ManoeuvreTypes.reverseRight;
        component.competency = ManoeuvreCompetencies.controlFault;
        component.manoeuvreCompetencyOutcome = CompetencyOutcome.DF;

        const result = component.hasDangerousFault();
        expect(result).toBe(false);
      });

      it('should return true if it has a dangerous fault', () => {
        component.manoeuvre = ManoeuvreTypes.reverseRight;
        component.competency = ManoeuvreCompetencies.controlFault;
        component.manoeuvreCompetencyOutcome = CompetencyOutcome.D;

        const result = component.hasDangerousFault();
        expect(result).toBe(true);
      });
    });

    describe('addFault', () => {
      it('should dispatch a ADD_MANOEUVRE_DANGEROUS_FAULT action if dangerous mode is active on press', () => {
        component.manoeuvre = ManoeuvreTypes.reverseRight;
        component.competency = ManoeuvreCompetencies.controlFault;
        component.isDangerousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddManoeuvreDangerousFault({
          manoeuvre: component.manoeuvre,
          competency: component.competency,
        }));
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleDangerousFaultMode());
      });

      it('should dispatch a ADD_MANOEUVRE_SERIOUS_FAULT action if serious mode is active on press', () => {
        component.manoeuvre = ManoeuvreTypes.reverseRight;
        component.competency = ManoeuvreCompetencies.controlFault;
        component.isSeriousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddManoeuvreSeriousFault({
          manoeuvre: component.manoeuvre,
          competency: component.competency,
        }));
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleSeriousFaultMode());
      });

      it('should dispatch a ADD_MANOEUVRE_DRIVING_FAULT action if simple driving fault mode is active on press', () => {
        component.manoeuvre = ManoeuvreTypes.reverseRight;
        component.competency = ManoeuvreCompetencies.controlFault;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(true);

        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddManoeuvreDrivingFault({
          manoeuvre: component.manoeuvre,
          competency: component.competency,
        }));
      });
    });

    describe('AddManoeuvreDrivingFault', () => {
      it('should dispatch the correct action when the competency is a manoeuvre', () => {
        component.manoeuvre = ManoeuvreTypes.reverseRight;
        component.competency = ManoeuvreCompetencies.controlFault;
        fixture.detectChanges();
        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(true);

        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddManoeuvreDrivingFault({
          manoeuvre: component.manoeuvre,
          competency: component.competency,
        }));
      });
    });

    describe('Remove faults', () => {
      describe('dispatched the actions competency outcome is undefined', () => {
        beforeEach(() => {
          fixture.detectChanges();
          component.manoeuvre = ManoeuvreTypes.reverseRight;
          component.competency = ManoeuvreCompetencies.controlFault;
          component.isRemoveFaultMode = true;
          component.manoeuvreCompetencyOutcome = undefined;
        });
        it('should only toggle remove fault when remove fault mode is true', () => {
          fixture.detectChanges();
          const storeDispatchSpy = spyOn(store$, 'dispatch');
          component.addOrRemoveFault();
          expect(storeDispatchSpy).toHaveBeenCalledTimes(1);
          expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleRemoveFaultMode());
        });
        it('should only toggle remove and serious fault when remove and serious fault modes are true', () => {
          component.isSeriousMode = true;
          fixture.detectChanges();
          const storeDispatchSpy = spyOn(store$, 'dispatch');
          component.addOrRemoveFault();
          expect(storeDispatchSpy).toHaveBeenCalledTimes(2);
          expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleRemoveFaultMode());
          expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleSeriousFaultMode());
        });
        it('should only toggle remove and serious fault when remove and serious fault modes are true', () => {
          component.isDangerousMode = true;
          fixture.detectChanges();
          const storeDispatchSpy = spyOn(store$, 'dispatch');
          component.addOrRemoveFault();
          expect(storeDispatchSpy).toHaveBeenCalledTimes(2);
          expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleRemoveFaultMode());
          expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleDangerousFaultMode());
        });
      });
      it('should remove a dangerous fault and toggle dangerous mode when dangerous mode is true', () => {
        fixture.detectChanges();
        component.manoeuvre = ManoeuvreTypes.reverseRight;
        component.competency = ManoeuvreCompetencies.controlFault;
        component.isRemoveFaultMode = true;
        component.isDangerousMode = true;
        component.manoeuvreCompetencyOutcome = CompetencyOutcome.D;
        fixture.detectChanges();
        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();
        expect(storeDispatchSpy).toHaveBeenCalledTimes(3);
        expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveManoeuvreFault({
          competency: component.competency,
          manoeuvre: component.manoeuvre,
        }));
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleRemoveFaultMode());
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleDangerousFaultMode());
      });
      it('should remove a serious fault and toggle serious mode when serious mode is true', () => {
        fixture.detectChanges();
        component.manoeuvre = ManoeuvreTypes.reverseRight;
        component.competency = ManoeuvreCompetencies.controlFault;
        component.isRemoveFaultMode = true;
        component.isSeriousMode = true;
        component.manoeuvreCompetencyOutcome = CompetencyOutcome.S;
        fixture.detectChanges();
        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();
        expect(storeDispatchSpy).toHaveBeenCalledTimes(3);
        expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveManoeuvreFault({
          competency: component.competency,
          manoeuvre: component.manoeuvre,
        }));
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleRemoveFaultMode());
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleSeriousFaultMode());
      });
      it('should remove a driving fault and toggle remove mode', () => {
        fixture.detectChanges();
        component.manoeuvre = ManoeuvreTypes.reverseRight;
        component.competency = ManoeuvreCompetencies.controlFault;
        component.isRemoveFaultMode = true;
        component.manoeuvreCompetencyOutcome = CompetencyOutcome.DF;
        fixture.detectChanges();
        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();
        expect(storeDispatchSpy).toHaveBeenCalledTimes(2);
        expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveManoeuvreFault({
          competency: component.competency,
          manoeuvre: component.manoeuvre,
        }));
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleRemoveFaultMode());
      });
    });
  });
});
