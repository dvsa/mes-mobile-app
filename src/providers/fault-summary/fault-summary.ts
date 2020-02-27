import { Injectable } from '@angular/core';
import { FaultSummary } from '../../shared/models/fault-marking.model';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { FaultCountProvider } from '../fault-count/fault-count';
import { FaultSummaryCatBHelper } from './cat-b/fault-summary.cat-b';
import { FaultSummaryCatBEHelper } from './cat-be/fault-summary.cat-be';
import { FaultSummaryCatCHelper } from './cat-c/fault-summary.cat-c';
import { FaultSummaryCatDHelper } from './cat-d/fault-summary.cat-d';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { CatCEUniqueTypes } from '@dvsa/mes-test-schema/categories/CE';
import { CatC1UniqueTypes } from '@dvsa/mes-test-schema/categories/C1';
import { CatC1EUniqueTypes } from '@dvsa/mes-test-schema/categories/C1E';
import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';
import { CatDEUniqueTypes } from '@dvsa/mes-test-schema/categories/DE';
import { CatD1UniqueTypes } from '@dvsa/mes-test-schema/categories/D1';
import { CatD1EUniqueTypes } from '@dvsa/mes-test-schema/categories/D1E';
import { FaultSummaryCatAM1Helper } from './cat-a-mod1/fault-summary.cat-a-mod1';
import { FaultSummaryCatAM2Helper } from './cat-a-mod2/fault-summary.cat-a-mod2';

@Injectable()
export class FaultSummaryProvider {

  constructor(private faultCountProvider: FaultCountProvider) { }

  public getDrivingFaultsList(data: object, category: TestCategory): FaultSummary[] {
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
      case TestCategory.D:
        return FaultSummaryCatDHelper.getDrivingFaultsNonTrailer(
          data,
          TestCategory.D,
          this.faultCountProvider.getVehicleChecksFaultCount(
            TestCategory.D,
            (<CatDUniqueTypes.TestData>data).vehicleChecks,
          ));
      case TestCategory.D1:
        return FaultSummaryCatDHelper.getDrivingFaultsNonTrailer(
          data,
          TestCategory.D1,
          this.faultCountProvider.getVehicleChecksFaultCount(
            TestCategory.D1,
            (<CatD1UniqueTypes.TestData>data).vehicleChecks,
          ));
      case TestCategory.DE:
        return FaultSummaryCatDHelper.getDrivingFaultsTrailer(
          data,
          TestCategory.DE,
          this.faultCountProvider.getVehicleChecksFaultCount(
            TestCategory.DE,
            (<CatDEUniqueTypes.TestData>data).vehicleChecks,
          ));
      case TestCategory.D1E:
        return FaultSummaryCatDHelper.getDrivingFaultsTrailer(
          data,
          TestCategory.D1E,
          this.faultCountProvider.getVehicleChecksFaultCount(
            TestCategory.D1E,
            (<CatD1EUniqueTypes.TestData>data).vehicleChecks,
          ));
      case TestCategory.EUAM1:
      case TestCategory.EUA1M1:
      case TestCategory.EUA2M1:
      case TestCategory.EUAMM1:
        return FaultSummaryCatAM1Helper.getDrivingFaultsCatAM1(data);
      case TestCategory.EUAM2:
      case TestCategory.EUA1M2:
      case TestCategory.EUA2M2:
      case TestCategory.EUAMM2:
        return FaultSummaryCatAM2Helper.getDrivingFaultsCatAM2(data);
      default:
        return [];
    }
  }

  public getSeriousFaultsList(data: object, category: TestCategory): FaultSummary[] {
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
      case TestCategory.D1:
      case TestCategory.D:
        return FaultSummaryCatDHelper.getSeriousFaultsNonTrailer(data);
      case TestCategory.D1E:
      case TestCategory.DE:
        return FaultSummaryCatDHelper.getSeriousFaultsTrailer(data);
      case TestCategory.EUAM1:
      case TestCategory.EUA1M1:
      case TestCategory.EUA2M1:
      case TestCategory.EUAMM1:
        return FaultSummaryCatAM1Helper.getSeriousFaultsCatAM1(data);
      case TestCategory.EUAM2:
      case TestCategory.EUA1M2:
      case TestCategory.EUA2M2:
      case TestCategory.EUAMM2:
        return FaultSummaryCatAM2Helper.getSeriousFaultsCatAM2(data);
      default:
        return [];
    }
  }

  public getDangerousFaultsList(data: object, category: TestCategory): FaultSummary[] {
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
      case TestCategory.D1:
      case TestCategory.D:
        return FaultSummaryCatDHelper.getDangerousFaultsNonTrailer(data);
      case TestCategory.D1E:
      case TestCategory.DE:
        return FaultSummaryCatDHelper.getDangerousFaultsTrailer(data);
      case TestCategory.EUAM1:
      case TestCategory.EUA1M1:
      case TestCategory.EUA2M1:
      case TestCategory.EUAMM1:
        return FaultSummaryCatAM1Helper.getDangerousFaultsCatAM1(data);
      case TestCategory.EUAM2:
      case TestCategory.EUA1M2:
      case TestCategory.EUA2M2:
      case TestCategory.EUAMM2:
        return FaultSummaryCatAM2Helper.getDangerousFaultsCatAM2(data);
      default:
        return [];
    }
  }
}
