import { pickBy, get } from 'lodash';
import { QuestionResult, SafetyQuestionResult } from '@dvsa/mes-test-schema/categories/common';
import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';
import { CatD1UniqueTypes } from '@dvsa/mes-test-schema/categories/D1';
import { CatDEUniqueTypes } from '@dvsa/mes-test-schema/categories/DE';
import { CatD1EUniqueTypes } from '@dvsa/mes-test-schema/categories/D1E';
import { sumManoeuvreFaults } from '../../../shared/helpers/faults';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { VehicleChecksScore } from '../../../shared/models/vehicle-checks-score.model';
import { SafetyQuestionsScore } from '../../../shared/models/safety-questions-score.model';
import { getCompetencyFaults } from '../../../shared/helpers/competency';

export class FaultCountDHelper {

  public static getDangerousFaultSumCountCatD = (data: CatDUniqueTypes.TestData): number => {
    return FaultCountDHelper.getDangerousFaultSumCountNonTrailer(data);
  }

  public static getDangerousFaultSumCountCatDE = (data: CatDEUniqueTypes.TestData): number => {
    return FaultCountDHelper.getDangerousFaultSumCountTrailer(data);
  }

  public static getDangerousFaultSumCountCatD1E = (data: CatD1EUniqueTypes.TestData): number => {
    return FaultCountDHelper.getDangerousFaultSumCountTrailer(data);
  }

  public static getDangerousFaultSumCountCatD1 = (data: CatD1UniqueTypes.TestData): number => {
    return FaultCountDHelper.getDangerousFaultSumCountNonTrailer(data);
  }

  public static getVehicleChecksFaultCountCatD = (
    vehicleChecks: CatDUniqueTypes.VehicleChecks,
  ): VehicleChecksScore => {
    return FaultCountDHelper.getVehicleChecksFaultCountNonTrailer(vehicleChecks);
  }

  public static getVehicleChecksFaultCountCatDE = (
    vehicleChecks: CatDEUniqueTypes.VehicleChecks,
  ): VehicleChecksScore => {
    return FaultCountDHelper.getVehicleChecksFaultCountTrailer(vehicleChecks);
  }

  public static getVehicleChecksFaultCountCatD1 = (
    vehicleChecks: CatD1UniqueTypes.VehicleChecks,
  ): VehicleChecksScore => {
    return FaultCountDHelper.getVehicleChecksFaultCountNonTrailer(vehicleChecks);
  }

  public static getVehicleChecksFaultCountCatD1E = (
    vehicleChecks: CatD1EUniqueTypes.VehicleChecks,
  ): VehicleChecksScore => {
    return FaultCountDHelper.getVehicleChecksFaultCountTrailer(vehicleChecks);
  }

  public static getSafetyQuestionsFaultCountCatD = (
    safetyQuestions: CatDUniqueTypes.SafetyQuestions,
  ): SafetyQuestionsScore => {
    return FaultCountDHelper.getSafetyQuestionsFaultCount(safetyQuestions);
  }

  public static getSeriousFaultSumCountCatD = (data: CatDUniqueTypes.TestData): number => {
    return FaultCountDHelper.getSeriousFaultSumCountNonTrailer(data);
  }

  public static getSeriousFaultSumCountCatD1 = (data: CatD1UniqueTypes.TestData): number => {
    return FaultCountDHelper.getSeriousFaultSumCountNonTrailer(data);
  }

  public static getSeriousFaultSumCountCatDE = (data: CatDEUniqueTypes.TestData): number => {
    return FaultCountDHelper.getSeriousFaultSumCountTrailer(data);
  }

  public static getSeriousFaultSumCountCatD1E = (data: CatD1EUniqueTypes.TestData): number => {
    return FaultCountDHelper.getSeriousFaultSumCountTrailer(data);
  }

  public static getDrivingFaultSumCountCatD = (data: CatDUniqueTypes.TestData): number => {
    return FaultCountDHelper.getDrivingFaultSumCountNonTrailer(data);
  }

  public static getDrivingFaultSumCountCatD1 = (data: CatD1UniqueTypes.TestData): number => {
    return FaultCountDHelper.getDrivingFaultSumCountNonTrailer(data);
  }

  public static getDrivingFaultSumCountCatDE = (data: CatDEUniqueTypes.TestData): number => {
    return FaultCountDHelper.getDrivingFaultSumCountTrailer(data);
  }

  public static getDrivingFaultSumCountCatD1E = (data: CatD1EUniqueTypes.TestData): number => {
    return FaultCountDHelper.getDrivingFaultSumCountTrailer(data);
  }

  private static getVehicleChecksFaultCountNonTrailer = (
    vehicleChecks: CatDUniqueTypes.VehicleChecks | CatD1EUniqueTypes.VehicleChecks,
  ): VehicleChecksScore => {

    if (!vehicleChecks) {
      return { seriousFaults: 0, drivingFaults: 0 };
    }

    const showMeQuestions: QuestionResult[] = get(vehicleChecks, 'showMeQuestions', []);
    const tellMeQuestions: QuestionResult[] = get(vehicleChecks, 'tellMeQuestions', []);

    const numberOfShowMeFaults: number = showMeQuestions.filter((showMeQuestion) => {
      return showMeQuestion.outcome === CompetencyOutcome.DF;
    }).length;
    const numberOfTellMeFaults: number = tellMeQuestions.filter((tellMeQuestion) => {
      return tellMeQuestion.outcome === CompetencyOutcome.DF;
    }).length;

    const totalFaultCount: number = numberOfShowMeFaults + numberOfTellMeFaults;

    if (totalFaultCount === 5) {
      return {
        drivingFaults: 4,
        seriousFaults: 1,
      };
    }
    return {
      drivingFaults: totalFaultCount,
      seriousFaults: 0,
    };
  }

  private static getVehicleChecksFaultCountTrailer = (
    vehicleChecks: CatDEUniqueTypes.VehicleChecks | CatD1EUniqueTypes.VehicleChecks,
  ): VehicleChecksScore => {

    if (!vehicleChecks) {
      return { seriousFaults: 0, drivingFaults: 0 };
    }

    const showMeQuestions: QuestionResult[] = get(vehicleChecks, 'showMeQuestions', []);
    const tellMeQuestions: QuestionResult[] = get(vehicleChecks, 'tellMeQuestions', []);

    const numberOfShowMeFaults: number = showMeQuestions.filter((showMeQuestion) => {
      return showMeQuestion.outcome === CompetencyOutcome.DF;
    }).length;
    const numberOfTellMeFaults: number = tellMeQuestions.filter((tellMeQuestion) => {
      return tellMeQuestion.outcome === CompetencyOutcome.DF;
    }).length;

    const totalFaultCount: number = numberOfShowMeFaults + numberOfTellMeFaults;

    if (totalFaultCount === 2) {
      return {
        drivingFaults: 1,
        seriousFaults: 1,
      };
    }
    return {
      drivingFaults: totalFaultCount,
      seriousFaults: 0,
    };
  }

  private static getDrivingFaultSumCountNonTrailer = (
    data: CatDUniqueTypes.TestData | CatD1UniqueTypes.TestData,
  ): number => {

    // The way how we store the driving faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { drivingFaults, manoeuvres, vehicleChecks } = data;

    let faultTotal: number = 0;
    getCompetencyFaults(drivingFaults).forEach(fault => faultTotal = faultTotal + fault.faultCount);

    const result =
      faultTotal +
      sumManoeuvreFaults(manoeuvres, CompetencyOutcome.DF) +
      FaultCountDHelper.getVehicleChecksFaultCountCatD(vehicleChecks).drivingFaults;

    return result;
  }

  private static getDrivingFaultSumCountTrailer = (
    data: CatDEUniqueTypes.TestData | CatD1EUniqueTypes.TestData,
  ): number => {

    // The way how we store the driving faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { drivingFaults, manoeuvres, vehicleChecks, uncoupleRecouple } = data;

    let faultTotal: number = 0;
    getCompetencyFaults(drivingFaults).forEach(fault => faultTotal = faultTotal + fault.faultCount);
    const uncoupleRecoupleHasDrivingFault =
      (uncoupleRecouple && uncoupleRecouple.fault === CompetencyOutcome.DF) ? 1 : 0;

    const result =
      faultTotal +
      sumManoeuvreFaults(manoeuvres, CompetencyOutcome.DF) +
      FaultCountDHelper.getVehicleChecksFaultCountCatD(vehicleChecks).drivingFaults +
      uncoupleRecoupleHasDrivingFault;

    return result;
  }

  private static getSeriousFaultSumCountNonTrailer = (
    data: CatDUniqueTypes.TestData | CatD1UniqueTypes.TestData,
  ): number => {

    // The way how we store serious faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { seriousFaults, manoeuvres, vehicleChecks } = data;

    const seriousFaultSumOfSimpleCompetencies = Object.keys(pickBy(seriousFaults)).length;
    const vehicleCheckSeriousFaults =
      vehicleChecks ? FaultCountDHelper.getVehicleChecksFaultCountCatD(vehicleChecks).seriousFaults : 0;

    const result =
      seriousFaultSumOfSimpleCompetencies +
      sumManoeuvreFaults(manoeuvres, CompetencyOutcome.S) +
      vehicleCheckSeriousFaults;

    return result;
  }

  private static getSeriousFaultSumCountTrailer = (
    data: CatDEUniqueTypes.TestData | CatD1EUniqueTypes.TestData,
  ): number => {

    // The way how we store serious faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { seriousFaults, manoeuvres, vehicleChecks, uncoupleRecouple } = data;

    const seriousFaultSumOfSimpleCompetencies = Object.keys(pickBy(seriousFaults)).length;
    const vehicleCheckSeriousFaults =
      vehicleChecks ? FaultCountDHelper.getVehicleChecksFaultCountCatD(vehicleChecks).seriousFaults : 0;
    const uncoupleRecoupleSeriousFaults =
      (uncoupleRecouple && uncoupleRecouple.fault === CompetencyOutcome.S) ? 1 : 0;

    const result =
      seriousFaultSumOfSimpleCompetencies +
      sumManoeuvreFaults(manoeuvres, CompetencyOutcome.S) +
      vehicleCheckSeriousFaults +
      uncoupleRecoupleSeriousFaults;

    return result;
  }

  private static getDangerousFaultSumCountNonTrailer = (
    data: CatDUniqueTypes.TestData | CatD1UniqueTypes.TestData,
  ): number => {

    // The way how we store serious faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { dangerousFaults, manoeuvres } = data;

    const dangerousFaultSumOfSimpleCompetencies = Object.keys(pickBy(dangerousFaults)).length;

    const result =
      dangerousFaultSumOfSimpleCompetencies +
      sumManoeuvreFaults(manoeuvres, CompetencyOutcome.D);

    return result;
  }

  private static getDangerousFaultSumCountTrailer = (
    data: CatDEUniqueTypes.TestData | CatD1EUniqueTypes.TestData,
  ): number => {

    // The way how we store serious faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { dangerousFaults, manoeuvres, uncoupleRecouple } = data;

    const dangerousFaultSumOfSimpleCompetencies = Object.keys(pickBy(dangerousFaults)).length;
    const uncoupleRecoupleDangerousFaults =
      (uncoupleRecouple && uncoupleRecouple.fault === CompetencyOutcome.D) ? 1 : 0;

    const result =
      dangerousFaultSumOfSimpleCompetencies +
      sumManoeuvreFaults(manoeuvres, CompetencyOutcome.D) +
      uncoupleRecoupleDangerousFaults;

    return result;
  }

  private static getSafetyQuestionsFaultCount = (
    safetyQuestions: CatDUniqueTypes.SafetyQuestions,
  ): SafetyQuestionsScore => {

    if (!safetyQuestions) {
      return { drivingFaults: 0 };
    }

    const getFaults = (safetyQuestion: SafetyQuestionResult): boolean => {
      return safetyQuestion.outcome === CompetencyOutcome.DF;
    };

    const fault: SafetyQuestionsScore =
      safetyQuestions.questions.some(getFaults) ? { drivingFaults: 1 } : { drivingFaults: 0 };

    return fault;
  }
}
