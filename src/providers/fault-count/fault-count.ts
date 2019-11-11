import { Injectable } from '@angular/core';
import { pickBy, endsWith, sumBy } from 'lodash';

import { CompetencyOutcome } from '../../shared/models/competency-outcome';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';

@Injectable()
export class FaultCountProvider {

  getDrivingFaultSummaryCount = (data: CatBUniqueTypes.TestData): number => {

    // The way how we store the driving faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { drivingFaults, manoeuvres, controlledStop, vehicleChecks } = data;

    const drivingFaultSumOfSimpleCompetencies =
      Object.values(drivingFaults).reduce((acc, numberOfFaults) => acc + numberOfFaults, 0);

    const controlledStopHasDrivingFault = (controlledStop && controlledStop.fault === CompetencyOutcome.DF) ? 1 : 0;

    const result =
      drivingFaultSumOfSimpleCompetencies +
      this.sumManoeuvreFaults(manoeuvres, CompetencyOutcome.DF) +
      this.sumVehicleCheckFaults(vehicleChecks) +
      controlledStopHasDrivingFault;

    return result;
  }

  getSeriousFaultSummaryCount = (data: CatBUniqueTypes.TestData): number => {

    // The way how we store serious faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { seriousFaults, manoeuvres, controlledStop, vehicleChecks, eyesightTest } = data;

    const seriousFaultSumOfSimpleCompetencies = Object.keys(pickBy(seriousFaults)).length;
    const vehicleCheckSeriousFaults = vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.S ? 1 : 0;
    const controlledStopSeriousFaults = (controlledStop && controlledStop.fault === CompetencyOutcome.S) ? 1 : 0;
    const eyesightTestSeriousFaults = (eyesightTest && eyesightTest.seriousFault) ? 1 : 0;

    const result =
      seriousFaultSumOfSimpleCompetencies +
      this.sumManoeuvreFaults(manoeuvres, CompetencyOutcome.S) +
      vehicleCheckSeriousFaults +
      controlledStopSeriousFaults +
      eyesightTestSeriousFaults;

    return result;
  }

  getDangerousFaultSummaryCount = (data: CatBUniqueTypes.TestData): number => {

    // The way how we store serious faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { dangerousFaults, manoeuvres, controlledStop, vehicleChecks } = data;

    const dangerousFaultSumOfSimpleCompetencies = Object.keys(pickBy(dangerousFaults)).length;
    const vehicleCheckDangerousFaults = vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.D ? 1 : 0;
    const controlledStopDangerousFaults = (controlledStop && controlledStop.fault === CompetencyOutcome.D) ? 1 : 0;

    const result =
      dangerousFaultSumOfSimpleCompetencies +
      this.sumManoeuvreFaults(manoeuvres, CompetencyOutcome.D) +
      vehicleCheckDangerousFaults +
      controlledStopDangerousFaults;

    return result;
  }

  sumVehicleCheckFaults = (vehicleChecks: CatBUniqueTypes.VehicleChecks): number => {
    const { showMeQuestion, tellMeQuestion } = vehicleChecks;

    if (showMeQuestion.outcome === CompetencyOutcome.S || showMeQuestion.outcome === CompetencyOutcome.D) {
      return 0;
    }

    if (showMeQuestion.outcome === CompetencyOutcome.DF || tellMeQuestion.outcome === CompetencyOutcome.DF) {
      return 1;
    }

    return 0;
  }

  sumManoeuvreFaults = (manoeuvres: CatBUniqueTypes.Manoeuvres, faultType: CompetencyOutcome): number => {
    const manoeuvresCollection = Object.values(manoeuvres);
    return sumBy(manoeuvresCollection, (manoeuvre) => {
      if (manoeuvre.selected) {
        const dFkeys = pickBy(manoeuvre, (val, key) => endsWith(key, 'Fault') && val === faultType);
        return Object.keys(dFkeys).length;
      }
    });
  }

}
