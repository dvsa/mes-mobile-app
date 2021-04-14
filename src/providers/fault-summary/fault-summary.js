var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { FaultCountProvider } from '../fault-count/fault-count';
import { FaultSummaryCatBHelper } from './cat-b/fault-summary.cat-b';
import { FaultSummaryCatBEHelper } from './cat-be/fault-summary.cat-be';
import { FaultSummaryCatCHelper } from './cat-c/fault-summary.cat-c';
import { FaultSummaryCatDHelper } from './cat-d/fault-summary.cat-d';
import { FaultSummaryCatHomeTestHelper } from './cat-home-test/fault-summary.cat-home-test';
import { FaultSummaryCatAM1Helper } from './cat-a-mod1/fault-summary.cat-a-mod1';
import { FaultSummaryCatAM2Helper } from './cat-a-mod2/fault-summary.cat-a-mod2';
import { FaultSummaryCatAdiPart2Helper } from './cat-adi-part2/fault-summary.cat-adi-part2';
var FaultSummaryProvider = /** @class */ (function () {
    function FaultSummaryProvider(faultCountProvider) {
        this.faultCountProvider = faultCountProvider;
    }
    FaultSummaryProvider.prototype.getDrivingFaultsList = function (data, category) {
        switch (category) {
            case "ADI2" /* ADI2 */:
                return FaultSummaryCatAdiPart2Helper.getDrivingFaultsCatAdiPart2(data, this.faultCountProvider.getVehicleChecksFaultCount("ADI2" /* ADI2 */, data.vehicleChecks));
            case "B" /* B */:
                return FaultSummaryCatBHelper.getDrivingFaultsCatB(data);
            case "B+E" /* BE */:
                return FaultSummaryCatBEHelper.getDrivingFaultsCatBE(data, this.faultCountProvider.getVehicleChecksFaultCount("B+E" /* BE */, data.vehicleChecks));
            case "C" /* C */:
                return FaultSummaryCatCHelper.getDrivingFaultsNonTrailer(data, "C" /* C */, this.faultCountProvider.getVehicleChecksFaultCount("C" /* C */, data.vehicleChecks));
            case "C1" /* C1 */:
                return FaultSummaryCatCHelper.getDrivingFaultsNonTrailer(data, "C1" /* C1 */, this.faultCountProvider.getVehicleChecksFaultCount("C1" /* C1 */, data.vehicleChecks));
            case "C+E" /* CE */:
                return FaultSummaryCatCHelper.getDrivingFaultsTrailer(data, "C+E" /* CE */, this.faultCountProvider.getVehicleChecksFaultCount("C+E" /* CE */, data.vehicleChecks));
            case "C1+E" /* C1E */:
                return FaultSummaryCatCHelper.getDrivingFaultsTrailer(data, "C1+E" /* C1E */, this.faultCountProvider.getVehicleChecksFaultCount("C1+E" /* C1E */, data.vehicleChecks));
            case "D" /* D */:
                return FaultSummaryCatDHelper.getDrivingFaultsNonTrailer(data, "D" /* D */, this.faultCountProvider.getVehicleChecksFaultCount("D" /* D */, data.vehicleChecks));
            case "D1" /* D1 */:
                return FaultSummaryCatDHelper.getDrivingFaultsNonTrailer(data, "D1" /* D1 */, this.faultCountProvider.getVehicleChecksFaultCount("D1" /* D1 */, data.vehicleChecks));
            case "D+E" /* DE */:
                return FaultSummaryCatDHelper.getDrivingFaultsTrailer(data, "D+E" /* DE */, this.faultCountProvider.getVehicleChecksFaultCount("D+E" /* DE */, data.vehicleChecks));
            case "D1+E" /* D1E */:
                return FaultSummaryCatDHelper.getDrivingFaultsTrailer(data, "D1+E" /* D1E */, this.faultCountProvider.getVehicleChecksFaultCount("D1+E" /* D1E */, data.vehicleChecks));
            case "EUAM1" /* EUAM1 */:
            case "EUA1M1" /* EUA1M1 */:
            case "EUA2M1" /* EUA2M1 */:
            case "EUAMM1" /* EUAMM1 */:
                return FaultSummaryCatAM1Helper.getDrivingFaultsCatAM1(data);
            case "EUAM2" /* EUAM2 */:
            case "EUA1M2" /* EUA1M2 */:
            case "EUA2M2" /* EUA2M2 */:
            case "EUAMM2" /* EUAMM2 */:
                return FaultSummaryCatAM2Helper.getDrivingFaultsCatAM2(data);
            case "F" /* F */:
            case "G" /* G */:
            case "H" /* H */:
            case "K" /* K */:
                return FaultSummaryCatHomeTestHelper.getDrivingFaultsCatHomeTest(data);
            default:
                return [];
        }
    };
    FaultSummaryProvider.prototype.getSeriousFaultsList = function (data, category) {
        switch (category) {
            case "ADI2" /* ADI2 */:
                return FaultSummaryCatAdiPart2Helper.getSeriousFaultsCatAdiPart2(data);
            case "B" /* B */:
                return FaultSummaryCatBHelper.getSeriousFaultsCatB(data);
            case "B+E" /* BE */:
                return FaultSummaryCatBEHelper.getSeriousFaultsCatBE(data);
            case "C1" /* C1 */:
            case "C" /* C */:
                return FaultSummaryCatCHelper.getSeriousFaultsNonTrailer(data);
            case "C1+E" /* C1E */:
            case "C+E" /* CE */:
                return FaultSummaryCatCHelper.getSeriousFaultsTrailer(data);
            case "D1" /* D1 */:
            case "D" /* D */:
                return FaultSummaryCatDHelper.getSeriousFaultsNonTrailer(data);
            case "D1+E" /* D1E */:
            case "D+E" /* DE */:
                return FaultSummaryCatDHelper.getSeriousFaultsTrailer(data);
            case "EUAM1" /* EUAM1 */:
            case "EUA1M1" /* EUA1M1 */:
            case "EUA2M1" /* EUA2M1 */:
            case "EUAMM1" /* EUAMM1 */:
                return FaultSummaryCatAM1Helper.getSeriousFaultsCatAM1(data);
            case "EUAM2" /* EUAM2 */:
            case "EUA1M2" /* EUA1M2 */:
            case "EUA2M2" /* EUA2M2 */:
            case "EUAMM2" /* EUAMM2 */:
                return FaultSummaryCatAM2Helper.getSeriousFaultsCatAM2(data);
            case "F" /* F */:
            case "G" /* G */:
            case "H" /* H */:
            case "K" /* K */:
                return FaultSummaryCatHomeTestHelper.getSeriousFaultsCatHomeTest(data);
            default:
                return [];
        }
    };
    FaultSummaryProvider.prototype.getDangerousFaultsList = function (data, category) {
        switch (category) {
            case "ADI2" /* ADI2 */:
                return FaultSummaryCatAdiPart2Helper.getDangerousFaultsCatAdiPart2(data);
            case "B" /* B */:
                return FaultSummaryCatBHelper.getDangerousFaultsCatB(data);
            case "B+E" /* BE */:
                return FaultSummaryCatBEHelper.getDangerousFaultsCatBE(data);
            case "C1" /* C1 */:
            case "C" /* C */:
                return FaultSummaryCatCHelper.getDangerousFaultsNonTrailer(data);
            case "C1+E" /* C1E */:
            case "C+E" /* CE */:
                return FaultSummaryCatCHelper.getDangerousFaultsTrailer(data);
            case "D1" /* D1 */:
            case "D" /* D */:
                return FaultSummaryCatDHelper.getDangerousFaultsNonTrailer(data);
            case "D1+E" /* D1E */:
            case "D+E" /* DE */:
                return FaultSummaryCatDHelper.getDangerousFaultsTrailer(data);
            case "EUAM1" /* EUAM1 */:
            case "EUA1M1" /* EUA1M1 */:
            case "EUA2M1" /* EUA2M1 */:
            case "EUAMM1" /* EUAMM1 */:
                return FaultSummaryCatAM1Helper.getDangerousFaultsCatAM1(data);
            case "EUAM2" /* EUAM2 */:
            case "EUA1M2" /* EUA1M2 */:
            case "EUA2M2" /* EUA2M2 */:
            case "EUAMM2" /* EUAMM2 */:
                return FaultSummaryCatAM2Helper.getDangerousFaultsCatAM2(data);
            case "F" /* F */:
            case "G" /* G */:
            case "H" /* H */:
            case "K" /* K */:
                return FaultSummaryCatHomeTestHelper.getDangerousFaultsCatHomeTest(data);
            default:
                return [];
        }
    };
    FaultSummaryProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [FaultCountProvider])
    ], FaultSummaryProvider);
    return FaultSummaryProvider;
}());
export { FaultSummaryProvider };
//# sourceMappingURL=fault-summary.js.map