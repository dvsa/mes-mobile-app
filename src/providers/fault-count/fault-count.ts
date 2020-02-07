import { Injectable } from '@angular/core';

import { CompetencyOutcome } from '../../shared/models/competency-outcome';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { VehicleChecksScore } from '../../shared/models/vehicle-checks-score.model';

import { FaultCountBHelper }  from './cat-b/fault-count.cat-b';
import { FaultCountBEHelper } from './cat-be/fault-count.cat-be';
import { FaultCountCHelper } from './cat-c/fault-count.cat-c';
import { FaultCountDHelper } from './cat-d/fault-count.cat-d';

import { sumManoeuvreFaults } from '../../shared/helpers/faults';
import { FaultCountAM1Helper } from './cat-a-mod1/fault-count.cat-a-mod1';

// TODO: Remove category from helper functions as the name of the helper class already contains the category

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
      case TestCategory.EUAM1:
      case TestCategory.EUA1M1:
      case TestCategory.EUA2M1:
      case TestCategory.EUAMM1: return FaultCountAM1Helper.getRidingFaultSumCountCatAM1(data);
      case TestCategory.D1: return FaultCountDHelper.getDrivingFaultSumCountCatD1(data);
      case TestCategory.D1E: return FaultCountDHelper.getDrivingFaultSumCountCatD1E(data);
      case TestCategory.DE: return FaultCountDHelper.getDrivingFaultSumCountCatDE(data);
      case TestCategory.D: return FaultCountDHelper.getDrivingFaultSumCountCatD(data);
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
      case TestCategory.EUAM1:
      case TestCategory.EUA1M1:
      case TestCategory.EUA2M1:
      case TestCategory.EUAMM1: return FaultCountAM1Helper.getSeriousFaultSumCountCatAM1(data);
      case TestCategory.D1: return FaultCountDHelper.getSeriousFaultSumCountCatD1(data);
      case TestCategory.D1E: return FaultCountDHelper.getSeriousFaultSumCountCatD1E(data);
      case TestCategory.DE: return FaultCountDHelper.getSeriousFaultSumCountCatDE(data);
      case TestCategory.D: return FaultCountDHelper.getSeriousFaultSumCountCatD(data);
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
      case TestCategory.EUAM1:
      case TestCategory.EUA1M1:
      case TestCategory.EUA2M1:
      case TestCategory.EUAMM1: return FaultCountAM1Helper.getDangerousFaultSumCountCatAM1(data);
      case TestCategory.D1: return FaultCountDHelper.getDangerousFaultSumCountCatD1(data);
      case TestCategory.D1E: return FaultCountDHelper.getDangerousFaultSumCountCatD1E(data);
      case TestCategory.DE: return FaultCountDHelper.getDangerousFaultSumCountCatDE(data);
      case TestCategory.D: return FaultCountDHelper.getDangerousFaultSumCountCatD(data);
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
      case TestCategory.D1:
      case TestCategory.D1E:
      case TestCategory.DE:
      case TestCategory.D: return sumManoeuvreFaults(data, faultType);
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
      case TestCategory.D1: return FaultCountDHelper.getVehicleChecksFaultCountCatD1(data);
      case TestCategory.D1E: return FaultCountDHelper.getVehicleChecksFaultCountCatD1E(data);
      case TestCategory.DE: return FaultCountDHelper.getVehicleChecksFaultCountCatDE(data);
      case TestCategory.D: return FaultCountDHelper.getVehicleChecksFaultCountCatD(data);
      default: throw new Error(FaultCountProvider.getFaultSumCountErrMsg);
    }
  }

}
