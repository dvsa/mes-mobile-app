var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { FaultCountBHelper } from './cat-b/fault-count.cat-b';
import { FaultCountBEHelper } from './cat-be/fault-count.cat-be';
import { FaultCountCHelper } from './cat-c/fault-count.cat-c';
import { FaultCountDHelper } from './cat-d/fault-count.cat-d';
import { sumManoeuvreFaults } from '../../shared/helpers/faults';
import { FaultCountAM1Helper } from './cat-a-mod1/fault-count.cat-a-mod1';
import { FaultCountAM2Helper } from './cat-a-mod2/fault-count.cat-a-mod2';
import { FaultCountHomeTestHelper } from './cat-home-test/fault-count.cat-home-test';
import { FaultCountADIPart2Helper } from './cat-adi-part2/fault-count.cat-adi-part2';
// TODO: Remove category from helper functions as the name of the helper class already contains the category
var FaultCountProvider = /** @class */ (function () {
    function FaultCountProvider() {
        this.getDrivingFaultSumCount = function (category, data) {
            switch (category) {
                case "ADI2" /* ADI2 */: return FaultCountADIPart2Helper.getDrivingFaultSumCountCatADIPart2(data);
                case "B" /* B */: return FaultCountBHelper.getDrivingFaultSumCountCatB(data);
                case "B+E" /* BE */: return FaultCountBEHelper.getDrivingFaultSumCountCatBE(data);
                case "C1" /* C1 */: return FaultCountCHelper.getDrivingFaultSumCountCatC1(data);
                case "C1+E" /* C1E */: return FaultCountCHelper.getDrivingFaultSumCountCatC1E(data);
                case "C+E" /* CE */: return FaultCountCHelper.getDrivingFaultSumCountCatCE(data);
                case "C" /* C */: return FaultCountCHelper.getDrivingFaultSumCountCatC(data);
                case "EUAM1" /* EUAM1 */:
                case "EUA1M1" /* EUA1M1 */:
                case "EUA2M1" /* EUA2M1 */:
                case "EUAMM1" /* EUAMM1 */: return FaultCountAM1Helper.getRidingFaultSumCountCatAM1(data);
                case "EUAM2" /* EUAM2 */:
                case "EUA1M2" /* EUA1M2 */:
                case "EUA2M2" /* EUA2M2 */:
                case "EUAMM2" /* EUAMM2 */: return FaultCountAM2Helper.getRidingFaultSumCountCatAM2(data);
                case "D1" /* D1 */: return FaultCountDHelper.getDrivingFaultSumCountCatD1(data);
                case "D1+E" /* D1E */: return FaultCountDHelper.getDrivingFaultSumCountCatD1E(data);
                case "D+E" /* DE */: return FaultCountDHelper.getDrivingFaultSumCountCatDE(data);
                case "D" /* D */: return FaultCountDHelper.getDrivingFaultSumCountCatD(data);
                case "F" /* F */:
                case "G" /* G */:
                case "H" /* H */:
                case "K" /* K */: return FaultCountHomeTestHelper.getDrivingFaultSumCountCatHomeTest(data);
                default: throw new Error(FaultCountProvider_1.getFaultSumCountErrMsg);
            }
        };
        this.getSeriousFaultSumCount = function (category, data) {
            switch (category) {
                case "ADI2" /* ADI2 */: return FaultCountADIPart2Helper.getSeriousFaultSumCountCatADIPart2(data);
                case "B" /* B */: return FaultCountBHelper.getSeriousFaultSumCountCatB(data);
                case "B+E" /* BE */: return FaultCountBEHelper.getSeriousFaultSumCountCatBE(data);
                case "C1" /* C1 */: return FaultCountCHelper.getSeriousFaultSumCountCatC1(data);
                case "C1+E" /* C1E */: return FaultCountCHelper.getSeriousFaultSumCountCatC1E(data);
                case "C+E" /* CE */: return FaultCountCHelper.getSeriousFaultSumCountCatCE(data);
                case "C" /* C */: return FaultCountCHelper.getSeriousFaultSumCountCatC(data);
                case "EUAM1" /* EUAM1 */:
                case "EUA1M1" /* EUA1M1 */:
                case "EUA2M1" /* EUA2M1 */:
                case "EUAMM1" /* EUAMM1 */: return FaultCountAM1Helper.getSeriousFaultSumCountCatAM1(data);
                case "EUAM2" /* EUAM2 */:
                case "EUA1M2" /* EUA1M2 */:
                case "EUA2M2" /* EUA2M2 */:
                case "EUAMM2" /* EUAMM2 */: return FaultCountAM2Helper.getSeriousFaultSumCountCatAM2(data);
                case "D1" /* D1 */: return FaultCountDHelper.getSeriousFaultSumCountCatD1(data);
                case "D1+E" /* D1E */: return FaultCountDHelper.getSeriousFaultSumCountCatD1E(data);
                case "D+E" /* DE */: return FaultCountDHelper.getSeriousFaultSumCountCatDE(data);
                case "D" /* D */: return FaultCountDHelper.getSeriousFaultSumCountCatD(data);
                case "F" /* F */:
                case "G" /* G */:
                case "H" /* H */:
                case "K" /* K */: return FaultCountHomeTestHelper.getSeriousFaultSumCountHomeTest(data);
                default: throw new Error(FaultCountProvider_1.getFaultSumCountErrMsg);
            }
        };
        this.getDangerousFaultSumCount = function (category, data) {
            switch (category) {
                case "ADI2" /* ADI2 */: return FaultCountADIPart2Helper.getDangerousFaultSumCountCatADIPart2(data);
                case "B" /* B */: return FaultCountBHelper.getDangerousFaultSumCountCatB(data);
                case "B+E" /* BE */: return FaultCountBEHelper.getDangerousFaultSumCountCatBE(data);
                case "C1" /* C1 */: return FaultCountCHelper.getDangerousFaultSumCountCatC1(data);
                case "C1+E" /* C1E */: return FaultCountCHelper.getDangerousFaultSumCountCatC1E(data);
                case "C+E" /* CE */: return FaultCountCHelper.getDangerousFaultSumCountCatCE(data);
                case "C" /* C */: return FaultCountCHelper.getDangerousFaultSumCountCatC(data);
                case "EUAM1" /* EUAM1 */:
                case "EUA1M1" /* EUA1M1 */:
                case "EUA2M1" /* EUA2M1 */:
                case "EUAMM1" /* EUAMM1 */: return FaultCountAM1Helper.getDangerousFaultSumCountCatAM1(data);
                case "EUAM2" /* EUAM2 */:
                case "EUA1M2" /* EUA1M2 */:
                case "EUA2M2" /* EUA2M2 */:
                case "EUAMM2" /* EUAMM2 */: return FaultCountAM2Helper.getDangerousFaultSumCountCatAM2(data);
                case "D1" /* D1 */: return FaultCountDHelper.getDangerousFaultSumCountCatD1(data);
                case "D1+E" /* D1E */: return FaultCountDHelper.getDangerousFaultSumCountCatD1E(data);
                case "D+E" /* DE */: return FaultCountDHelper.getDangerousFaultSumCountCatDE(data);
                case "D" /* D */: return FaultCountDHelper.getDangerousFaultSumCountCatD(data);
                case "F" /* F */:
                case "G" /* G */:
                case "H" /* H */:
                case "K" /* K */: return FaultCountHomeTestHelper.getDangerousFaultSumCountHomeTest(data);
                default: throw new Error(FaultCountProvider_1.getFaultSumCountErrMsg);
            }
        };
        this.getManoeuvreFaultCount = function (category, data, faultType) {
            switch (category) {
                case "ADI2" /* ADI2 */:
                    if (!Array.isArray(data)) {
                        return 0;
                    }
                    return data.reduce(function (acc, manoeuvre) {
                        return acc + sumManoeuvreFaults(manoeuvre, faultType);
                    }, 0);
                case "B" /* B */: return sumManoeuvreFaults(data, faultType);
                case "B+E" /* BE */: return sumManoeuvreFaults(data, faultType);
                case "C1" /* C1 */:
                case "C1+E" /* C1E */:
                case "C+E" /* CE */:
                case "C" /* C */: return sumManoeuvreFaults(data, faultType);
                case "D1" /* D1 */:
                case "D1+E" /* D1E */:
                case "D+E" /* DE */:
                case "D" /* D */: return sumManoeuvreFaults(data, faultType);
                case "EUAM1" /* EUAM1 */:
                case "EUA1M1" /* EUA1M1 */:
                case "EUA2M1" /* EUA2M1 */:
                case "EUAMM1" /* EUAMM1 */: return sumManoeuvreFaults(data, faultType);
                case "F" /* F */:
                case "G" /* G */:
                case "H" /* H */: return sumManoeuvreFaults(data, faultType);
                case "K" /* K */: return 0; // NOTE: no manoeuvres on cat K
                default: throw new Error(FaultCountProvider_1.getFaultSumCountErrMsg);
            }
        };
        this.getVehicleChecksFaultCount = function (category, data) {
            switch (category) {
                case "ADI2" /* ADI2 */: return FaultCountADIPart2Helper.getVehicleChecksFaultCountCatADIPart2(data);
                case "B+E" /* BE */: return FaultCountBEHelper.getVehicleChecksFaultCountCatBE(data);
                case "C1" /* C1 */: return FaultCountCHelper.getVehicleChecksFaultCountCatC1(data);
                case "C1+E" /* C1E */: return FaultCountCHelper.getVehicleChecksFaultCountCatC1E(data);
                case "C+E" /* CE */: return FaultCountCHelper.getVehicleChecksFaultCountCatCE(data);
                case "C" /* C */: return FaultCountCHelper.getVehicleChecksFaultCountCatC(data);
                case "D1" /* D1 */: return FaultCountDHelper.getVehicleChecksFaultCountCatD1(data);
                case "D1+E" /* D1E */: return FaultCountDHelper.getVehicleChecksFaultCountCatD1E(data);
                case "D+E" /* DE */: return FaultCountDHelper.getVehicleChecksFaultCountCatDE(data);
                case "D" /* D */: return FaultCountDHelper.getVehicleChecksFaultCountCatD(data);
                case "F" /* F */:
                case "G" /* G */:
                case "H" /* H */:
                case "K" /* K */: return FaultCountHomeTestHelper.getVehicleChecksFaultCountCatHomeTest(data);
                default: throw new Error(FaultCountProvider_1.getFaultSumCountErrMsg);
            }
        };
        this.getSafetyAndBalanceFaultCount = function (category, data) {
            switch (category) {
                case "EUAM2" /* EUAM2 */:
                case "EUA1M2" /* EUA1M2 */:
                case "EUA2M2" /* EUA2M2 */:
                case "EUAMM2" /* EUAMM2 */: return FaultCountAM2Helper.getSafetyAndBalanceFaultCountCatAM2(data);
                default: throw new Error(FaultCountProvider_1.getFaultSumCountErrMsg);
            }
        };
        this.getSafetyQuestionsFaultCount = function (category, data) {
            switch (category) {
                case "D1" /* D1 */:
                case "D1+E" /* D1E */:
                case "D+E" /* DE */:
                case "D" /* D */: return FaultCountDHelper.getSafetyQuestionsFaultCount(data);
                default: throw new Error(FaultCountProvider_1.getFaultSumCountErrMsg);
            }
        };
        this.getTellMeFaultCount = function (category, data) {
            switch (category) {
                case "ADI2" /* ADI2 */: return FaultCountADIPart2Helper.getTellMeFaultCount(data);
                default: throw new Error(FaultCountProvider_1.getFaultSumCountErrMsg);
            }
        };
        this.getShowMeFaultCount = function (category, data) {
            switch (category) {
                case "ADI2" /* ADI2 */: return FaultCountADIPart2Helper.getShowMeFaultCount(data);
                default: throw new Error(FaultCountProvider_1.getFaultSumCountErrMsg);
            }
        };
    }
    FaultCountProvider_1 = FaultCountProvider;
    var FaultCountProvider_1;
    FaultCountProvider.getFaultSumCountErrMsg = 'Error getting fault sum count';
    FaultCountProvider = FaultCountProvider_1 = __decorate([
        Injectable()
    ], FaultCountProvider);
    return FaultCountProvider;
}());
export { FaultCountProvider };
//# sourceMappingURL=fault-count.js.map