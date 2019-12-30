import { Injectable } from '@angular/core';
import { pickBy, endsWith, sumBy, get } from 'lodash';

import { CompetencyOutcome } from '../../shared/models/competency-outcome';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { VehicleChecksScore } from '../../shared/models/vehicle-checks-score.model';
import { getCompetencyFaults } from '../../shared/helpers/competency';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/Common';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';

@Injectable()
export class FaultCountProvider {

  static getFaultSumCountErrMsg: string = 'Error getting fault sum count';

  public getDrivingFaultSumCount = (category: TestCategory, data: Object): number => {
    if (category === TestCategory.B) return this.getDrivingFaultSumCountCatB(data);
    if (category === TestCategory.BE) return this.getDrivingFaultSumCountCatBE(data);
    if (category === TestCategory.C) return this.getDrivingFaultSumCountCatC(data);
    throw new Error(FaultCountProvider.getFaultSumCountErrMsg);
  }

  public getSeriousFaultSumCount = (category: TestCategory, data: Object): number => {
    if (category === TestCategory.B) return this.getSeriousFaultSumCountCatB(data);
    if (category === TestCategory.BE) return this.getSeriousFaultSumCountCatBE(data);
    if (category === TestCategory.C) return this.getSeriousFaultSumCountCatC(data);
    throw new Error(FaultCountProvider.getFaultSumCountErrMsg);
  }

  public getDangerousFaultSumCount = (category: TestCategory, data: Object): number => {
    if (category === TestCategory.B) return this.getDangerousFaultSumCountCatB(data);
    if (category === TestCategory.BE) return this.getDangerousFaultSumCountCatBE(data);
    if (category === TestCategory.C) return this.getDangerousFaultSumCountCatC(data);
    throw new Error(FaultCountProvider.getFaultSumCountErrMsg);
  }

  public getManoeuvreFaultCount = (category: TestCategory, data: Object, faultType: CompetencyOutcome): number => {
    if (category === TestCategory.B) return this.sumManoeuvreFaults(data, faultType);
    if (category === TestCategory.BE) return this.sumManoeuvreFaults(data, faultType);
    if (category === TestCategory.C) return this.sumManoeuvreFaults(data, faultType);
    throw new Error(FaultCountProvider.getFaultSumCountErrMsg);
  }

  public getVehicleChecksFaultCountCatB = (vehicleChecks: CatBUniqueTypes.VehicleChecks): number => {

    if (!vehicleChecks) {
      return 0;
    }

    const { showMeQuestion, tellMeQuestion } = vehicleChecks;

    if (showMeQuestion.outcome === CompetencyOutcome.S || showMeQuestion.outcome === CompetencyOutcome.D) {
      return 0;
    }

    if (showMeQuestion.outcome === CompetencyOutcome.DF || tellMeQuestion.outcome === CompetencyOutcome.DF) {
      return 1;
    }

    return 0;
  }

  public getVehicleChecksFaultCountCatBE = (vehicleChecks: CatBEUniqueTypes.VehicleChecks): VehicleChecksScore => {

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

  public getVehicleChecksFaultCountCatC = (vehicleChecks: CatCUniqueTypes.VehicleChecks): VehicleChecksScore => {
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

  private getDrivingFaultSumCountCatB = (data: CatBUniqueTypes.TestData): number => {

    // The way how we store the driving faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { drivingFaults, manoeuvres, controlledStop, vehicleChecks } = data;
    let faultTotal: number = 0;
    getCompetencyFaults(drivingFaults).forEach(fault => faultTotal = faultTotal + fault.faultCount);

    const controlledStopHasDrivingFault = (controlledStop && controlledStop.fault === CompetencyOutcome.DF) ? 1 : 0;

    const result =
      faultTotal +
      this.sumManoeuvreFaults(manoeuvres, CompetencyOutcome.DF) +
      this.getVehicleChecksFaultCountCatB(vehicleChecks) +
      controlledStopHasDrivingFault;

    return result;
  }

  private getSeriousFaultSumCountCatB = (data: CatBUniqueTypes.TestData): number => {

    // The way how we store serious faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { seriousFaults, manoeuvres, controlledStop, vehicleChecks, eyesightTest } = data;

    const seriousFaultSumOfSimpleCompetencies = Object.keys(pickBy(seriousFaults)).length;
    const vehicleCheckSeriousFaults =
      (vehicleChecks && vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.S) ? 1 : 0;
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

  private getDangerousFaultSumCountCatB = (data: CatBUniqueTypes.TestData): number => {

    // The way how we store serious faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { dangerousFaults, manoeuvres, controlledStop, vehicleChecks } = data;

    const dangerousFaultSumOfSimpleCompetencies = Object.keys(pickBy(dangerousFaults)).length;
    const vehicleCheckDangerousFaults =
      (vehicleChecks && vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.D) ? 1 : 0;
    const controlledStopDangerousFaults = (controlledStop && controlledStop.fault === CompetencyOutcome.D) ? 1 : 0;

    const result =
      dangerousFaultSumOfSimpleCompetencies +
      this.sumManoeuvreFaults(manoeuvres, CompetencyOutcome.D) +
      vehicleCheckDangerousFaults +
      controlledStopDangerousFaults;

    return result;
  }

  private getDrivingFaultSumCountCatBE = (data: CatBEUniqueTypes.TestData): number => {

    // The way how we store the driving faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { drivingFaults, manoeuvres, vehicleChecks, uncoupleRecouple } = data;

    let faultTotal: number = 0;
    getCompetencyFaults(drivingFaults).forEach(fault => faultTotal = faultTotal + fault.faultCount);
    const uncoupleRecoupleHasDrivingFault =
      (uncoupleRecouple && uncoupleRecouple.fault === CompetencyOutcome.DF) ? 1 : 0;

    const result =
      faultTotal +
      this.sumManoeuvreFaults(manoeuvres, CompetencyOutcome.DF) +
      this.getVehicleChecksFaultCountCatBE(vehicleChecks).drivingFaults +
      uncoupleRecoupleHasDrivingFault;

    return result;
  }

  private getDrivingFaultSumCountCatC = (data: CatCUniqueTypes.TestData): number => {

    // The way how we store the driving faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { drivingFaults, manoeuvres, vehicleChecks } = data;

    let faultTotal: number = 0;
    getCompetencyFaults(drivingFaults).forEach(fault => faultTotal = faultTotal + fault.faultCount);

    const result =
      faultTotal +
      this.sumManoeuvreFaults(manoeuvres, CompetencyOutcome.DF) +
      this.getVehicleChecksFaultCountCatC(vehicleChecks).drivingFaults;

    return result;
  }

  private getSeriousFaultSumCountCatBE = (data: CatBEUniqueTypes.TestData): number => {

    // The way how we store serious faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { seriousFaults, manoeuvres, vehicleChecks, uncoupleRecouple, eyesightTest } = data;

    const seriousFaultSumOfSimpleCompetencies = Object.keys(pickBy(seriousFaults)).length;
    const vehicleCheckSeriousFaults =
      vehicleChecks ? this.getVehicleChecksFaultCountCatBE(vehicleChecks).seriousFaults : 0;
    const uncoupleRecoupleSeriousFaults =
      (uncoupleRecouple && uncoupleRecouple.fault === CompetencyOutcome.S) ? 1 : 0;
    const eyesightTestSeriousFaults = (eyesightTest && eyesightTest.seriousFault) ? 1 : 0;

    const result =
      seriousFaultSumOfSimpleCompetencies +
      this.sumManoeuvreFaults(manoeuvres, CompetencyOutcome.S) +
      vehicleCheckSeriousFaults +
      eyesightTestSeriousFaults +
      uncoupleRecoupleSeriousFaults;

    return result;
  }

  private getSeriousFaultSumCountCatC = (data: CatCUniqueTypes.TestData): number => {

    // The way how we store serious faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { seriousFaults, manoeuvres, vehicleChecks } = data;

    const seriousFaultSumOfSimpleCompetencies = Object.keys(pickBy(seriousFaults)).length;
    const vehicleCheckSeriousFaults =
      vehicleChecks ? this.getVehicleChecksFaultCountCatBE(vehicleChecks).seriousFaults : 0;

    const result =
      seriousFaultSumOfSimpleCompetencies +
      this.sumManoeuvreFaults(manoeuvres, CompetencyOutcome.S) +
      vehicleCheckSeriousFaults;

    return result;
  }

  private getDangerousFaultSumCountCatBE = (data: CatBEUniqueTypes.TestData): number => {

    // The way how we store serious faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { dangerousFaults, manoeuvres, vehicleChecks, uncoupleRecouple } = data;

    const dangerousFaultSumOfSimpleCompetencies = Object.keys(pickBy(dangerousFaults)).length;
    const vehicleCheckDangerousFaults = vehicleChecks ? vehicleChecks.showMeQuestions.filter((check) => {
      check.outcome === CompetencyOutcome.D;
    }).length : 0;
    const uncoupleRecoupleDangerousFaults =
      (uncoupleRecouple && uncoupleRecouple.fault === CompetencyOutcome.D) ? 1 : 0;

    const result =
      dangerousFaultSumOfSimpleCompetencies +
      this.sumManoeuvreFaults(manoeuvres, CompetencyOutcome.D) +
      vehicleCheckDangerousFaults +
      uncoupleRecoupleDangerousFaults;

    return result;
  }

  private getDangerousFaultSumCountCatC = (data: CatCUniqueTypes.TestData): number => {

    // The way how we store serious faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { dangerousFaults, manoeuvres, vehicleChecks } = data;

    const dangerousFaultSumOfSimpleCompetencies = Object.keys(pickBy(dangerousFaults)).length;
    const vehicleCheckDangerousFaults = vehicleChecks ? vehicleChecks.showMeQuestions.filter((check) => {
      check.outcome === CompetencyOutcome.D;
    }).length : 0;

    const result =
      dangerousFaultSumOfSimpleCompetencies +
      this.sumManoeuvreFaults(manoeuvres, CompetencyOutcome.D) +
      vehicleCheckDangerousFaults;

    return result;
  }
  private sumManoeuvreFaults(manoeuvres: Object, faultType: CompetencyOutcome): number {
    if (!manoeuvres) {
      return 0;
    }

    const manoeuvresCollection = Object.values(manoeuvres);
    return sumBy(manoeuvresCollection, (manoeuvre) => {
      if (manoeuvre.selected) {
        const dFkeys = pickBy(manoeuvre, (val, key) => endsWith(key, 'Fault') && val === faultType);
        return Object.keys(dFkeys).length;
      }
      return 0;
    });
  }

}
