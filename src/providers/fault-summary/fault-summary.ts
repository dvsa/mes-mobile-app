import { Injectable } from '@angular/core';
import { forOwn, transform, endsWith, get } from 'lodash';
import { EyesightTest, QuestionResult } from '@dvsa/mes-test-schema/categories/common';
import { FaultSummary, CommentSource, CompetencyIdentifiers } from '../../shared/models/fault-marking.model';
import { CompetencyDisplayName } from '../../shared/models/competency-display-name';
import { CompetencyOutcome } from '../../shared/models/competency-outcome';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { ManoeuvreTypes } from '../../modules/tests/test-data/test-data.constants';
import {
  manoeuvreCompetencyLabels as manoeuvreCompetencyLabelsCatB,
  manoeuvreTypeLabels as manoeuvreTypeLabelsCatB,
}
  from '../../shared/constants/competencies/catb-manoeuvres';
import {
  manoeuvreCompetencyLabels as manoeuvreCompetencyLabelsCatBe,
  manoeuvreTypeLabels as manoeuvreTypeLabelsCatBe,
}
  from '../../shared/constants/competencies/catbe-manoeuvres';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { FaultCountProvider } from '../fault-count/fault-count';
import { getCompetencyFaults } from '../../shared/helpers/competency';
// import { Manoeuvre } from '@dvsa/mes-test-schema/categories/B/partial';

@Injectable()
export class FaultSummaryProvider {

  constructor(private faultCountProvider: FaultCountProvider) { }

  public getDrivingFaultsList(data: Object, category: TestCategory): FaultSummary[] {
    switch (category) {
      case TestCategory.B:
        return this.getDrivingFaultsCatB(data);
      case TestCategory.BE:
        return this.getDrivingFaultsCatBE(data);
      default:
        return [];
    }
  }

  public getSeriousFaultsList(data: Object, category: TestCategory): FaultSummary[] {
    switch (category) {
      case TestCategory.B:
        return this.getSeriousFaultsCatB(data);
      case TestCategory.BE:
        return this.getSeriousFaultsCatBE(data);
      default:
        return [];
    }
  }

  public getDangerousFaultsList(data: Object, category: TestCategory): FaultSummary[] {
    switch (category) {
      case TestCategory.B:
        return this.getDangerousFaultsCatB(data);
      case TestCategory.BE:
        return this.getDangerousFaultsCatBE(data);
      default:
        return [];
    }
  }

  private getDrivingFaultsCatB(data: CatBUniqueTypes.TestData): FaultSummary[] {
    return [
      ...getCompetencyFaults(data.drivingFaults),
      ...this.getManoeuvreFaultsCatB(data.manoeuvres, CompetencyOutcome.DF),
      ...this.getControlledStopFault(data.controlledStop, CompetencyOutcome.DF),
      ...this.getVehicleCheckFaultsCatB(data.vehicleChecks, CompetencyOutcome.DF),
    ];
  }

  private getSeriousFaultsCatB(data: CatBUniqueTypes.TestData): FaultSummary[] {
    return [
      ...getCompetencyFaults(data.seriousFaults),
      ...this.getManoeuvreFaultsCatB(data.manoeuvres, CompetencyOutcome.S),
      ...this.getControlledStopFault(data.controlledStop, CompetencyOutcome.S),
      ...this.getVehicleCheckFaultsCatB(data.vehicleChecks, CompetencyOutcome.S),
      ...this.getEyesightTestSeriousFault(data.eyesightTest),
    ];
  }

  private getDangerousFaultsCatB(data: CatBUniqueTypes.TestData): FaultSummary[] {
    return [
      ...getCompetencyFaults(data.dangerousFaults),
      ...this.getManoeuvreFaultsCatB(data.manoeuvres, CompetencyOutcome.D),
      ...this.getControlledStopFault(data.controlledStop, CompetencyOutcome.D),
      ...this.getVehicleCheckFaultsCatB(data.vehicleChecks, CompetencyOutcome.D),
    ];
  }

  private getDrivingFaultsCatBE(data: CatBEUniqueTypes.TestData): FaultSummary[] {
    return [
      ...getCompetencyFaults(data.drivingFaults),
      ...this.getManoeuvreFaultsCatBE(data.manoeuvres, CompetencyOutcome.DF),
      ...this.getUncoupleRecoupleFault(data.uncoupleRecouple, CompetencyOutcome.DF),
      ...this.getVehicleCheckDrivingFaultsCatBE(data.vehicleChecks),
    ];
  }

  private getSeriousFaultsCatBE(data: CatBEUniqueTypes.TestData): FaultSummary[] {
    return [
      ...getCompetencyFaults(data.seriousFaults),
      ...this.getManoeuvreFaultsCatBE(data.manoeuvres, CompetencyOutcome.S),
      ...this.getUncoupleRecoupleFault(data.uncoupleRecouple, CompetencyOutcome.S),
      ...this.getVehicleCheckSeriousFaultsCatBE(data.vehicleChecks),
      ...this.getEyesightTestSeriousFault(data.eyesightTest),
    ];
  }

  private getDangerousFaultsCatBE(data: CatBEUniqueTypes.TestData): FaultSummary[] {
    return [
      ...getCompetencyFaults(data.dangerousFaults),
      ...this.getManoeuvreFaultsCatBE(data.manoeuvres, CompetencyOutcome.D),
      ...this.getUncoupleRecoupleFault(data.uncoupleRecouple, CompetencyOutcome.D),
    ];
  }

  private getEyesightTestSeriousFault(eyesightTest: EyesightTest): FaultSummary[] {
    if (!eyesightTest || !eyesightTest.seriousFault) {
      return [];
    }
    return [{
      competencyDisplayName: CompetencyDisplayName.EYESIGHT_TEST,
      competencyIdentifier: CompetencyIdentifiers.EYESIGHT_TEST,
      comment: eyesightTest.faultComments || '',
      source: CommentSource.EYESIGHT_TEST,
      faultCount: 1,
    }];
  }

  private getControlledStopFault(controlledStop: CatBUniqueTypes.ControlledStop, faultType: CompetencyOutcome)
    : FaultSummary[] {
    const returnCompetencies: FaultSummary[] = [];
    if (!controlledStop || controlledStop.fault !== faultType) {
      return returnCompetencies;
    }
    const result: FaultSummary = {
      competencyDisplayName: CompetencyDisplayName.CONTROLLED_STOP,
      competencyIdentifier: CompetencyIdentifiers.CONTROLLED_STOP,
      comment: controlledStop.faultComments || '',
      source: CommentSource.CONTROLLED_STOP,
      faultCount: 1,
    };
    returnCompetencies.push(result);
    return returnCompetencies;
  }

  private getUncoupleRecoupleFault(uncoupleRecouple: CatBEUniqueTypes.UncoupleRecouple, faultType: CompetencyOutcome)
    : FaultSummary[] {
    const returnCompetencies = [];
    if (!uncoupleRecouple || uncoupleRecouple.fault !== faultType) {
      return returnCompetencies;
    }
    const result: FaultSummary = {
      competencyDisplayName: CompetencyDisplayName.UNCOUPLE_RECOUPLE,
      competencyIdentifier: 'uncoupleRecouple',
      comment: uncoupleRecouple.faultComments || '',
      source: CommentSource.UNCOUPLE_RECOUPLE,
      faultCount: 1,
    };
    returnCompetencies.push(result);
    return returnCompetencies;
  }

  private getCompetencyComment(key: string, controlFaultComments: string, observationFaultComments: string): string {
    if (key === CompetencyIdentifiers.CONTROL_FAULT) {
      return controlFaultComments || '';
    }
    return observationFaultComments || '';
  }

  private createManoeuvreFaultCatB(key: string, type: ManoeuvreTypes, competencyComment: string): FaultSummary {
    const manoeuvreFaultSummary: FaultSummary = {
      comment: competencyComment || '',
      competencyIdentifier: `${type}${manoeuvreCompetencyLabelsCatB[key]}`,
      competencyDisplayName: `${manoeuvreTypeLabelsCatB[type]} - ${manoeuvreCompetencyLabelsCatB[key]}`,
      source: `${CommentSource.MANOEUVRES}-${type}-${manoeuvreCompetencyLabelsCatB[key]}`,
      faultCount: 1,
    };
    return manoeuvreFaultSummary;
  }

  private createManoeuvreFaultCatBe(key: string, type: ManoeuvreTypes, competencyComment: string): FaultSummary {
    const manoeuvreFaultSummary: FaultSummary = {
      comment: competencyComment || '',
      competencyIdentifier: `${type}${manoeuvreCompetencyLabelsCatBe[key]}`,
      competencyDisplayName: `${manoeuvreTypeLabelsCatBe[type]} - ${manoeuvreCompetencyLabelsCatBe[key]}`,
      source: `${CommentSource.MANOEUVRES}-${type}-${manoeuvreCompetencyLabelsCatBe[key]}`,
      faultCount: 1,
    };
    return manoeuvreFaultSummary;
  }

  private getVehicleCheckFaultsCatB(vehicleChecks: CatBUniqueTypes.VehicleChecks, faultType: CompetencyOutcome)
    : FaultSummary[] {
    const result: FaultSummary[] = [];

    if (!vehicleChecks) {
      return result;
    }

    const isValidDangerousFault: boolean =
      faultType === CompetencyOutcome.D &&
      vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.D;

    const isValidSeriousFault: boolean =
      faultType === CompetencyOutcome.S &&
      vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.S;

    const isValidDrivingFault: boolean =
      faultType === CompetencyOutcome.DF &&
      (
        vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.DF ||
        vehicleChecks.tellMeQuestion.outcome === CompetencyOutcome.DF
      );

    if (isValidDangerousFault || isValidSeriousFault || isValidDrivingFault) {
      const competency: FaultSummary = {
        comment: vehicleChecks.showMeTellMeComments || '',
        competencyIdentifier: CommentSource.VEHICLE_CHECKS,
        competencyDisplayName: CompetencyDisplayName.SHOW_ME_TELL_ME,
        source: CommentSource.VEHICLE_CHECKS,
        faultCount: 1,
      };

      result.push(competency);
    }
    return result;
  }

  private getManoeuvreFaultsCatB(manoeuvres: CatBUniqueTypes.Manoeuvres, faultType: CompetencyOutcome)
    : FaultSummary[] {
    const faultsEncountered: FaultSummary[] = [];

    // TODO: Replace any with Manoeuvres and change the transform function
    forOwn(manoeuvres, (manoeuvre: any, type: ManoeuvreTypes) => {
      const faults = !manoeuvre.selected ? [] : transform(manoeuvre, (result, value, key: string) => {

        if (endsWith(key, CompetencyIdentifiers.FAULT_SUFFIX) && value === faultType) {

          const competencyComment = this.getCompetencyComment(
            key,
            manoeuvre.controlFaultComments,
            manoeuvre.observationFaultComments);

          result.push(this.createManoeuvreFaultCatB(key, type, competencyComment));
        }
      }, []);
      faultsEncountered.push(...faults);
    });
    return faultsEncountered;
  }

  private getManoeuvreFaultsCatBE(manoeuvres: CatBEUniqueTypes.Manoeuvres, faultType: CompetencyOutcome)
    : FaultSummary[] {
    const faultsEncountered: FaultSummary[] = [];

    // TODO: Replace any with Manoeuvres and change the transform function
    forOwn(manoeuvres, (manoeuvre: any, type: ManoeuvreTypes) => {
      const faults = !manoeuvre.selected ? [] : transform(manoeuvre, (result, value, key: string) => {

        if (endsWith(key, 'Fault') && value === faultType) {

          const competencyComment = this.getCompetencyComment(
            key,
            manoeuvre.controlFaultComments,
            manoeuvre.observationFaultComments);

          result.push(this.createManoeuvreFaultCatBe(key, type, competencyComment));
        }
      }, []);
      faultsEncountered.push(...faults);
    });
    return faultsEncountered;
  }

  private getVehicleCheckSeriousFaultsCatBE(vehicleChecks: CatBEUniqueTypes.VehicleChecks): FaultSummary[] {
    const result: FaultSummary[] = [];

    if (!vehicleChecks) {
      return result;
    }

    const showMeQuestions: QuestionResult[] = get(vehicleChecks, 'showMeQuestions', []);
    const tellMeQuestions: QuestionResult[] = get(vehicleChecks, 'tellMeQuestions', []);

    const showMeFaults = showMeQuestions.filter(fault => fault.outcome === CompetencyOutcome.DF);
    const tellMeFaults = tellMeQuestions.filter(fault => fault.outcome === CompetencyOutcome.DF);

    const seriousFaultCount = showMeFaults.length + tellMeFaults.length === 5 ? 1 : 0;
    const competency: FaultSummary = {
      comment: vehicleChecks.showMeTellMeComments || '',
      competencyIdentifier: CommentSource.VEHICLE_CHECKS,
      competencyDisplayName: CompetencyDisplayName.VEHICLE_CHECKS,
      source: CommentSource.VEHICLE_CHECKS,
      faultCount: seriousFaultCount,
    };
    seriousFaultCount > 0 && result.push(competency);

    return result;
  }

  private getVehicleCheckDrivingFaultsCatBE(vehicleChecks: CatBEUniqueTypes.VehicleChecks): FaultSummary[] {
    const result: FaultSummary[] = [];
    if (!vehicleChecks || !vehicleChecks.showMeQuestions || !vehicleChecks.tellMeQuestions) {
      return result;
    }

    const dangerousFaults = vehicleChecks.showMeQuestions.filter(fault => fault.outcome === CompetencyOutcome.D);
    const seriousFaults = vehicleChecks.showMeQuestions.filter(fault => fault.outcome === CompetencyOutcome.S);

    if (dangerousFaults.length > 0 || seriousFaults.length > 0) {
      return result;
    }

    const vehicleCheckFaults = this.faultCountProvider.getVehicleChecksFaultCountCatBE(vehicleChecks);
    if (vehicleCheckFaults.drivingFaults > 0) {
      const competency: FaultSummary = {
        comment: vehicleChecks.showMeTellMeComments || '',
        competencyIdentifier: CommentSource.VEHICLE_CHECKS,
        competencyDisplayName: CompetencyDisplayName.VEHICLE_CHECKS,
        source: CommentSource.VEHICLE_CHECKS,
        faultCount: vehicleCheckFaults.drivingFaults,
      };
      result.push(competency);
    }
    return result;
  }
}
