import { Injectable } from '@angular/core';
import { FaultSummary } from '../../shared/models/fault-marking.model';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { FaultCountProvider } from '../fault-count/fault-count';
import { FaultSummaryCatBHelper } from './cat-b/fault-summary.cat-b';
import { FaultSummaryCatBEHelper } from './cat-be/fault-summary.cat-be';
import { FaultSummaryCatCHelper } from './cat-c/fault-summary.cat-c';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { CatCEUniqueTypes } from '@dvsa/mes-test-schema/categories/CE';
import { CatC1UniqueTypes } from '@dvsa/mes-test-schema/categories/C1';
import { CatC1EUniqueTypes } from '@dvsa/mes-test-schema/categories/C1E';
import { FaultSummaryCatAM1Helper } from './cat-a-mod1/fault-summary.cat-a-mod1';

@Injectable()
export class FaultSummaryProvider {

  constructor(private faultCountProvider: FaultCountProvider) { }

  public getDrivingFaultsList(data: Object, category: TestCategory): FaultSummary[] {
    switch (category) {
      case TestCategory.B:
        return FaultSummaryCatBHelper.getDrivingFaultsCatB(data);
      case TestCategory.BE:
        return FaultSummaryCatBEHelper.getDrivingFaultsCatBE(
          data,
          this.faultCountProvider.getVehicleChecksFaultCount(
            TestCategory.BE,
             (<CatBEUniqueTypes.TestData>data).vehicleChecks,
          ));
      case TestCategory.C:
        return FaultSummaryCatCHelper.getDrivingFaultsNonTrailer(
          data,
          TestCategory.C,
          this.faultCountProvider.getVehicleChecksFaultCount(
            TestCategory.C,
            (<CatCUniqueTypes.TestData>data).vehicleChecks,
          ));
      case TestCategory.C1:
        return FaultSummaryCatCHelper.getDrivingFaultsNonTrailer(
          data,
          TestCategory.C1,
          this.faultCountProvider.getVehicleChecksFaultCount(
            TestCategory.C1,
            (<CatC1UniqueTypes.TestData>data).vehicleChecks,
          ));
      case TestCategory.CE:
        return FaultSummaryCatCHelper.getDrivingFaultsTrailer(
          data,
          TestCategory.CE,
          this.faultCountProvider.getVehicleChecksFaultCount(
            TestCategory.CE,
            (<CatCEUniqueTypes.TestData>data).vehicleChecks,
          ));
      case TestCategory.C1E:
        return FaultSummaryCatCHelper.getDrivingFaultsTrailer(
          data,
          TestCategory.C1E,
          this.faultCountProvider.getVehicleChecksFaultCount(
            TestCategory.C1E,
            (<CatC1EUniqueTypes.TestData>data).vehicleChecks,
          ));
      case TestCategory.EUAM1:
      case TestCategory.EUA1M1:
      case TestCategory.EUA2M1:
      case TestCategory.EUAMM1:
        return FaultSummaryCatAM1Helper.getDrivingFaultsCatAM1(data);
      default:
        return [];
    }
  }

  public getSeriousFaultsList(data: Object, category: TestCategory): FaultSummary[] {
    switch (category) {
      case TestCategory.B:
        return FaultSummaryCatBHelper.getSeriousFaultsCatB(data);
      case TestCategory.BE:
        return FaultSummaryCatBEHelper.getSeriousFaultsCatBE(data);
      case TestCategory.C1:
      case TestCategory.C:
        return FaultSummaryCatCHelper.getSeriousFaultsNonTrailer(data);
      case TestCategory.C1E:
      case TestCategory.CE:
        return FaultSummaryCatCHelper.getSeriousFaultsTrailer(data);
      case TestCategory.EUAM1:
      case TestCategory.EUA1M1:
      case TestCategory.EUA2M1:
      case TestCategory.EUAMM1:
        return FaultSummaryCatAM1Helper.getSeriousFaultsCatAM1(data);
      default:
        return [];
    }
  }

  public getDangerousFaultsList(data: Object, category: TestCategory): FaultSummary[] {
    switch (category) {
      case TestCategory.B:
        return FaultSummaryCatBHelper.getDangerousFaultsCatB(data);
      case TestCategory.BE:
        return FaultSummaryCatBEHelper.getDangerousFaultsCatBE(data);
      case TestCategory.C1:
      case TestCategory.C:
        return FaultSummaryCatCHelper.getDangerousFaultsNonTrailer(data);
      case TestCategory.C1E:
      case TestCategory.CE:
        return FaultSummaryCatCHelper.getDangerousFaultsTrailer(data);
      case TestCategory.EUAM1:
      case TestCategory.EUA1M1:
      case TestCategory.EUA2M1:
      case TestCategory.EUAMM1:
        return FaultSummaryCatAM1Helper.getDangerousFaultsCatAM1(data);
      default:
        return [];
    }
  }
}
