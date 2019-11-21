import { Injectable } from '@angular/core';
import { forOwn, transform, endsWith, isBoolean, isNumber } from 'lodash';
import { SeriousFaults, DangerousFaults, EyesightTest, DrivingFaults } from '@dvsa/mes-test-schema/categories/Common';
import { competencyLabels } from '../../pages/test-report/components/competency/competency.constants';
import {
  CommentedCompetency,
  CommentSource,
  MultiFaultAssignableCompetency,
} from '../../shared/models/fault-marking.model';
import { CompetencyDisplayName } from '../../shared/models/competency-display-name';
import { fullCompetencyLabels } from '../../shared/constants/competencies/catb-competencies';
import { CompetencyOutcome } from '../../shared/models/competency-outcome';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { ManoeuvreTypes } from '../../modules/tests/test-data/test-data.constants';
import { manoeuvreCompetencyLabels, manoeuvreTypeLabels } from '../../shared/constants/competencies/catb-manoeuvres';
import { TestCategory } from '../../shared/models/test-category';

@Injectable()
export class FaultListProvider {

  public getDrivingFaultsList(data: Object, category: TestCategory)
  : (CommentedCompetency & MultiFaultAssignableCompetency)[] {
    switch (category) {
      case TestCategory.B:
        return this.getDrivingFaultsCatB(data);
      default:
        return [];
    }
  }

  public getSeriousFaultsList(data: Object, category: TestCategory)
  : (CommentedCompetency & MultiFaultAssignableCompetency)[] {
    switch (category) {
      case TestCategory.B:
        return this.getSeriousFaultsCatB(data);
      default:
        return [];
    }
  }

  public getDangerousFaultsList(data: Object, category: TestCategory)
  : (CommentedCompetency & MultiFaultAssignableCompetency)[] {
    switch (category) {
      case TestCategory.B:
        return this.getDangerousFaultsCatB(data);
      default:
        return [];
    }
  }

  // Get Category B Faults

  private getDrivingFaultsCatB (data: CatBUniqueTypes.TestData)
  : (CommentedCompetency & MultiFaultAssignableCompetency)[] {
    return [
      ...this.getComptencyFaults(data.drivingFaults),
      ...this.getManoeuvreFaults(data.manoeuvres, CompetencyOutcome.DF),
      ...this.getControlledStopFault(data.controlledStop, CompetencyOutcome.DF),
      ...this.getVehicleCheckFaultsCatB(data.vehicleChecks, CompetencyOutcome.DF),
    ];
  }

  private getSeriousFaultsCatB (data: CatBUniqueTypes.TestData)
  : (CommentedCompetency & MultiFaultAssignableCompetency)[] {
    return [
      ...this.getComptencyFaults(data.seriousFaults),
      ...this.getManoeuvreFaults(data.manoeuvres, CompetencyOutcome.S),
      ...this.getControlledStopFault(data.controlledStop, CompetencyOutcome.S),
      ...this.getVehicleCheckFaultsCatB(data.vehicleChecks, CompetencyOutcome.S),
      ...this.getEyesightTestSeriousFault(data.eyesightTest),
    ];
  }

  private getDangerousFaultsCatB(data: CatBUniqueTypes.TestData)
  : (CommentedCompetency & MultiFaultAssignableCompetency)[] {
    return [
      ...this.getComptencyFaults(data.dangerousFaults),
      ...this.getManoeuvreFaults(data.manoeuvres, CompetencyOutcome.D),
      ...this.getControlledStopFault(data.controlledStop, CompetencyOutcome.D),
      ...this.getVehicleCheckFaultsCatB(data.vehicleChecks, CompetencyOutcome.D),
    ];
  }

  // Generic Fault Getters

  private getComptencyFaults(faults: DrivingFaults | SeriousFaults | DangerousFaults) {
    const faultsEncountered: (CommentedCompetency & MultiFaultAssignableCompetency)[] = [];

    forOwn(faults, (value: number, key: string, obj: DrivingFaults| SeriousFaults | DangerousFaults) => {
      const faultCount = this.calculateFaultCount(value);
      if (faultCount > 0  && !key.endsWith('Comments')) {
        const label = key as keyof typeof competencyLabels;
        const comment = obj[`${key}Comments`] || null;
        const faultSummary: CommentedCompetency & MultiFaultAssignableCompetency = {
          comment,
          faultCount,
          competencyIdentifier: key,
          competencyDisplayName: fullCompetencyLabels[label],
          source: CommentSource.SIMPLE,
        };
        faultsEncountered.push(faultSummary);
      }
    });

    return faultsEncountered;
  }

  private calculateFaultCount(value: number | boolean) : number {
    if (isBoolean(value)) {
      return value ? 1 : 0;
    }
    if (isNumber(value)) {
      return value;
    }
    return 0;
  }

  private getEyesightTestSeriousFault (eyesightTest: EyesightTest)
  : (CommentedCompetency & MultiFaultAssignableCompetency)[] {
    if (!eyesightTest || !eyesightTest.seriousFault) {
      return [];
    }
    return [{
      competencyDisplayName: CompetencyDisplayName.EYESIGHT_TEST,
      competencyIdentifier: 'eyesightTest',
      comment: eyesightTest.faultComments || '',
      source: CommentSource.EYESIGHT_TEST,
      faultCount: 1,
    }];
  }

  // Category B Specifc Fault Getters

  private getVehicleCheckFaultsCatB
  (vehicleChecks: CatBUniqueTypes.VehicleChecks, faultType: CompetencyOutcome)
  : (CommentedCompetency & MultiFaultAssignableCompetency)[] {
    const result: (CommentedCompetency & MultiFaultAssignableCompetency)[] = [];

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
      const competency: CommentedCompetency & MultiFaultAssignableCompetency = {
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

  private getControlledStopFault(controlledStop: CatBUniqueTypes.ControlledStop, faultType: CompetencyOutcome)
  : (CommentedCompetency & MultiFaultAssignableCompetency)[] {
    const returnCompetencies: (CommentedCompetency & MultiFaultAssignableCompetency)[] = [];
    if (!controlledStop || controlledStop.fault !== faultType) {
      return returnCompetencies;
    }
    const result: (CommentedCompetency & MultiFaultAssignableCompetency) = {
      competencyDisplayName: CompetencyDisplayName.CONTROLLED_STOP,
      competencyIdentifier: 'controlledStop',
      comment: controlledStop.faultComments || '',
      source: CommentSource.CONTROLLED_STOP,
      faultCount: 1,
    };
    returnCompetencies.push(result);
    return returnCompetencies;
  }

  private getManoeuvreFaults (manoeuvres: CatBUniqueTypes.Manoeuvres, faultType: CompetencyOutcome)
  : (CommentedCompetency & MultiFaultAssignableCompetency)[] {
    const faultsEncountered: (CommentedCompetency & MultiFaultAssignableCompetency)[] = [];
    forOwn(manoeuvres, (manoeuvre, type: ManoeuvreTypes) => {
      const faults = !manoeuvre.selected ? [] : transform(manoeuvre, (result, value, key: string) => {

        if (endsWith(key, 'Fault') && value === faultType) {

          const competencyComment = this.getCompetencyComment(
            key,
            manoeuvre.controlFaultComments,
            manoeuvre.observationFaultComments);

          result.push(this.createManoeuvreFault(key, type, competencyComment));
        }
      }, []);
      faultsEncountered.push(...faults);
    });
    return faultsEncountered;
  }

  private getCompetencyComment(key: string, controlFaultComments: string, observationFaultComments: string) {
    if (key === 'controlFault') {
      return controlFaultComments || '';
    }
    return observationFaultComments || '';
  }

  private createManoeuvreFault(key: string, type: ManoeuvreTypes, competencyComment: string)
  : CommentedCompetency & MultiFaultAssignableCompetency {
    const manoeuvreFaultSummary : CommentedCompetency & MultiFaultAssignableCompetency = {
      comment: competencyComment || '',
      competencyIdentifier: `${type}${manoeuvreCompetencyLabels[key]}` ,
      competencyDisplayName:`${manoeuvreTypeLabels[type]} - ${manoeuvreCompetencyLabels[key]}`,
      source: `${CommentSource.MANOEUVRES}-${type}-${manoeuvreCompetencyLabels[key]}`,
      faultCount: 1,
    };
    return manoeuvreFaultSummary;
  }
}
