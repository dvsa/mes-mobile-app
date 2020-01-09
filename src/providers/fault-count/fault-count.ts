import { Injectable } from '@angular/core';
import { pickBy, get } from 'lodash';
import { CompetencyOutcome } from '../../shared/models/competency-outcome';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { VehicleChecksScore } from '../../shared/models/vehicle-checks-score.model';
import { getCompetencyFaults } from '../../shared/helpers/competency';
import { sumDrivingFaults, sumSeriousFaults, sumDangerousFaults, sumManoeuvreFaults } from './sum-faults';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/common';

@Injectable()
export class FaultCountProvider {

  static getFaultSumCountErrMsg: string = 'Error getting fault sum count';

  public getDrivingFaultSumCount = (category: TestCategory, data: Object): number => {
    if (category === TestCategory.B) return this.getDrivingFaultSumCountCatB(category, data);
    if (category === TestCategory.BE) return this.getDrivingFaultSumCountCatBE(category, data);
    if (category === TestCategory.C) return this.getDrivingFaultSumCountCatC(category, data);
    throw new Error(FaultCountProvider.getFaultSumCountErrMsg);
  }

  public getSeriousFaultSumCount = (category: TestCategory, data: Object): number => {
    if (category === TestCategory.B) return this.getSeriousFaultSumCountCatB(category, data);
    if (category === TestCategory.BE) return this.getSeriousFaultSumCountCatBE(category, data);
    if (category === TestCategory.C) return this.getSeriousFaultSumCountCatC(category, data);
    throw new Error(FaultCountProvider.getFaultSumCountErrMsg);
  }

  public getDangerousFaultSumCount = (category: TestCategory, data: Object): number => {
    if (category === TestCategory.B) return this.getDangerousFaultSumCountCatB(category, data);
    if (category === TestCategory.BE) return this.getDangerousFaultSumCountCatBE(category, data);
    if (category === TestCategory.C) return this.getDangerousFaultSumCountCatC(category, data);
    throw new Error(FaultCountProvider.getFaultSumCountErrMsg);
  }

  public getManoeuvreFaultCount = (category: TestCategory, data: Object, faultType: CompetencyOutcome): number => {
    if (category === TestCategory.B) return sumManoeuvreFaults(data, faultType);
    if (category === TestCategory.BE) return sumManoeuvreFaults(data, faultType);
    if (category === TestCategory.C) return sumManoeuvreFaults(data, faultType);
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

  public getVehicleChecksFaultCountCatBE = (vehicleChecks: CatBEUniqueTypes.VehicleChecks): VehicleChecksScore =>
    this.vehicleChecksFaultSmallMediumTrailerLight(vehicleChecks)
  public getVehicleChecksFaultCountCatC = (vehicleChecks: CatCUniqueTypes.VehicleChecks): VehicleChecksScore =>
    this.vehicleChecksFaultSmallMediumTrailerLight(vehicleChecks)

  // GENERIC: Vehicle Checks
  private vehicleChecksFaultSmallMediumTrailerLight = (vehicleChecks: any) => {
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

  // GENERIC: Driving fault
  private drivingFaultSumCount = (category: TestCategory, testData: any): number => {

    const controlled = 'controlledStop' in testData;
    const uncouple = 'uncoupleRecouple' in testData;
    const vehicleChecksFaultCountCategory = `getVehicleChecksFaultCountCat${category.replace('+', '')}`;

    // The way how we store the driving faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { drivingFaults, manoeuvres, vehicleChecks } = testData;

    let competencyFaults: number = 0;
    getCompetencyFaults(drivingFaults).forEach(fault => competencyFaults = competencyFaults + fault.faultCount);

    const uncoupleRecoupleHasDrivingFault =
      (uncouple && testData.uncoupleRecouple.fault === CompetencyOutcome.DF) ? 1 : 0;

    const controlledStopHasDrivingFault =
      (controlled && testData.controlledStop.fault === CompetencyOutcome.DF) ? 1 : 0;
    
    const manoeuvreFaults = sumManoeuvreFaults(manoeuvres, CompetencyOutcome.DF);
    const veheicleCheckFaults = category === TestCategory.B ? this[vehicleChecksFaultCountCategory](vehicleChecks) : this[vehicleChecksFaultCountCategory](vehicleChecks).drivingFaults;
    const bespokeFaults = testData.controlledStop ? controlledStopHasDrivingFault : uncoupleRecoupleHasDrivingFault;

    return sumDrivingFaults(competencyFaults, manoeuvreFaults, veheicleCheckFaults, bespokeFaults);
  }

  // GENERIC: Serious Fault
  private seriousFaultSumCount = (category: TestCategory, testData: any): number => {

    const controlled = 'controlledStop' in testData;
    const uncouple = 'uncoupleRecouple' in testData;
    const eyesight = 'eyesightTest' in testData;
    const vehicleChecksFaultCountCategory = `getVehicleChecksFaultCountCat${category.replace('+', '')}`;

    // The way how we store serious faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { seriousFaults, manoeuvres, vehicleChecks } = testData;

    const seriousFaultSumOfSimpleCompetencies = Object.keys(pickBy(seriousFaults)).length;

    let vehicleCheckSeriousFaults: number;

    if (category === TestCategory.B) {
      vehicleCheckSeriousFaults =
      (vehicleChecks && vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.S) ? 1 : 0;
    } else {
      vehicleCheckSeriousFaults =
      vehicleChecks ? this[vehicleChecksFaultCountCategory](vehicleChecks).seriousFaults : 0;
    }

    const uncoupleRecoupleSeriousFaults =
      (uncouple && testData.uncoupleRecouple.fault === CompetencyOutcome.S) ? 1 : 0;
    const controlledStopSeriousFaults = (controlled && testData.controlledStop.fault === CompetencyOutcome.S) ? 1 : 0;
    const eyesightTestSeriousFaults = (eyesight && testData.eyesightTest.seriousFault) ? 1 : 0;

    const manoeuvreFaults = sumManoeuvreFaults(manoeuvres, CompetencyOutcome.S);
    const bespokeFaults = controlled ? controlledStopSeriousFaults : uncoupleRecoupleSeriousFaults;

    return sumSeriousFaults(
      seriousFaultSumOfSimpleCompetencies,
      manoeuvreFaults,
      vehicleCheckSeriousFaults,
      eyesightTestSeriousFaults,
      bespokeFaults,
    );
  }

  // GENERIC: Dangerous Fault
  private dangerousFaultSumCount = (category: TestCategory, testData: any): number => {

    const controlled = 'controlledStop' in testData;
    const uncouple = 'uncoupleRecouple' in testData;

    // The way how we store serious faults differs for certain competencies
    // Because of this we need to pay extra attention on summing up all of them
    const { dangerousFaults, manoeuvres, vehicleChecks } = testData;

    const dangerousFaultSumOfSimpleCompetencies = Object.keys(pickBy(dangerousFaults)).length;

    let vehicleCheckDangerousFaults: number;

    if (category === TestCategory.B) {
      vehicleCheckDangerousFaults =
        (vehicleChecks && vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.D) ? 1 : 0;
    } else {
      vehicleCheckDangerousFaults =
        vehicleChecks ? vehicleChecks.showMeQuestions.filter((check) => {
          check.outcome === CompetencyOutcome.D;
        }).length : 0;
    }
    const controlledStopDangerousFaults = (controlled && testData.controlledStop.fault === CompetencyOutcome.D) ? 1 : 0;
    const uncoupleRecoupleDangerousFaults =
      (uncouple && testData.uncoupleRecouple.fault === CompetencyOutcome.D) ? 1 : 0;

    const manoeuvreFaults = sumManoeuvreFaults(manoeuvres, CompetencyOutcome.D);
    const bespokeFaults = controlled ? controlledStopDangerousFaults : uncoupleRecoupleDangerousFaults;

    return sumDangerousFaults(
      dangerousFaultSumOfSimpleCompetencies,
      manoeuvreFaults,
      vehicleCheckDangerousFaults,
      bespokeFaults,
    );
  }

  // CAT B Fault counts
  private getDrivingFaultSumCountCatB =
    (category: TestCategory, data: CatBUniqueTypes.TestData): number => this.drivingFaultSumCount(category, data)
  private getSeriousFaultSumCountCatB =
    (category: TestCategory, data: CatBUniqueTypes.TestData): number => this.seriousFaultSumCount(category, data)
  private getDangerousFaultSumCountCatB =
    (category: TestCategory, data: CatBUniqueTypes.TestData): number => this.dangerousFaultSumCount(category, data)

  // CAT BE Fault counts
  private getDrivingFaultSumCountCatBE =
    (category: TestCategory, data: CatBEUniqueTypes.TestData): number => this.drivingFaultSumCount(category, data)
  private getSeriousFaultSumCountCatBE =
    (category: TestCategory, data: CatBEUniqueTypes.TestData): number => this.seriousFaultSumCount(category, data)
  private getDangerousFaultSumCountCatBE =
    (category: TestCategory, data: CatBEUniqueTypes.TestData): number => this.dangerousFaultSumCount(category, data)

  // CAT C Fault counts
  private getDrivingFaultSumCountCatC =
    (category: TestCategory, data: CatCUniqueTypes.TestData): number => this.drivingFaultSumCount(category, data)
  private getSeriousFaultSumCountCatC =
    (category: TestCategory, data: CatCUniqueTypes.TestData): number => this.seriousFaultSumCount(category, data)
  private getDangerousFaultSumCountCatC =
    (category: TestCategory, data: CatCUniqueTypes.TestData): number => this.dangerousFaultSumCount(category, data)
}
