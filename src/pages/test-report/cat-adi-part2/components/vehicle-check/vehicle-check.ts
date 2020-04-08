import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../../../shared/models/store.model';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../../modules/tests/test-data/cat-adi-part2/test-data.cat-adi-part2.reducer';
import { getVehicleChecksCatADIPart2 }
  from '../../../../../modules/tests/test-data/cat-adi-part2/test-data.cat-adi-part2.selector';
import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
import { Subscription, merge, Observable } from 'rxjs';
import {
  VehicleChecksAddSeriousFault,
  VehicleChecksAddDangerousFault,
  VehicleChecksRemoveSeriousFault,
  VehicleChecksRemoveDangerousFault,
  ShowMeQuestionAddDrivingFault,
  ShowMeQuestionRemoveDrivingFault,
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

  constructor(
    private store$: Store<StoreModel>,
    private faultCountProvider: FaultCountProvider,
  ) {
  }

  ngOnInit(): void {
    const vehicleChecks$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
      select(getTestData),
      select(getVehicleChecksCatADIPart2),
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
    this.addOrRemoveFault();
  }

  onPress = () => {
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
      console.log('this.showMeQuestionFaultCount', this.showMeQuestionFaultCount);
      this.store$.dispatch(
        new ShowMeQuestionRemoveDrivingFault(this.showMeQuestionFaultCount - 1),
      );
      this.store$.dispatch(new ToggleRemoveFaultMode());
    }
  }

  addFault = (wasPress: boolean): void => {
    if (this.isDangerousMode) {
      this.store$.dispatch(new VehicleChecksAddDangerousFault());
      this.store$.dispatch(new ToggleDangerousFaultMode());
      return;
    }

    if (this.isSeriousMode) {
      this.store$.dispatch(new VehicleChecksAddSeriousFault());
      this.store$.dispatch(new ToggleSeriousFaultMode());
      return;
    }

    if (wasPress) {
      if (this.getDrivingFaultCount() < 4 && this.showMeQuestionFaultCount < 2) {
        this.store$.dispatch(
          new ShowMeQuestionAddDrivingFault(this.showMeQuestionFaultCount),
        );
      }
    }
  }

  getDrivingFaultCount = (): number => {
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
    if (!tellMeQuestions) {
      return false;
    }
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
