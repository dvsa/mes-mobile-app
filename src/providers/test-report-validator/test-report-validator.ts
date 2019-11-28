import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { get } from 'lodash';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { FaultCountProvider } from '../fault-count/fault-count';
import { TestCategory } from '../../shared/models/test-category';
import { TestData } from '@dvsa/mes-test-schema/categories/Common';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import {
  hasManoeuvreBeenCompletedCatB,
  hasVehicleChecksBeenCompletedCatB,
} from '../../modules/tests/test-data/cat-b/test-data.cat-b.selector';
import {
  hasManoeuvreBeenCompletedCatBE,
  hasVehicleChecksBeenCompletedCatBE,
} from '../../modules/tests/test-data/cat-be/test-data.cat-be.selector';
import { legalRequirementsLabels } from '../../shared/constants/legal-requirements/legal-requirements.constants';

@Injectable()
export class TestReportValidatorProvider {

  constructor(private faultCountProvider: FaultCountProvider) { }

  public isTestReportValid(data: object, category: TestCategory): boolean {
    switch (category) {
      case TestCategory.B:
        return this.validateLegalRequirementsCatB(data);
      case TestCategory.BE:
        return this.validateLegalRequirementsCatBE(data);
      default:
        return false;
    }
  }

  public getMissingLegalRequirements(data: object, category: TestCategory) : string[] {
    switch (category) {
      case TestCategory.B:
        return this.getMissingLegalRequirementsCatB(data);
      case TestCategory.BE:
        return this.getMissingLegalRequirementsCatBE(data);
      default:
        return [];
    }
  }

  public validateETA (testData: TestData): Observable<boolean> {
    const noEtaFaults = !(testData.ETA.verbal || testData.ETA.physical);

    return of(
      noEtaFaults ||
      this.faultCountProvider.getDangerousFaultSumCount(TestCategory.B, testData) !== 0 ||
      this.faultCountProvider.getSeriousFaultSumCount(TestCategory.B, testData) !== 0,
    );
  }

  private validateLegalRequirementsCatB (data: CatBUniqueTypes.TestData): boolean {
    const normalStart1: boolean = get(data , 'testRequirements.normalStart1', false);
    const normalStart2: boolean = get(data, 'testRequirements.normalStart2', false);
    const angledStart: boolean =  get(data, 'testRequirements.angledStart' , false);
    const hillStart: boolean = get(data, 'testRequirements.hillStart', false);
    const manoeuvre: boolean = hasManoeuvreBeenCompletedCatB(data) || false;
    const vehicleChecks: boolean = hasVehicleChecksBeenCompletedCatB(data) || false;
    const eco: boolean = get(data, 'eco.completed', false);

    return normalStart1 && normalStart2 && angledStart && hillStart && manoeuvre && vehicleChecks && eco;
  }

  private getMissingLegalRequirementsCatB (data: CatBUniqueTypes.TestData): string[] {
    const result: string[] = [];

    !get(data, 'testRequirements.normalStart1', false) && result.push(legalRequirementsLabels.normalStart1);
    !get(data, 'testRequirements.normalStart2' , false) && result.push(legalRequirementsLabels.normalStart2);
    !get(data, 'testRequirements.angledStart' , false) && result.push(legalRequirementsLabels.angledStart);
    !get(data, 'testRequirements.hillStart', false) && result.push(legalRequirementsLabels.hillStart);
    !hasManoeuvreBeenCompletedCatB(data) && result.push(legalRequirementsLabels.manoeuvre);
    !hasVehicleChecksBeenCompletedCatB(data) && result.push(legalRequirementsLabels.vehicleChecks);
    !get(data, 'eco.completed', false) && result.push(legalRequirementsLabels.eco);

    return result;
  }

  private validateLegalRequirementsCatBE (data: CatBEUniqueTypes.TestData): boolean {
    const normalStart1: boolean = get(data, 'testRequirements.normalStart1', false);
    const normalStart2: boolean =  get(data, 'testRequirements.normalStart2', false);
    const downhillStart:boolean =  get(data, 'testRequirements.downhillStart', false);
    const uphillStart: boolean = get(data, 'testRequirements.uphillStart', false);
    const angledStartControlledStop:boolean =  get(data, 'testRequirements.angledStartControlledStop', false);
    const manoeuvre: boolean = hasManoeuvreBeenCompletedCatBE(data) || false ;
    const vehicleChecks: boolean = hasVehicleChecksBeenCompletedCatBE(data) || false ;
    const eco: boolean =  get(data, 'eco.completed', false);
    const uncoupleRecouple: boolean =  get(data, 'uncoupleRecouple.selected', false) ;

    return (
      normalStart1 &&
      normalStart2 &&
      downhillStart &&
      uphillStart &&
      angledStartControlledStop &&
      manoeuvre &&
      vehicleChecks &&
      eco &&
      uncoupleRecouple
    );
  }

  private getMissingLegalRequirementsCatBE (data: CatBEUniqueTypes.TestData): string[] {
    const result: string[] = [];

    !get(data, 'testRequirements.normalStart1', false) && result.push(legalRequirementsLabels.normalStart1);
    !get(data, 'testRequirements.normalStart2', false) && result.push(legalRequirementsLabels.normalStart2);
    !get(data, 'testRequirements.downhillStart', false) && result.push(legalRequirementsLabels.downhillStart);
    !get(data, 'testRequirements.uphillStart' , false) && result.push(legalRequirementsLabels.uphillStart);
    !get(data, 'testRequirements.angledStartControlledStop', false)
      && result.push(legalRequirementsLabels.angledStartControlledStop);
    !hasManoeuvreBeenCompletedCatBE(data) && result.push(legalRequirementsLabels.manoeuvre);
    !hasVehicleChecksBeenCompletedCatBE(data) && result.push(legalRequirementsLabels.vehicleChecks);
    !get(data, 'eco.completed', false) && result.push(legalRequirementsLabels.eco);
    !get(data , 'uncoupleRecouple.selected', false) && result.push(legalRequirementsLabels.uncoupleRecouple);

    return result;
  }

}
