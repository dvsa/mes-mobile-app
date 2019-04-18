import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ControlledStopComponent } from '../controlled-stop';
import { IonicModule } from 'ionic-angular';
import { StoreModule, Store } from '@ngrx/store';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { testReportReducer } from '../../../test-report.reducer';
import { StoreModel } from '../../../../../shared/models/store.model';
import { MockComponent } from 'ng-mocks';
import { TickIndicatorComponent } from '../../tick-indicator/tick-indicator';
import { DrivingFaultsBadgeComponent } from '../../../../../components/driving-faults-badge/driving-faults-badge';
import { SeriousFaultBadgeComponent } from '../../../../../components/serious-fault-badge/serious-fault-badge';
import { DangerousFaultBadgeComponent } from '../../../../../components/dangerous-fault-badge/dangerous-fault-badge';
import { StartTest } from '../../../../journal/journal.actions';
import {
  ControlledStopComplete,
  AddManoeuvreDrivingFault,
} from '../../../../../modules/tests/test_data/test-data.actions';
import { ManoeuvreCompetencies } from '../../../../../modules/tests/test_data/test-data.constants';

describe('ControlledStopComponent', () => {
  let fixture: ComponentFixture<ControlledStopComponent>;
  let component: ControlledStopComponent;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ControlledStopComponent,
        MockComponent(TickIndicatorComponent),
        MockComponent(DrivingFaultsBadgeComponent),
        MockComponent(SeriousFaultBadgeComponent),
        MockComponent(DangerousFaultBadgeComponent),
      ],
      imports: [
        IonicModule,
        StoreModule.forRoot({ tests: testsReducer, testReport : testReportReducer }),
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ControlledStopComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        // spyOn(store$, 'dispatch');
        store$.dispatch(new StartTest(103));
      });
  }));

  describe('Class', () => {
    it('should compile', () => {
      expect(component).toBeDefined();
    });

    describe('addManoeuvreDrivingFault', () => {
      it('should dispatch an ADD_MANOEUVRE_DRIVING_FAULT action for press', () => {

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(true);

        expect(storeDispatchSpy).toHaveBeenCalledWith(
          new AddManoeuvreDrivingFault(ManoeuvreCompetencies.outcomeControlledStop));

        expect(storeDispatchSpy).toHaveBeenCalledWith(new ControlledStopComplete());
      });
      it('should not dispatch an ADD_MANOEUVRE_DRIVING_FAULT action for tap', () => {

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(
          new AddManoeuvreDrivingFault(ManoeuvreCompetencies.outcomeControlledStop));
      });
      it('should not dispatch an ADD_MANOEUVRE_DRIVING_FAULT action if there is already a driving fault', () => {
        component.faultCount = 1;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(true);

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(
          new AddManoeuvreDrivingFault(ManoeuvreCompetencies.outcomeControlledStop));
      });
      it('should not dispatch an ADD_MANOEUVRE_DRIVING_FAULT action if there is a serious fault', () => {
        component.hasSeriousFault = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(
          new AddManoeuvreDrivingFault(ManoeuvreCompetencies.outcomeControlledStop));
      });
      it('should not dispatch an ADD_MANOEUVRE_DRIVING_FAULT action if serious mode is active', () => {
        component.isSeriousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(
          new AddManoeuvreDrivingFault(ManoeuvreCompetencies.outcomeControlledStop));
      });
      it('should not dispatch an ADD_MANOEUVRE_DRIVING_FAULT action if there is a dangerous fault', () => {
        component.hasDangerousFault = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(
          new AddManoeuvreDrivingFault(ManoeuvreCompetencies.outcomeControlledStop));
      });
      it('should not dispatch an ADD_MANOEUVRE_DRIVING_FAULT action if dangerous mode is active', () => {
        component.isDangerousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(
          new AddManoeuvreDrivingFault(ManoeuvreCompetencies.outcomeControlledStop));
      });
    });

    /* describe('addDangerousFault', () => {
      it('should dispatch a ADD_DANGEROUS_FAULT action if dangerous mode is active on press', () => {
        component.isDangerousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddDangerousFault(component.competency));
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleDangerousFaultMode());
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ControlledStopComplete());
      });
      it('should dispatch a ADD_DANGEROUS_FAULT action if dangerous mode is active on press and hold', () => {
        component.isDangerousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddDangerousFault(component.competency));
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleDangerousFaultMode());
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ControlledStopComplete());
      });
      it('should not dispatch a ADD_DANGEROUS_FAULT action if there is a dangerous fault', () => {
        component.hasDangerousFault = true;
        component.isDangerousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddDangerousFault(component.competency));
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleDangerousFaultMode());
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ControlledStopComplete());
      });
      it('should not dispatch a ADD_DANGEROUS_FAULT action if there is a serious fault', () => {
        component.hasSeriousFault = true;
        component.isDangerousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddDangerousFault(component.competency));
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleDangerousFaultMode());
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ControlledStopComplete());
      });
      it('should not dispatch a ADD_DANGEROUS_FAULT action if there is a driving fault', () => {
        component.faultCount = 1;
        component.isDangerousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddDangerousFault(component.competency));
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleDangerousFaultMode());
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ControlledStopComplete());
      });
    });

    describe('addSeriousFault', () => {
      it('should dispatch an ADD_SERIOUS_FAULT action if serious mode is active', () => {
        component.isSeriousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddSeriousFault(component.competency));
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleSeriousFaultMode());
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ControlledStopComplete());
      });
      it('should not dispatch a ADD_SERIOUS_FAULT action if there is a serious fault', () => {
        component.hasSeriousFault = true;
        component.isSeriousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddSeriousFault(component.competency));
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleSeriousFaultMode());
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ControlledStopComplete());
      });
      it('should not dispatch a ADD_SERIOUS_FAULT action if dangerous mode is active', () => { //
        component.isDangerousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddSeriousFault(component.competency));
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleSeriousFaultMode());
      });
      it('should not dispatch a ADD_SERIOUS_FAULT action if there is a dangerous fault', () => {
        component.hasDangerousFault = true;
        component.isSeriousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddSeriousFault(component.competency));
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleSeriousFaultMode());
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ControlledStopComplete());
      });
      it('should not dispatch a ADD_SERIOUS_FAULT action if there is a driving fault', () => {
        component.faultCount = 1;
        component.isSeriousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddSeriousFault(component.competency));
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleSeriousFaultMode());
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ControlledStopComplete());
      });
    });

    describe('removeDrivingFault', () => {
      it('should dispatch a REMOVE_DRIVING_FAULT', () => {
        component.faultCount = 1;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveDrivingFault({
          competency: component.competency,
          newFaultCount: 0,
        }));
      });
      it('should dispatch a REMOVE_DRIVING_FAULT limit zero', () => {
        component.faultCount = 0;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveDrivingFault({
          competency: component.competency,
          newFaultCount: 0,
        }));
      });
      it('should NOT remove driving fault when serious mode is active', () => {
        component.faultCount = 1;
        component.isSeriousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new RemoveDrivingFault({
          competency: component.competency,
          newFaultCount: 1,
        }));
      });
      it('should NOT remove driving fault when dangerous mode is active', () => {
        component.faultCount = 1;
        component.isDangerousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new RemoveDrivingFault({
          competency: component.competency,
          newFaultCount: 1,
        }));
      });
  });

  describe('removeSeriousFault', () => {
    it('should not dispatch a REMOVE_SERIOUS_FAULT when not in remove mode', () => {
      component.hasSeriousFault = true;
      component.isSeriousMode = true;
      component.isRemoveFaultMode = false;

      const storeDispatchSpy = spyOn(store$, 'dispatch');
      component.addOrRemoveFault();

      expect(storeDispatchSpy).not.toHaveBeenCalledWith(new RemoveSeriousFault(component.competency));
    });
    it('should dispatch a REMOVE_SERIOUS_FAULT for press and hold', () => {
      component.hasSeriousFault = true;
      component.isSeriousMode = true;
      component.isRemoveFaultMode = true;

      const storeDispatchSpy = spyOn(store$, 'dispatch');
      component.addOrRemoveFault();

      expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveSeriousFault(component.competency));
    });
    it('should dispatch a REMOVE_SERIOUS_FAULT for press', () => {
      component.hasSeriousFault = true;
      component.isSeriousMode = true;
      component.isRemoveFaultMode = true;

      const storeDispatchSpy = spyOn(store$, 'dispatch');
      component.addOrRemoveFault();

      expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveSeriousFault(component.competency));
    });
    it('should not dispatch a REMOVE_SERIOUS_FAULT when is dangerous mode', () => {
      component.hasSeriousFault = true;
      component.isDangerousMode = true;
      component.isRemoveFaultMode = true;

      const storeDispatchSpy = spyOn(store$, 'dispatch');
      component.addOrRemoveFault();

      expect(storeDispatchSpy).not.toHaveBeenCalledWith(new RemoveSeriousFault(component.competency));
    });

    it('should remove serious mode after removal attempt on competency with no serious fault', () => {
      component.hasSeriousFault = false;
      component.isSeriousMode = true;
      component.isRemoveFaultMode = true;

      const storeDispatchSpy = spyOn(store$, 'dispatch');
      component.addOrRemoveFault();
      expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleSeriousFaultMode());
      expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleRemoveFaultMode());
      fixture.detectChanges();
      expect(component.isSeriousMode).toEqual(false);
    });

  });

  describe('removeDangerousFault', () => {
    it('should not dispatch a REMOVE_DANGEROUS_FAULT when not in remove mode', () => {
      component.hasDangerousFault = true;
      component.isDangerousMode = true;
      component.isRemoveFaultMode = false;

      const storeDispatchSpy = spyOn(store$, 'dispatch');
      component.addOrRemoveFault();

      expect(storeDispatchSpy).not.toHaveBeenCalledWith(new RemoveDangerousFault(component.competency));
    });
    it('should dispatch a REMOVE_DANGEROUS_FAULT for press and hold', () => {
      component.hasDangerousFault = true;
      component.isDangerousMode = true;
      component.isRemoveFaultMode = true;

      const storeDispatchSpy = spyOn(store$, 'dispatch');
      component.addOrRemoveFault();

      expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveDangerousFault(component.competency));
    });
    it('should dispatch a REMOVE_DANGEROUS_FAULT for press', () => {
      component.hasDangerousFault = true;
      component.isDangerousMode = true;
      component.isRemoveFaultMode = true;

      const storeDispatchSpy = spyOn(store$, 'dispatch');
      component.addOrRemoveFault();

      expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveDangerousFault(component.competency));
    });
    it('should not dispatch a REMOVE_DANGEROUS_FAULT when is serious mode', () => {
      component.hasDangerousFault = true;
      component.isSeriousMode = true;
      component.isRemoveFaultMode = true;

      const storeDispatchSpy = spyOn(store$, 'dispatch');
      component.addOrRemoveFault();

      expect(storeDispatchSpy).not.toHaveBeenCalledWith(new RemoveDangerousFault(component.competency));
    });
    it('should remove dangerous mode after removal attempt on competency with no dangerous fault', () => {
      component.hasDangerousFault = false;
      component.isDangerousMode = true;
      component.isRemoveFaultMode = true;

      const storeDispatchSpy = spyOn(store$, 'dispatch');
      component.addOrRemoveFault();
      expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleDangerousFaultMode());
      expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleRemoveFaultMode());
      fixture.detectChanges();
      expect(component.isDangerousMode).toEqual(false);
    });
  });

    describe('toggleControlledStop', () => {
      it('should dispatch a TOGGLE_CONTROLLED_STOP action when there are no faults', () => {
        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.toggleControlledStop();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleControlledStop());
      });
      it('should not dispatch a TOGGLE_CONTROLLED_STOP action when there is a driving fault', () => {
        component.faultCount = 1;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.toggleControlledStop();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleControlledStop());
      });
      it('should not dispatch a TOGGLE_CONTROLLED_STOP action when there is a serious fault', () => {
        component.hasSeriousFault = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.toggleControlledStop();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleControlledStop());
      });
      it('should not dispatch a TOGGLE_CONTROLLED_STOP action when there is a dangerous fault', () => {
        component.hasDangerousFault = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.toggleControlledStop();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleControlledStop());
      });
    }); */
  });

  describe('DOM', () => {
    it('should pass the number of driving faults to the driving faults badge component', () => {
      fixture.detectChanges();
      const drivingFaultsBadge = fixture.debugElement.query(By.css('.driving-faults'))
        .componentInstance as DrivingFaultsBadgeComponent;
      component.faultCount = 1;

      fixture.detectChanges();
      expect(drivingFaultsBadge.count).toBe(1);
    });
  });

  describe('Competency button effects', () => {
    it('should have added no classes to the competency button', () => {
      const competencyButton = fixture.debugElement.query(By.css('.competency-button'));
      expect(competencyButton.nativeElement.className).toEqual('competency-button');
    });

    it('should add the activated class when the button is pressed', () => {
      component.onTouchStart('competency');
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('.competency-button'));

      expect(button).toBeDefined();
      expect(button.nativeElement.className).toContain('activated');
      expect(component.touchState).toBeTruthy();
    });

    it('should remove the activated class after a specified delay when the button is not pressed', (done) => {
      component.onTouchEnd('competency');
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('.competency-button'));
      setTimeout(
        () => {
          fixture.detectChanges();

          expect(button).toBeDefined();
          expect(button.nativeElement.className).not.toContain('activated');
          expect(component.touchState).toBeFalsy();
          done();
        },
        component.touchStateDelay);
    });

    it('should add the ripple effect animation css class', () => {
      component.addOrRemoveFault(true);
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('.competency-button'));

      expect(button).toBeDefined();
      expect(button.nativeElement.className).toContain('ripple-effect');
    });

    it('should remove the ripple effect animation css class within the required time frame', (done) => {
      component.addOrRemoveFault(true);
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('.competency-button'));
      setTimeout(
        () => {
          fixture.detectChanges();

          expect(button).toBeDefined();
          expect(button.nativeElement.className).not.toContain('ripple-effect');
          done();
        },
        component.rippleEffectAnimationDuration);
    });
  });

  describe('Tick button effects', () => {
    it('should have added no classes to the tick button', () => {
      const tickButton = fixture.debugElement.query(By.css('.tick-button'));
      expect(tickButton.nativeElement.className).toEqual('tick-button');
    });

    it('should add the activated class when the button is pressed', () => {
      component.onTouchStart('tick');
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('.tick-button'));

      expect(button).toBeDefined();
      expect(button.nativeElement.className).toContain('activated');
      expect(component.touchStateTick).toBeTruthy();
    });

    it('should remove the activated class after a specified delay when the button is not pressed', (done) => {
      component.onTouchEnd('tick');
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('.tick-button'));
      setTimeout(
        () => {
          fixture.detectChanges();

          expect(button).toBeDefined();
          expect(button.nativeElement.className).not.toContain('activated');
          expect(component.touchStateTick).toBeFalsy();
          done();
        },
        component.touchStateDelay);
    });
  });
});
