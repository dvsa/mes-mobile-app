import { Injectable } from '@angular/core';
import { get } from 'lodash';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { CatC1UniqueTypes } from '@dvsa/mes-test-schema/categories/C1';
import { CatC1EUniqueTypes } from '@dvsa/mes-test-schema/categories/C1E';
import { CatCEUniqueTypes } from '@dvsa/mes-test-schema/categories/CE';
import { FaultCountProvider } from '../fault-count/fault-count';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { TestData } from '@dvsa/mes-test-schema/categories/common';
import { TestData as CatAMod1TestData } from '@dvsa/mes-test-schema/categories/AM1';
import { TestData as CatAMod2TestData } from '@dvsa/mes-test-schema/categories/AM2';
import {
  hasManoeuvreBeenCompletedCatB,
  hasVehicleChecksBeenCompletedCatB,
} from '../../modules/tests/test-data/cat-b/test-data.cat-b.selector';
import { haveSafetyAndBalanceQuestionsBeenCompleted }
  from '../../modules/tests/test-data/cat-a-mod2/test-data.cat-a-mod2.selector';
import { hasManoeuvreBeenCompletedCatBE } from '../../modules/tests/test-data/cat-be/test-data.cat-be.selector';
import { hasManoeuvreBeenCompletedCatC } from '../../modules/tests/test-data/cat-c/test-data.cat-c.selector';
import { legalRequirementsLabels } from '../../shared/constants/legal-requirements/legal-requirements.constants';
import { CompetencyOutcome } from '../../shared/models/competency-outcome';
import { SpeedCheckState } from './test-report-validator.constants';
import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';
import { CatD1UniqueTypes } from '@dvsa/mes-test-schema/categories/D1';
import { CatDEUniqueTypes } from '@dvsa/mes-test-schema/categories/DE';
import { CatD1EUniqueTypes } from '@dvsa/mes-test-schema/categories/D1E';

@Injectable()
export class TestReportValidatorProvider {

  constructor(private faultCountProvider: FaultCountProvider) { }

  public isTestReportValid(data: object, category: TestCategory): boolean {
    switch (category) {
      case TestCategory.B:
        return this.validateLegalRequirementsCatB(data);
      case TestCategory.BE:
        return this.validateLegalRequirementsCatBE(data);
      case TestCategory.C1:
      case TestCategory.C:
        return this.validateLegalRequirementsCNonTrailer(data);
      case TestCategory.C1E:
      case TestCategory.CE:
        return this.validateLegalRequirementsCTrailer(data);
      case TestCategory.D:
        return this.validateLegalRequirementsCatD(data);
      case TestCategory.D1:
        return this.validateLegalRequirementsCatD1(data);
      case TestCategory.DE:
        return this.validateLegalRequirementsCatDE(data);
      case TestCategory.D1E:
        return this.validateLegalRequirementsCatD1E(data);
      case TestCategory.EUAM2:
      case TestCategory.EUA1M2:
      case TestCategory.EUA2M2:
      case TestCategory.EUAMM2:
        return this.validateLegalRequirementsCatEUAM2(data);
      default:
        return false;
    }
  }

  public getMissingLegalRequirements(data: object, category: TestCategory): legalRequirementsLabels[] {
    switch (category) {
      case TestCategory.B:
        return this.getMissingLegalRequirementsCatB(data);
      case TestCategory.BE:
        return this.getMissingLegalRequirementsCatBE(data);
      case TestCategory.C1:
      case TestCategory.C:
        return this.getMissingLegalRequirementsCNonTrailer(data);
      case TestCategory.C1E:
      case TestCategory.CE:
        return this.getMissingLegalRequirementsCTrailer(data);
      case TestCategory.D:
        return this.getMissingLegalRequirementsCatD(data);
      case TestCategory.D1:
        return this.getMissingLegalRequirementsCatD1(data);
      case TestCategory.DE:
        return this.getMissingLegalRequirementsCatDE(data);
      case TestCategory.D1E:
        return this.getMissingLegalRequirementsCatD1E(data);
      case TestCategory.EUA1M2:
      case TestCategory.EUA2M2:
      case TestCategory.EUAM2:
      case TestCategory.EUAMM2:
        return this.getMissingLegalRequirementsCatEUAM2(data);
      default:
        return [];
    }
  }

  public isETAValid(data: TestData, category: TestCategory): boolean {
    const noEtaFaults = !(get(data, 'ETA.verbal') || get(data, 'ETA.physical'));

    return noEtaFaults ||
      this.faultCountProvider.getDangerousFaultSumCount(category, data) !== 0 ||
      this.faultCountProvider.getSeriousFaultSumCount(category, data) !== 0;
  }

  public validateSpeedChecksCatAMod1(data: CatAMod1TestData): SpeedCheckState {

    const emergencyStopNotMet = get(data, 'emergencyStop.outcome');
    const avoidanceNotMet = get(data, 'avoidance.outcome');

    const emergencyStopFirstAttempt = get(data, 'emergencyStop.firstAttempt');
    const avoidanceFirstAttempt = get(data, 'avoidance.firstAttempt');

    const emergencyStopOutcome = get(data, 'singleFaultCompetencies.emergencyStop');
    const avoidanceOutcome = get(data, 'singleFaultCompetencies.avoidance');

    if (emergencyStopNotMet === CompetencyOutcome.S) {
      if (emergencyStopFirstAttempt === undefined) {
        return SpeedCheckState.EMERGENCY_STOP_MISSING;
      }

      return SpeedCheckState.NOT_MET;
    }

    if (emergencyStopOutcome === CompetencyOutcome.S) {
      return SpeedCheckState.EMERGENCY_STOP_SERIOUS_FAULT;
    }

    if (emergencyStopOutcome === CompetencyOutcome.D) {
      return SpeedCheckState.EMERGENCY_STOP_DANGEROUS_FAULT;
    }

    if (avoidanceNotMet === CompetencyOutcome.S) {
      if (avoidanceFirstAttempt === undefined) {
        return SpeedCheckState.AVOIDANCE_MISSING;
      }

      if (avoidanceOutcome === CompetencyOutcome.S || avoidanceOutcome === CompetencyOutcome.D) {
        return SpeedCheckState.VALID;
      }

      return SpeedCheckState.NOT_MET;
    }

    if (emergencyStopFirstAttempt === undefined && avoidanceFirstAttempt === undefined) {
      return SpeedCheckState.EMERGENCY_STOP_AND_AVOIDANCE_MISSING;
    }

    if (emergencyStopFirstAttempt === undefined) {
      return SpeedCheckState.EMERGENCY_STOP_MISSING;
    }

    if (avoidanceFirstAttempt === undefined) {
      if (avoidanceOutcome === CompetencyOutcome.S || avoidanceOutcome === CompetencyOutcome.D) {
        return SpeedCheckState.VALID;
      }

      return SpeedCheckState.AVOIDANCE_MISSING;
    }

    return SpeedCheckState.VALID;
  }

  private validateLegalRequirementsCatB(data: CatBUniqueTypes.TestData): boolean {
    const normalStart1: boolean = get(data, 'testRequirements.normalStart1', false);
    const normalStart2: boolean = get(data, 'testRequirements.normalStart2', false);
    const angledStart: boolean = get(data, 'testRequirements.angledStart', false);
    const hillStart: boolean = get(data, 'testRequirements.hillStart', false);
    const manoeuvre: boolean = hasManoeuvreBeenCompletedCatB(data) || false;
    const vehicleChecks: boolean = hasVehicleChecksBeenCompletedCatB(data) || false;
    const eco: boolean = get(data, 'eco.completed', false);

    return normalStart1 && normalStart2 && angledStart && hillStart && manoeuvre && vehicleChecks && eco;
  }

  private getMissingLegalRequirementsCatB(data: CatBUniqueTypes.TestData): legalRequirementsLabels[] {
    const result: legalRequirementsLabels[] = [];

    !get(data, 'testRequirements.normalStart1', false) && result.push(legalRequirementsLabels.normalStart1);
    !get(data, 'testRequirements.normalStart2', false) && result.push(legalRequirementsLabels.normalStart2);
    !get(data, 'testRequirements.angledStart', false) && result.push(legalRequirementsLabels.angledStart);
    !get(data, 'testRequirements.hillStart', false) && result.push(legalRequirementsLabels.hillStart);
    !hasManoeuvreBeenCompletedCatB(data) && result.push(legalRequirementsLabels.manoeuvre);
    !hasVehicleChecksBeenCompletedCatB(data) && result.push(legalRequirementsLabels.vehicleChecks);
    !get(data, 'eco.completed', false) && result.push(legalRequirementsLabels.eco);

    return result;
  }

  private validateLegalRequirementsCatBE(data: CatBEUniqueTypes.TestData): boolean {
    const normalStart1: boolean = get(data, 'testRequirements.normalStart1', false);
    const normalStart2: boolean = get(data, 'testRequirements.normalStart2', false);
    const uphillStart: boolean = get(data, 'testRequirements.uphillStart', false);
    const angledStartControlledStop: boolean = get(data, 'testRequirements.angledStartControlledStop', false);
    const manoeuvre: boolean = hasManoeuvreBeenCompletedCatBE(data) || false;
    const eco: boolean = get(data, 'eco.completed', false);
    const uncoupleRecouple: boolean = get(data, 'uncoupleRecouple.selected', false);

    return (
      (normalStart1 || normalStart2) &&
      uphillStart &&
      angledStartControlledStop &&
      manoeuvre &&
      eco &&
      uncoupleRecouple
    );
  }

  private getMissingLegalRequirementsCatBE(data: CatBEUniqueTypes.TestData): legalRequirementsLabels[] {
    const result: legalRequirementsLabels[] = [];

    (!get(data, 'testRequirements.normalStart1', false) && !get(data, 'testRequirements.normalStart2', false))
      && result.push(legalRequirementsLabels.normalStart1);
    !get(data, 'testRequirements.uphillStart', false) && result.push(legalRequirementsLabels.uphillStart);
    !get(data, 'testRequirements.angledStartControlledStop', false)
      && result.push(legalRequirementsLabels.angledStartControlledStop);
    !hasManoeuvreBeenCompletedCatBE(data) && result.push(legalRequirementsLabels.manoeuvre);
    !get(data, 'eco.completed', false) && result.push(legalRequirementsLabels.eco);
    !get(data, 'uncoupleRecouple.selected', false) && result.push(legalRequirementsLabels.uncoupleRecouple);

    return result;
  }

  private validateLegalRequirementsCNonTrailer(
    data: CatCUniqueTypes.TestData | CatC1UniqueTypes.TestData,
    ): boolean {
    const normalStart1: boolean = get(data, 'testRequirements.normalStart1', false);
    const normalStart2: boolean = get(data, 'testRequirements.normalStart2', false);
    const uphillStart: boolean = get(data, 'testRequirements.uphillStart', false);
    const angledStartControlledStop: boolean = get(data, 'testRequirements.angledStartControlledStop', false);
    const manoeuvre: boolean = hasManoeuvreBeenCompletedCatC(data) || false;
    const eco: boolean = get(data, 'eco.completed', false);

    return (
      (normalStart1 || normalStart2) &&
      uphillStart &&
      angledStartControlledStop &&
      manoeuvre &&
      eco
    );
  }

  private getMissingLegalRequirementsCNonTrailer(
    data: CatCUniqueTypes.TestData | CatC1UniqueTypes.TestData,
    ): legalRequirementsLabels[] {
    const result: legalRequirementsLabels[] = [];

    (!get(data, 'testRequirements.normalStart1', false) && !get(data, 'testRequirements.normalStart2', false))
      && result.push(legalRequirementsLabels.normalStart1);
    !get(data, 'testRequirements.uphillStart', false) && result.push(legalRequirementsLabels.uphillStart);
    !get(data, 'testRequirements.angledStartControlledStop', false)
      && result.push(legalRequirementsLabels.angledStartControlledStop);
    !hasManoeuvreBeenCompletedCatC(data) && result.push(legalRequirementsLabels.manoeuvre);
    !get(data, 'eco.completed', false) && result.push(legalRequirementsLabels.eco);

    return result;
  }

  private validateLegalRequirementsCTrailer(
    data: CatCEUniqueTypes.TestData | CatC1EUniqueTypes.TestData,
    ): boolean {
    const normalStart1: boolean = get(data, 'testRequirements.normalStart1', false);
    const normalStart2: boolean = get(data, 'testRequirements.normalStart2', false);
    const uphillStart: boolean = get(data, 'testRequirements.uphillStart', false);
    const angledStartControlledStop: boolean = get(data, 'testRequirements.angledStartControlledStop', false);
    const manoeuvre: boolean = hasManoeuvreBeenCompletedCatC(data) || false;
    const eco: boolean = get(data, 'eco.completed', false);
    const uncoupleRecouple: boolean = get(data, 'uncoupleRecouple.selected', false);

    return (
      (normalStart1 || normalStart2) &&
      uphillStart &&
      angledStartControlledStop &&
      manoeuvre &&
      eco &&
      uncoupleRecouple
    );
  }

  private getMissingLegalRequirementsCTrailer(
    data: CatCEUniqueTypes.TestData | CatC1EUniqueTypes.TestData,
    ): legalRequirementsLabels[] {
    const result: legalRequirementsLabels[] = [];

    (!get(data, 'testRequirements.normalStart1', false) && !get(data, 'testRequirements.normalStart2', false))
      && result.push(legalRequirementsLabels.normalStart1);
    !get(data, 'testRequirements.uphillStart', false) && result.push(legalRequirementsLabels.uphillStart);
    !get(data, 'testRequirements.angledStartControlledStop', false)
      && result.push(legalRequirementsLabels.angledStartControlledStop);
    !hasManoeuvreBeenCompletedCatC(data) && result.push(legalRequirementsLabels.manoeuvre);
    !get(data, 'eco.completed', false) && result.push(legalRequirementsLabels.eco);
    !get(data, 'uncoupleRecouple.selected', false) && result.push(legalRequirementsLabels.uncoupleRecouple);
    return result;
  }

  private validateLegalRequirementsCatD(data: CatDUniqueTypes.TestData): boolean {
    const busStop1: boolean = get(data, 'testRequirements.busStop1', false);
    const busStop2: boolean = get(data, 'testRequirements.busStop2', false);
    const uphillStart: boolean = get(data, 'testRequirements.uphillStart', false);
    const angledStartControlledStop: boolean = get(data, 'testRequirements.angledStartControlledStop', false);
    const manoeuvre: boolean = get(data, 'manoeuvres.reverseLeft.selected', false);
    const eco: boolean = get(data, 'eco.completed', false);

    return (
      busStop1 &&
      busStop2 &&
      uphillStart &&
      angledStartControlledStop &&
      manoeuvre &&
      eco
    );
  }

  private getMissingLegalRequirementsCatD(data: CatDUniqueTypes.TestData): legalRequirementsLabels[] {
    const result: legalRequirementsLabels[] = [];

    !get(data, 'testRequirements.busStop1', false)
      && result.push(legalRequirementsLabels.busStop1);
    !get(data, 'testRequirements.busStop2', false)
      && result.push(legalRequirementsLabels.busStop2);
    !get(data, 'testRequirements.uphillStart', false)
      && result.push(legalRequirementsLabels.uphillStart);
    !get(data, 'testRequirements.angledStartControlledStop', false)
      && result.push(legalRequirementsLabels.angledStartControlledStop);
    !get(data, 'manoeuvres.reverseLeft.selected', false)
      && result.push(legalRequirementsLabels.manoeuvre);
    !get(data, 'eco.completed', false)
      && result.push(legalRequirementsLabels.eco);

    return result;
  }

  private validateLegalRequirementsCatD1(data: CatD1UniqueTypes.TestData): boolean {
    const normalStart1: boolean = get(data, 'testRequirements.normalStart1', false);
    const normalStart2: boolean = get(data, 'testRequirements.normalStart2', false);
    const uphillStart: boolean = get(data, 'testRequirements.uphillStart', false);
    const angledStartControlledStop: boolean = get(data, 'testRequirements.angledStartControlledStop', false);
    const manoeuvre: boolean = get(data, 'manoeuvres.reverseLeft.selected', false);
    const eco: boolean = get(data, 'eco.completed', false);

    return (
      normalStart1 &&
      normalStart2 &&
      uphillStart &&
      angledStartControlledStop &&
      manoeuvre &&
      eco
    );
  }

  private getMissingLegalRequirementsCatD1(data: CatD1UniqueTypes.TestData): legalRequirementsLabels[] {
    const result: legalRequirementsLabels[] = [];

    !get(data, 'testRequirements.normalStart1', false)
      && result.push(legalRequirementsLabels.normalStart1);
    !get(data, 'testRequirements.normalStart2', false)
      && result.push(legalRequirementsLabels.normalStart2);
    !get(data, 'testRequirements.uphillStart', false)
      && result.push(legalRequirementsLabels.uphillStart);
    !get(data, 'testRequirements.angledStartControlledStop', false)
      && result.push(legalRequirementsLabels.angledStartControlledStop);
    !get(data, 'manoeuvres.reverseLeft.selected', false)
      && result.push(legalRequirementsLabels.manoeuvre);
    !get(data, 'eco.completed', false)
      && result.push(legalRequirementsLabels.eco);

    return result;
  }

  private validateLegalRequirementsCatDE(data: CatDEUniqueTypes.TestData): boolean {
    const busStop1: boolean = get(data, 'testRequirements.busStop1', false);
    const busStop2: boolean = get(data, 'testRequirements.busStop2', false);
    const uphillStart: boolean = get(data, 'testRequirements.uphillStart', false);
    const angledStartControlledStop: boolean = get(data, 'testRequirements.angledStartControlledStop', false);
    const manoeuvre: boolean = get(data, 'manoeuvres.reverseLeft.selected', false);
    const eco: boolean = get(data, 'eco.completed', false);
    const uncoupleRecouple = get(data, 'uncoupleRecouple.selected' , false);

    return (
      busStop1 &&
      busStop2 &&
      uphillStart &&
      angledStartControlledStop &&
      manoeuvre &&
      eco &&
      uncoupleRecouple
    );
  }

  private getMissingLegalRequirementsCatDE(data: CatDEUniqueTypes.TestData): legalRequirementsLabels[] {
    const result: legalRequirementsLabels[] = [];

    !get(data, 'testRequirements.busStop1', false)
      && result.push(legalRequirementsLabels.busStop1);
    !get(data, 'testRequirements.busStop2', false)
      && result.push(legalRequirementsLabels.busStop2);
    !get(data, 'testRequirements.uphillStart', false)
      && result.push(legalRequirementsLabels.uphillStart);
    !get(data, 'testRequirements.angledStartControlledStop', false)
      && result.push(legalRequirementsLabels.angledStartControlledStop);
    !get(data, 'manoeuvres.reverseLeft.selected', false)
      && result.push(legalRequirementsLabels.manoeuvre);
    !get(data, 'eco.completed', false)
      && result.push(legalRequirementsLabels.eco);
    !get(data, 'uncoupleRecouple.selected' , false)
      && result.push(legalRequirementsLabels.uncoupleRecouple);

    return result;
  }

  private validateLegalRequirementsCatD1E(data: CatD1EUniqueTypes.TestData): boolean {
    const normalStart1: boolean = get(data, 'testRequirements.normalStart1', false);
    const normalStart2: boolean = get(data, 'testRequirements.normalStart2', false);
    const uphillStart: boolean = get(data, 'testRequirements.uphillStart', false);
    const angledStartControlledStop: boolean = get(data, 'testRequirements.angledStartControlledStop', false);
    const manoeuvre: boolean = get(data, 'manoeuvres.reverseLeft.selected', false);
    const eco: boolean = get(data, 'eco.completed', false);
    const uncoupleRecouple = get(data, 'uncoupleRecouple.selected' , false);

    return (
      normalStart1 &&
      normalStart2 &&
      uphillStart &&
      angledStartControlledStop &&
      manoeuvre &&
      eco &&
      uncoupleRecouple
    );
  }

  private validateLegalRequirementsCatEUAM2(data: CatAMod2TestData): boolean {
    const normalStart1: boolean = get(data, 'testRequirements.normalStart1', false);
    const normalStart2: boolean = get(data, 'testRequirements.normalStart2', false);
    const angledStart: boolean = get(data, 'testRequirements.angledStart', false);
    const hillStart: boolean = get(data, 'testRequirements.hillStart', false);
    const safteyAndBalanceQuestions: boolean =
      haveSafetyAndBalanceQuestionsBeenCompleted(data.safetyAndBalanceQuestions);
    const eco: boolean = get(data, 'eco.completed', false);

    return normalStart1 && normalStart2 && angledStart && hillStart && safteyAndBalanceQuestions && eco;
  }

  private getMissingLegalRequirementsCatD1E(data: CatD1EUniqueTypes.TestData): legalRequirementsLabels[] {
    const result: legalRequirementsLabels[] = [];

    !get(data, 'testRequirements.normalStart1', false)
      && result.push(legalRequirementsLabels.normalStart1);
    !get(data, 'testRequirements.normalStart2', false)
      && result.push(legalRequirementsLabels.normalStart2);
    !get(data, 'testRequirements.uphillStart', false)
      && result.push(legalRequirementsLabels.uphillStart);
    !get(data, 'testRequirements.angledStartControlledStop', false)
      && result.push(legalRequirementsLabels.angledStartControlledStop);
    !get(data, 'manoeuvres.reverseLeft.selected', false)
      && result.push(legalRequirementsLabels.manoeuvre);
    !get(data, 'eco.completed', false)
      && result.push(legalRequirementsLabels.eco);
    !get(data, 'uncoupleRecouple.selected' , false)
      && result.push(legalRequirementsLabels.uncoupleRecouple);

    return result;
  }

  private getMissingLegalRequirementsCatEUAM2(data: CatAMod2TestData): legalRequirementsLabels[] {
    const result: legalRequirementsLabels[] = [];

    !get(data, 'testRequirements.normalStart1', false) && result.push(legalRequirementsLabels.normalStart1);
    !get(data, 'testRequirements.normalStart2', false) && result.push(legalRequirementsLabels.normalStart2);
    !get(data, 'testRequirements.angledStart', false) && result.push(legalRequirementsLabels.angledStart);
    !get(data, 'testRequirements.hillStart', false) && result.push(legalRequirementsLabels.hillStart);
    !haveSafetyAndBalanceQuestionsBeenCompleted(data.safetyAndBalanceQuestions)
      && result.push(legalRequirementsLabels.safetyAndBalanceQuestions);
    !get(data, 'eco.completed', false) && result.push(legalRequirementsLabels.eco);

    return result;
  }
}
