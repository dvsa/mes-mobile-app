import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Store, StoreModule } from '@ngrx/store'
import { StoreModel } from '../../../../../shared/models/store.model'
import { IonicModule } from 'ionic-angular'
import { TestCategory } from '../../../../../shared/models/test-category'
import { TickIndicatorComponent } from '../../../../../components/common/tick-indicator/tick-indicator'
import { DrivingFaultsBadgeComponent } from '../../../../../components/common/driving-faults-badge/driving-faults-badge'
import { testsReducer } from '../../../../../modules/tests/tests.reducer'
import { DangerousFaultBadgeComponent } from '../../../../../components/common/dangerous-fault-badge/dangerous-fault-badge'
import { CompetencyButtonComponent } from '../../competency-button/competency-button'
import { testReportReducer } from '../../../test-report.reducer'
import { MockComponent } from 'ng-mocks'
import { SeriousFaultBadgeComponent } from '../../../../../components/common/serious-fault-badge/serious-fault-badge'
import { StartTest } from '../../../../../modules/tests/tests.actions'
import { UncoupleRecoupleComponent } from '../uncouple-recouple'
import {
  ControlledStopAddDrivingFault,
  ControlledStopRemoveFault,
} from '../../../../../modules/tests/test-data/controlled-stop/controlled-stop.actions'
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome'
import { UncoupleRecoupleAddDrivingFault } from '../../../../../modules/tests/test-data/uncouple-recouple/uncouple-recouple.actions'

describe('UncoupleRecoupleComponent', () => {
  let fixture: ComponentFixture<UncoupleRecoupleComponent>;
  let component: UncoupleRecoupleComponent;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UncoupleRecoupleComponent,
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
        fixture = TestBed.createComponent(UncoupleRecoupleComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);
        store$.dispatch(new StartTest(105, TestCategory.BE));
      });
  }));

  describe('Class', () => {

    describe('Add Driving Fault', () => {

      it('should dispatch an UNCOUPLE_RECOUPLE_ADD_DRIVING_FAULT action for press', () => {
        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(true);
        expect(storeDispatchSpy).toHaveBeenCalledWith(
          new UncoupleRecoupleAddDrivingFault());
      });

      it('should not dispatch an UNCOUPLE_RECOUPLE_ADD_DRIVING_FAULT action for tap', () => {
        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(
          new UncoupleRecoupleAddDrivingFault());
      });

      it('should not dispatch an UNCOUPLE_RECOUPLE_ADD_DRIVING_FAULT action if there is already a driving fault', () => {
        component.uncoupleRecoupleOutcome = CompetencyOutcome.DF;
        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(true);
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(
          new UncoupleRecoupleAddDrivingFault());
      });

      // it('should not dispatch an ADD_MANOEUVRE_DRIVING_FAULT action if there is a serious fault', () => {
      //   component.controlledStopOutcome = CompetencyOutcome.S;
      //
      //   const storeDispatchSpy = spyOn(store$, 'dispatch');
      //   component.addOrRemoveFault();
      //
      //   expect(storeDispatchSpy).not.toHaveBeenCalledWith(
      //     new ControlledStopAddDrivingFault());
      // });
      // it('should not dispatch an ADD_MANOEUVRE_DRIVING_FAULT action if serious mode is active', () => {
      //   component.isSeriousMode = true;
      //
      //   const storeDispatchSpy = spyOn(store$, 'dispatch');
      //   component.addOrRemoveFault();
      //
      //   expect(storeDispatchSpy).not.toHaveBeenCalledWith(
      //     new ControlledStopAddDrivingFault());
      // });
      // it('should not dispatch an ADD_MANOEUVRE_DRIVING_FAULT action if there is a dangerous fault', () => {
      //   component.controlledStopOutcome = CompetencyOutcome.D;
      //
      //   const storeDispatchSpy = spyOn(store$, 'dispatch');
      //   component.addOrRemoveFault();
      //
      //   expect(storeDispatchSpy).not.toHaveBeenCalledWith(
      //     new ControlledStopAddDrivingFault());
      // });
      // it('should not dispatch an ADD_MANOEUVRE_DRIVING_FAULT action if dangerous mode is active', () => {
      //   component.isDangerousMode = true;
      //
      //   const storeDispatchSpy = spyOn(store$, 'dispatch');
      //   component.addOrRemoveFault();
      //
      //   expect(storeDispatchSpy).not.toHaveBeenCalledWith(
      //     new ControlledStopAddDrivingFault());
      // });
    });

    describe('removeManoeuvreDrivingFault', () => {
      // it('should dispatch a REMOVE_MANOEUVRE_FAULT action for press', () => {
      //   component.isRemoveFaultMode = true;
      //   component.controlledStopOutcome = CompetencyOutcome.DF;
      //
      //   const storeDispatchSpy = spyOn(store$, 'dispatch');
      //   component.addOrRemoveFault(true);
      //
      //   expect(storeDispatchSpy).toHaveBeenCalledWith(
      //     new ControlledStopRemoveFault());
      //
      // });
      // it('should dispatch a REMOVE_MANOEUVRE_FAULT action for tap', () => {
      //   component.isRemoveFaultMode = true;
      //   component.controlledStopOutcome = CompetencyOutcome.DF;
      //
      //   const storeDispatchSpy = spyOn(store$, 'dispatch');
      //   component.addOrRemoveFault();
      //
      //   expect(storeDispatchSpy).toHaveBeenCalledWith(
      //     new ControlledStopRemoveFault());
      // });
      // it('should not dispatch a REMOVE_MANOEUVRE_FAULT action if in the wrong mode', () => {
      //   component.isRemoveFaultMode = true;
      //   component.isSeriousMode = true;
      //   component.controlledStopOutcome = CompetencyOutcome.D;
      //
      //   const storeDispatchSpy = spyOn(store$, 'dispatch');
      //   component.addOrRemoveFault();
      //
      //   expect(storeDispatchSpy).not.toHaveBeenCalledWith(
      //     new ControlledStopRemoveFault());
      // });
      //
      // it('should dispatch a REMOVE_MANOEUVRE_FAULT action if there is a serious fault', () => {
      //   component.isRemoveFaultMode = true;
      //   component.isSeriousMode = true;
      //   component.controlledStopOutcome = CompetencyOutcome.S;
      //
      //   const storeDispatchSpy = spyOn(store$, 'dispatch');
      //   component.addOrRemoveFault(true);
      //
      //   expect(storeDispatchSpy).toHaveBeenCalledWith(
      //     new ControlledStopRemoveFault());
      // });
      // it('should dispatch a REMOVE_MANOEUVRE_FAULT action if there is a dangerous fault', () => {
      //   component.isRemoveFaultMode = true;
      //   component.isDangerousMode = true;
      //   component.controlledStopOutcome = CompetencyOutcome.D;
      //
      //   const storeDispatchSpy = spyOn(store$, 'dispatch');
      //   component.addOrRemoveFault();
      //
      //   expect(storeDispatchSpy).toHaveBeenCalledWith(
      //     new ControlledStopRemoveFault());
      // });
    });
  });


})
