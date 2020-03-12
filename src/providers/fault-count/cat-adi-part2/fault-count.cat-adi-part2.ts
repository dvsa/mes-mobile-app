import { pickBy } from 'lodash';
import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { getCompetencyFaults } from '../../../shared/helpers/get-competency-faults';
import { sumManoeuvreFaults } from '../../../shared/helpers/faults';

export class FaultCountADIPart2Helper {

  // TODO(ADI2): Complete implementation in MES-2833
  public static getDrivingFaultSumCountCatADIPart2 = (data: CatADI2UniqueTypes.TestData): number => {

    // The way how we store the driving faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { drivingFaults, manoeuvres, controlledStop/*, vehicleChecks*/ } = data;
    let faultTotal: number = 0;
    getCompetencyFaults(drivingFaults).forEach(fault => faultTotal = faultTotal + fault.faultCount);

    const controlledStopHasDrivingFault = (controlledStop && controlledStop.fault === CompetencyOutcome.DF) ? 1 : 0;

    const result =
      faultTotal +
      sumManoeuvreFaults(manoeuvres, CompetencyOutcome.DF) +
      // FaultCountADIPart2Helper.getVehicleChecksFaultCountCatB(vehicleChecks) +
      controlledStopHasDrivingFault;

    return result;
  }

  // TODO(ADI2): Complete implementation in MES-2833
  public static getSeriousFaultSumCountCatADIPart2 = (data: CatADI2UniqueTypes.TestData): number => {

    // The way how we store serious faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { seriousFaults, manoeuvres, controlledStop, /*vehicleChecks, */eyesightTest } = data;

    const seriousFaultSumOfSimpleCompetencies = Object.keys(pickBy(seriousFaults)).length;
    // const vehicleCheckSeriousFaults =
    //   (vehicleChecks && vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.S) ? 1 : 0;
    const controlledStopSeriousFaults = (controlledStop && controlledStop.fault === CompetencyOutcome.S) ? 1 : 0;
    const eyesightTestSeriousFaults = (eyesightTest && eyesightTest.seriousFault) ? 1 : 0;

    const result =
      seriousFaultSumOfSimpleCompetencies +
      sumManoeuvreFaults(manoeuvres, CompetencyOutcome.S) +
      // vehicleCheckSeriousFaults +
      controlledStopSeriousFaults +
      eyesightTestSeriousFaults;

    return result;
  }

  // TODO(ADI2): Complete implementation in MES-2833
  public static getDangerousFaultSumCountCatADIPart2 = (data: CatADI2UniqueTypes.TestData): number => {

    // The way how we store serious faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { dangerousFaults, manoeuvres, controlledStop/*, vehicleChecks*/ } = data;

    const dangerousFaultSumOfSimpleCompetencies = Object.keys(pickBy(dangerousFaults)).length;
    // const vehicleCheckDangerousFaults =
    //   (vehicleChecks && vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.D) ? 1 : 0;
    const controlledStopDangerousFaults = (controlledStop && controlledStop.fault === CompetencyOutcome.D) ? 1 : 0;

    const result =
      dangerousFaultSumOfSimpleCompetencies +
      sumManoeuvreFaults(manoeuvres, CompetencyOutcome.D) +
      // vehicleCheckDangerousFaults +
      controlledStopDangerousFaults;

    return result;
  }

  // TODO(ADI2): Complete implementation in MES-2833
  public static getVehicleChecksFaultCountCatADIPart2 = (vehicleChecks: CatADI2UniqueTypes.VehicleChecks): number => {

    if (!vehicleChecks) {
      return 0;
    }

    const { tellMeQuestions } = vehicleChecks;

    const total = tellMeQuestions.reduce<number>((acc, question) => {
      if (question.outcome === CompetencyOutcome.DF) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return total;
  }

}
