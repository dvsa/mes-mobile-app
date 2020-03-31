import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../../../shared/models/store.model';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
// TO-DO ADI Part2: implement correct category
import { getTestData } from '../../../../../modules/tests/test-data/cat-b/test-data.reducer';
// TO-DO ADI Part2: implement correct category
import { getVehicleChecks } from '../../../../../modules/tests/test-data/cat-b/test-data.cat-b.selector';
// TO-DO ADI Part2: implement correct category
import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
import { Subscription, merge, Observable } from 'rxjs';
import {
  ShowMeQuestionDrivingFault,
  VehicleChecksSeriousFault,
  VehicleChecksDangerousFault,
  VehicleChecksRemoveSeriousFault,
  VehicleChecksRemoveDangerousFault,
  ShowMeQuestionPassed,
} from '../../../../../modules/tests/test-data/cat-adi-part2/vehicle-checks/vehicle-checks.cat-adi-part2.action';
import { ToggleSeriousFaultMode, ToggleDangerousFaultMode, ToggleRemoveFaultMode } from '../../../test-report.actions';
import { getTestReportState } from '../../../test-report.reducer';
import { isSeriousMode, isDangerousMode, isRemoveFaultMode } from '../../../test-report.selector';
import { map } from 'rxjs/operators';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

@Component({
  selector: 'vehicle-check',
  templateUrl: 'vehicle-check.html',
})
export class VehicleCheckComponent implements OnInit, OnDestroy {

  selectedShowMeQuestion: boolean = false;
  showMeQuestionFaultCount: number;
  tellMeQuestionFaultCount: number;

  vehicleChecks: CatADI2UniqueTypes.VehicleChecks;

  isRemoveFaultMode: boolean = false;
  isSeriousMode: boolean = false;
  isDangerousMode: boolean = false;

  merged$: Observable<void | boolean>;

  subscription: Subscription;

  faultCountProvider: FaultCountProvider;

  constructor(
    private store$: Store<StoreModel>,
  ) { }

  ngOnInit(): void {

    this.faultCountProvider = new FaultCountProvider();

    const vehicleChecks$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
      select(getTestData),
      select(getVehicleChecks),
    );

    const isSeriousMode$ = this.store$.pipe(
      select(getTestReportState),
      select(isSeriousMode),
    );

    const isDangerousMode$ = this.store$.pipe(
      select(getTestReportState),
      select(isDangerousMode),
    );

    const isRemoveFaultMode$ = this.store$.pipe(
      select(getTestReportState),
      select(isRemoveFaultMode),
    );

    this.subscription = merge(
      vehicleChecks$.pipe(map((vehicleChecks: CatADI2UniqueTypes.VehicleChecks) => {
        this.vehicleChecks = vehicleChecks;
        this.tellMeQuestionFaultCount = this.faultCountProvider.getVehicleChecksFaultCount(
          TestCategory.ADI2,
          { tellMeQuestions: vehicleChecks.tellMeQuestions },
        ).drivingFaults;
        this.showMeQuestionFaultCount = this.faultCountProvider.getVehicleChecksFaultCount(
          TestCategory.ADI2,
          { showMeQuestions: vehicleChecks.showMeQuestions },
        ).drivingFaults;
      })),
      isSeriousMode$.pipe(map(toggle => this.isSeriousMode = toggle)),
      isDangerousMode$.pipe(map(toggle => this.isDangerousMode = toggle)),
      isRemoveFaultMode$.pipe(map(toggle => this.isRemoveFaultMode = toggle)),
    ).subscribe();

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onTap = () => {
    'tap';
    this.addOrRemoveFault();
  }

  onPress = () => {
    'press';
    this.addOrRemoveFault(true);
  }

  toggleShowMeQuestion = (): void => {
    if (this.hasSeriousFault() || this.hasDangerousFault()) {
      return;
    }

    if (this.selectedShowMeQuestion) {
      this.selectedShowMeQuestion = false;
      return;
    }

    this.selectedShowMeQuestion = true;
  }

  canButtonRipple = () => {
    if (this.isRemoveFaultMode) {
      if (this.hasDangerousFault() && this.isDangerousMode) {
        return true;
      }

      if (this.hasSeriousFault() && this.isSeriousMode) {
        return true;
      }

      if (this.hasShowMeDrivingFault() && !this.isSeriousMode && !this.isDangerousMode) {
        return true;
      }

      return false;
    }

    return !(this.hasDangerousFault() || this.hasSeriousFault() || this.hasShowMeDrivingFault());
  }

  addOrRemoveFault = (wasPress: boolean = false): void => {
    if (this.isRemoveFaultMode) {
      this.removeFault();
      return;
    }

    this.addFault(wasPress);
  }

  removeFault = (): void => {
    if (this.hasDangerousFault() && this.isDangerousMode && this.isRemoveFaultMode) {
      this.store$.dispatch(new VehicleChecksRemoveDangerousFault());
      this.store$.dispatch(new ToggleDangerousFaultMode());
      this.store$.dispatch(new ToggleRemoveFaultMode());
      return;
    }

    if (this.hasSeriousFault() && this.isSeriousMode && this.isRemoveFaultMode) {
      this.store$.dispatch(new VehicleChecksRemoveSeriousFault());
      this.store$.dispatch(new ToggleSeriousFaultMode());
      this.store$.dispatch(new ToggleRemoveFaultMode());
      return;
    }

    if (!this.isSeriousMode && !this.isDangerousMode && this.isRemoveFaultMode && this.hasShowMeDrivingFault()) {
      this.store$.dispatch(new ShowMeQuestionPassed());
      this.store$.dispatch(new ToggleRemoveFaultMode());
    }
  }

  addFault = (wasPress: boolean): void => {
    if (this.isDangerousMode) {
      this.store$.dispatch(new VehicleChecksDangerousFault());
      this.store$.dispatch(new ToggleDangerousFaultMode());
      return;
    }

    if (this.isSeriousMode) {
      this.store$.dispatch(new VehicleChecksSeriousFault());
      this.store$.dispatch(new ToggleSeriousFaultMode());
      return;
    }

    if (wasPress) {
      this.store$.dispatch(new ShowMeQuestionDrivingFault());
    }
  }

  getDrivingFaultCount = (): number => {
    if (this.hasDangerousFault() || this.hasSeriousFault()) {
      return 0;
    }

    if (this.hasShowMeDrivingFault() || this.hasTellMeDrivingFault()) {
      return this.showMeQuestionFaultCount + this.tellMeQuestionFaultCount;
    }

    return 0;
  }

  hasShowMeDrivingFault = (): boolean => {
    const showMeQuestions = this.vehicleChecks.showMeQuestions;
    if (!showMeQuestions) {
      return false;
    }
    return showMeQuestions.some((e) => {
      if (!e) {
        return false;
      }
      return e.outcome === CompetencyOutcome.DF;
    });
  }

  hasTellMeDrivingFault = (): boolean => {
    const tellMeQuestions = this.vehicleChecks.tellMeQuestions;
    return tellMeQuestions.some((e) => {
      if (!e) {
        return false;
      }
      return e.outcome === CompetencyOutcome.DF;
    });
  }

  hasSeriousFault = (): boolean => {
    return this.vehicleChecks.seriousFault;
  }

  hasDangerousFault = (): boolean => {
    return this.vehicleChecks.dangerousFault;
  }
}
