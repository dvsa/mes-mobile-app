import { pickBy } from 'lodash';
import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { getCompetencyFaults } from '../../../shared/helpers/get-competency-faults';
import { sumManoeuvreArrayFaults } from '../../../shared/helpers/faults';
import { VehicleChecksScore } from '../../../shared/models/vehicle-checks-score.model';

export class FaultCountADIPart2Helper {

  public static getDrivingFaultSumCountCatADIPart2 = (data: CatADI2UniqueTypes.TestData): number => {

    // The way how we store the driving faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { drivingFaults, manoeuvres, controlledStop, vehicleChecks } = data;
    let faultTotal: number = 0;
    getCompetencyFaults(drivingFaults).forEach(fault => faultTotal = faultTotal + fault.faultCount);

    const controlledStopHasDrivingFault = (controlledStop && controlledStop.fault === CompetencyOutcome.DF) ? 1 : 0;

    const result =
      faultTotal +
      sumManoeuvreArrayFaults(manoeuvres, CompetencyOutcome.DF) +
      FaultCountADIPart2Helper.getVehicleChecksFaultCountCatADIPart2(vehicleChecks).drivingFaults +
      controlledStopHasDrivingFault;

    return result;
  }

  public static getSeriousFaultSumCountCatADIPart2 = (data: CatADI2UniqueTypes.TestData): number => {

    // The way how we store serious faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { seriousFaults, manoeuvres, controlledStop, vehicleChecks, eyesightTest } = data;

    const seriousFaultSumOfSimpleCompetencies = Object.keys(pickBy(seriousFaults)).length;
    const controlledStopSeriousFaults = (controlledStop && controlledStop.fault === CompetencyOutcome.S) ? 1 : 0;
    const eyesightTestSeriousFaults = (eyesightTest && eyesightTest.seriousFault) ? 1 : 0;

    console.log('seriousFaults', seriousFaults)
    console.log('manoeuvres', manoeuvres)
    console.log('controlledStop', controlledStop)
    console.log('vehicleChecks', vehicleChecks)
    console.log('eyesightTest', eyesightTest)
    console.log('seriousFaultSumOfSimpleCompetencies', seriousFaultSumOfSimpleCompetencies)

    const result =
      seriousFaultSumOfSimpleCompetencies +
      sumManoeuvreArrayFaults(manoeuvres, CompetencyOutcome.S) +
      FaultCountADIPart2Helper.getVehicleChecksByOutcomeFaultCountCatADIPart2(vehicleChecks, CompetencyOutcome.S) +
      controlledStopSeriousFaults +
      eyesightTestSeriousFaults;

    return result;
  }

  public static getDangerousFaultSumCountCatADIPart2 = (data: CatADI2UniqueTypes.TestData): number => {

    // The way how we store serious faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { dangerousFaults, manoeuvres, controlledStop, vehicleChecks } = data;

    const dangerousFaultSumOfSimpleCompetencies = Object.keys(pickBy(dangerousFaults)).length;
    const controlledStopDangerousFaults = (controlledStop && controlledStop.fault === CompetencyOutcome.D) ? 1 : 0;

    const result =
      dangerousFaultSumOfSimpleCompetencies +
      sumManoeuvreArrayFaults(manoeuvres, CompetencyOutcome.D) +
      FaultCountADIPart2Helper.getVehicleChecksByOutcomeFaultCountCatADIPart2(vehicleChecks, CompetencyOutcome.D) +
      controlledStopDangerousFaults;

    return result;
  }

  public static getVehicleChecksFaultCountCatADIPart2 = (
    vehicleChecks: CatADI2UniqueTypes.VehicleChecks,
  ): VehicleChecksScore => {

    if (!vehicleChecks) {
      return {
        drivingFaults: 0,
        seriousFaults: 0,
      };
    }

    const { tellMeQuestions, showMeQuestions } = vehicleChecks;

    let total = 0;

    if (tellMeQuestions) {
      total += tellMeQuestions.reduce<number>((acc, question) => {
        if (question.outcome === CompetencyOutcome.DF) {
          return acc + 1;
        }
        return acc;
      }, 0);
    }

    if (showMeQuestions) {
      total += showMeQuestions.reduce<number>((acc, question) => {
        if (question.outcome === CompetencyOutcome.DF) {
          return acc + 1;
        }
        return acc;
      }, 0);
    }

    return {
      drivingFaults: total,
      seriousFaults: 0,
    };
  }

  public static getVehicleChecksByOutcomeFaultCountCatADIPart2 = (
    vehicleChecks: CatADI2UniqueTypes.VehicleChecks,
    outcome: CompetencyOutcome,
  ): number => {

    if (!vehicleChecks) {
      return 0;
    }

    const { tellMeQuestions, showMeQuestions } = vehicleChecks;

    let total = 0;

    if (tellMeQuestions) {
      total += tellMeQuestions.reduce<number>((acc, question) => {
        if (question.outcome === outcome) {
          return acc + 1;
        }
        return acc;
      }, 0);
    }

    if (showMeQuestions) {
      total += showMeQuestions.reduce<number>((acc, question) => {
        if (question.outcome === outcome) {
          return acc + 1;
        }
        return acc;
      }, 0);
    }

    return total;
  }

  public static getShowMeFaultCount = (vehicleChecks: CatADI2UniqueTypes.VehicleChecks): VehicleChecksScore => {
    if (!vehicleChecks) {
      return {
        drivingFaults: 0,
        seriousFaults: 0,
      };
    }

    const { showMeQuestions } = vehicleChecks;

    const total = showMeQuestions.reduce<number>((acc, question) => {
      if (question.outcome === CompetencyOutcome.DF) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return {
      drivingFaults: total,
      seriousFaults: 0,
    };
  }

  public static getTellMeFaultCount = (vehicleChecks: CatADI2UniqueTypes.VehicleChecks): VehicleChecksScore => {
    if (!vehicleChecks) {
      return {
        drivingFaults: 0,
        seriousFaults: 0,
      };
    }

    const { tellMeQuestions } = vehicleChecks;

    const total = tellMeQuestions.reduce<number>((acc, question) => {
      if (question.outcome === CompetencyOutcome.DF) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return {
      drivingFaults: total,
      seriousFaults: 0,
    };
  }
}
