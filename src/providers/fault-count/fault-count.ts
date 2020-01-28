import { Injectable } from '@angular/core';

import { CompetencyOutcome } from '../../shared/models/competency-outcome';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { VehicleChecksScore } from '../../shared/models/vehicle-checks-score.model';

import { FaultCountBHelper }  from './cat-b/fault-count.cat-b';
import { FaultCountBEHelper } from './cat-be/fault-count.cat-be';
import { FaultCountCHelper } from './cat-c/fault-count.cat-c';

import { sumManoeuvreFaults } from '../../shared/helpers/faults';

@Injectable()
export class FaultCountProvider {

  static getFaultSumCountErrMsg: string = 'Error getting fault sum count';

  public getDrivingFaultSumCount = (category: TestCategory, data: Object): number => {
    switch (category) {
      case TestCategory.B: return FaultCountBHelper.getDrivingFaultSumCountCatB(data);
      case TestCategory.BE: return FaultCountBEHelper.getDrivingFaultSumCountCatBE(data);
      case TestCategory.C1: return FaultCountCHelper.getDrivingFaultSumCountCatC1(data);
      case TestCategory.C1E: return FaultCountCHelper.getDrivingFaultSumCountCatC1E(data);
      case TestCategory.CE: return FaultCountCHelper.getDrivingFaultSumCountCatCE(data);
      case TestCategory.C: return FaultCountCHelper.getDrivingFaultSumCountCatC(data);
      // TODO: To be implemented properly in MES-4420
      case TestCategory.EUAM1: return FaultCountBEHelper.getDrivingFaultSumCountCatBE(data);
      default: throw new Error(FaultCountProvider.getFaultSumCountErrMsg);
    }
  }

  public getSeriousFaultSumCount = (category: TestCategory, data: Object): number => {
    switch (category) {
      case TestCategory.B: return FaultCountBHelper.getSeriousFaultSumCountCatB(data);
      case TestCategory.BE: return FaultCountBEHelper.getSeriousFaultSumCountCatBE(data);
      case TestCategory.C1: return FaultCountCHelper.getSeriousFaultSumCountCatC1(data);
      case TestCategory.C1E: return FaultCountCHelper.getSeriousFaultSumCountCatC1E(data);
      case TestCategory.CE: return FaultCountCHelper.getSeriousFaultSumCountCatCE(data);
      case TestCategory.C: return FaultCountCHelper.getSeriousFaultSumCountCatC(data);
      // TODO: To be implemented properly in MES-4420
      case TestCategory.EUAM1: return FaultCountBEHelper.getSeriousFaultSumCountCatBE(data);
      default: throw new Error(FaultCountProvider.getFaultSumCountErrMsg);
    }
  }

  public getDangerousFaultSumCount = (category: TestCategory, data: Object): number => {
    switch (category) {
      case TestCategory.B: return FaultCountBHelper.getDangerousFaultSumCountCatB(data);
      case TestCategory.BE: return FaultCountBEHelper.getDangerousFaultSumCountCatBE(data);
      case TestCategory.C1: return FaultCountCHelper.getDangerousFaultSumCountCatC1(data);
      case TestCategory.C1E: return FaultCountCHelper.getDangerousFaultSumCountCatC1E(data);
      case TestCategory.CE: return FaultCountCHelper.getDangerousFaultSumCountCatCE(data);
      case TestCategory.C: return FaultCountCHelper.getDangerousFaultSumCountCatC(data);
      // TODO: To be implemented properly in MES-4420
      case TestCategory.EUAM1: return FaultCountBEHelper.getDangerousFaultSumCountCatBE(data);
      default: throw new Error(FaultCountProvider.getFaultSumCountErrMsg);
    }
  }

  public getManoeuvreFaultCount = (category: TestCategory, data: Object, faultType: CompetencyOutcome): number => {
    switch (category) {
      case TestCategory.B: return sumManoeuvreFaults(data, faultType);
      case TestCategory.BE: return sumManoeuvreFaults(data, faultType);
      case TestCategory.C1:
      case TestCategory.C1E:
      case TestCategory.CE:
      case TestCategory.C: return sumManoeuvreFaults(data, faultType);
      // TODO: To be implemented properly in MES-4420
      case TestCategory.EUAM1: return sumManoeuvreFaults(data, faultType);
      default: throw new Error(FaultCountProvider.getFaultSumCountErrMsg);
    }
  }

  public getVehicleChecksFaultCount = (category: TestCategory, data: Object): VehicleChecksScore => {
    switch (category) {
      case TestCategory.BE: return FaultCountBEHelper.getVehicleChecksFaultCountCatBE(data);
      case TestCategory.C1: return FaultCountCHelper.getVehicleChecksFaultCountCatC1(data);
      case TestCategory.C1E: return FaultCountCHelper.getVehicleChecksFaultCountCatC1E(data);
      case TestCategory.CE: return FaultCountCHelper.getVehicleChecksFaultCountCatCE(data);
      case TestCategory.C: return FaultCountCHelper.getVehicleChecksFaultCountCatC(data);
      // TODO: To be implemented properly in MES-4420
      case TestCategory.EUAM1: return FaultCountBEHelper.getVehicleChecksFaultCountCatBE(data);
      case TestCategory.EUAM2: return FaultCountBEHelper.getVehicleChecksFaultCountCatBE(data);
      default: throw new Error(FaultCountProvider.getFaultSumCountErrMsg);
    }
  }

}
