import { Injectable } from '@angular/core';
import { forOwn, transform, endsWith } from 'lodash';
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
      ...this.getDrivingFaults(data.drivingFaults),
      ...this.getManoeuvreFaults(data.manoeuvres, CompetencyOutcome.DF),
      ...this.getControlledStopFault(data.controlledStop, CompetencyOutcome.DF),
      ...this.getVehicleCheckDrivingFaults(data.vehicleChecks),
    ];
  }

  private getSeriousFaultsCatB (data: CatBUniqueTypes.TestData)
  : (CommentedCompetency & MultiFaultAssignableCompetency)[] {
    return [
      ...this.getSeriousFaults(data.seriousFaults),
      ...this.getManoeuvreFaults(data.manoeuvres, CompetencyOutcome.S),
      ...this.getControlledStopFault(data.controlledStop, CompetencyOutcome.S),
      ...this.getVehicleCheckSeriousFaults(data.vehicleChecks),
      ...this.getEyesightTestSeriousFault(data.eyesightTest),
    ];
  }

  private getDangerousFaultsCatB(data: CatBUniqueTypes.TestData)
  : (CommentedCompetency & MultiFaultAssignableCompetency)[] {
    return [
      ...this.getDangerousFaults(data.dangerousFaults),
      ...this.getManoeuvreFaults(data.manoeuvres, CompetencyOutcome.D),
      ...this.getControlledStopFault(data.controlledStop, CompetencyOutcome.D),
      ...this.getVehicleCheckDangerousFaults(data.vehicleChecks),
    ];
  }

  // Generic Fault Getters

  private getDrivingFaults (faults: DrivingFaults): (CommentedCompetency & MultiFaultAssignableCompetency)[] {
    const faultsEncountered: (CommentedCompetency & MultiFaultAssignableCompetency)[] = [];
    forOwn(faults, (value: number, key, obj) => {
      if (value > 0 && !key.endsWith('Comments')) {
        const label = key as keyof typeof competencyLabels;
        const comment = obj[`${key}Comments`] || null;
        const drivingFaultSummary: CommentedCompetency & MultiFaultAssignableCompetency = {
          comment,
          competencyIdentifier: key,
          competencyDisplayName: fullCompetencyLabels[label],
          faultCount: value,
          source: CommentSource.SIMPLE,
        };
        faultsEncountered.push(drivingFaultSummary);
      }
    });
    return faultsEncountered.sort((a, b) => b.faultCount - a.faultCount);
  }

  private getDangerousFaults(faults: DangerousFaults): (CommentedCompetency & MultiFaultAssignableCompetency)[] {
    const faultsEncountered: (CommentedCompetency & MultiFaultAssignableCompetency)[] = [];
    forOwn(faults, (value, key, obj) => {
      if (value && !key.endsWith('Comments')) {
        const label = key as keyof typeof competencyLabels;
        const comment = obj[`${key}Comments`] || null;
        const dangerousFault: CommentedCompetency & MultiFaultAssignableCompetency = {
          comment,
          competencyIdentifier: key,
          competencyDisplayName: fullCompetencyLabels[label],
          source: CommentSource.SIMPLE,
          faultCount: 1,
        };
        faultsEncountered.push(dangerousFault);
      }
    });
    return faultsEncountered;
  }

  private getSeriousFaults (faults: SeriousFaults): (CommentedCompetency & MultiFaultAssignableCompetency)[] {
    const faultsEncountered: (CommentedCompetency & MultiFaultAssignableCompetency)[] = [];
    forOwn(faults, (value, key, obj) => {
      if (value && !key.endsWith('Comments')) {
        const label = key as keyof typeof competencyLabels;
        const comment = obj[`${key}Comments`] || null;
        const seriousFault: CommentedCompetency & MultiFaultAssignableCompetency = {
          comment,
          competencyIdentifier: key,
          competencyDisplayName: fullCompetencyLabels[label],
          source: CommentSource.SIMPLE,
          faultCount: 1,
        };
        faultsEncountered.push(seriousFault);
      }
    });
    return faultsEncountered;
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

  private getVehicleCheckDangerousFaults(vehicleChecks: CatBUniqueTypes.VehicleChecks)
  : (CommentedCompetency & MultiFaultAssignableCompetency)[] {
    const result: (CommentedCompetency & MultiFaultAssignableCompetency)[] = [];

    if (!vehicleChecks) {
      return result;
    }
    const competency: CommentedCompetency & MultiFaultAssignableCompetency = {
      comment: vehicleChecks.showMeTellMeComments || '',
      competencyIdentifier: CommentSource.VEHICLE_CHECKS,
      competencyDisplayName: CompetencyDisplayName.SHOW_ME_TELL_ME,
      source: CommentSource.VEHICLE_CHECKS,
      faultCount: 1,

    };
    vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.D && result.push(competency);

    return result;
  }

  private getVehicleCheckSeriousFaults(vehicleChecks: CatBUniqueTypes.VehicleChecks)
  : (CommentedCompetency & MultiFaultAssignableCompetency)[] {
    const result: (CommentedCompetency & MultiFaultAssignableCompetency)[] = [];

    if (!vehicleChecks) {
      return result;
    }
    const competency: CommentedCompetency & MultiFaultAssignableCompetency = {
      comment: vehicleChecks.showMeTellMeComments || '',
      competencyIdentifier: CommentSource.VEHICLE_CHECKS,
      competencyDisplayName: CompetencyDisplayName.SHOW_ME_TELL_ME,
      source: CommentSource.VEHICLE_CHECKS,
      faultCount: 1,
    };
    vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.S && result.push(competency);

    return result;
  }

  private getVehicleCheckDrivingFaults(vehicleChecks: CatBUniqueTypes.VehicleChecks)
  : (CommentedCompetency & MultiFaultAssignableCompetency)[] {
    const result: (CommentedCompetency & MultiFaultAssignableCompetency)[] = [];
    if (!vehicleChecks || !vehicleChecks.showMeQuestion || !vehicleChecks.tellMeQuestion) {
      return result;
    }
    if (vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.D
        || vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.S) {
      return result;
    }

    if (vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.DF
        || vehicleChecks.tellMeQuestion.outcome === CompetencyOutcome.DF) {
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
