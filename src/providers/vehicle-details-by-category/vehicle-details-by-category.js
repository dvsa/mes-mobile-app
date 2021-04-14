var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { getVehicleDetails as getVehicleDetailsC } from '../../modules/tests/vehicle-details/cat-c/vehicle-details.cat-c.reducer';
import { getVehicleDetails as getVehicleDetailsD } from '../../modules/tests/vehicle-details/cat-d/vehicle-details.cat-d.reducer';
import { getVehicleDetails as getVehicleDetailsBE } from '../../modules/tests/vehicle-details/cat-be/vehicle-details.cat-be.reducer';
import { getVehicleDetails as getVehicleDetailsB } from '../../modules/tests/vehicle-details/cat-b/vehicle-details.cat-b.reducer';
import { getVehicleDetails as getVehicleDetailsADI2 } from '../../modules/tests/vehicle-details/cat-adi-part2/vehicle-details.cat-adi-part2.reducer';
import { getVehicleDetails as getVehicleDetailsAM1 } from '../../modules/tests/vehicle-details/cat-a-mod1/vehicle-details.cat-a-mod1.reducer';
import { getVehicleDetails as getVehicleDetailsAM2 } from '../../modules/tests/vehicle-details/cat-a-mod2/vehicle-details.cat-a-mod2.reducer';
import { getVehicleWidth as getVehicleWidthBE, getVehicleLength as getVehicleLengthBE } from '../../modules/tests/vehicle-details/cat-be/vehicle-details.cat-be.selector';
import { getVehicleWidth as getVehicleWidthC, getVehicleLength as getVehicleLengthC } from '../../modules/tests/vehicle-details/cat-c/vehicle-details.cat-c.selector';
import { getVehicleWidth as getVehicleWidthD, getVehicleLength as getVehicleLengthD } from '../../modules/tests/vehicle-details/cat-d/vehicle-details.cat-d.selector';
import { getVehicleDetails } from '../../modules/tests/vehicle-details/common/vehicle-details.reducer';
var VehicleDetailsByCategoryProvider = /** @class */ (function () {
    function VehicleDetailsByCategoryProvider() {
    }
    VehicleDetailsByCategoryProvider_1 = VehicleDetailsByCategoryProvider;
    VehicleDetailsByCategoryProvider.prototype.getVehicleDetailsByCategoryCode = function (category) {
        switch (category) {
            case "ADI2" /* ADI2 */:
                return {
                    vehicleDetails: getVehicleDetailsADI2,
                    vehicleWidth: null,
                    vehicleLength: null,
                };
            case "B" /* B */:
                return {
                    vehicleDetails: getVehicleDetailsB,
                    vehicleWidth: null,
                    vehicleLength: null,
                };
            case "B+E" /* BE */:
                return {
                    vehicleDetails: getVehicleDetailsBE,
                    vehicleWidth: getVehicleWidthBE,
                    vehicleLength: getVehicleLengthBE,
                };
            case "C" /* C */:
            case "C1" /* C1 */:
            case "C+E" /* CE */:
            case "C1+E" /* C1E */:
                return {
                    vehicleDetails: getVehicleDetailsC,
                    vehicleWidth: getVehicleWidthC,
                    vehicleLength: getVehicleLengthC,
                };
            case "D" /* D */:
            case "D1" /* D1 */:
            case "D+E" /* DE */:
            case "D1+E" /* D1E */:
                return {
                    vehicleDetails: getVehicleDetailsD,
                    vehicleWidth: getVehicleWidthD,
                    vehicleLength: getVehicleLengthD,
                };
            case "F" /* F */:
            case "G" /* G */:
            case "H" /* H */:
            case "K" /* K */:
                return {
                    vehicleDetails: getVehicleDetails,
                    vehicleWidth: null,
                    vehicleLength: null,
                };
            case "EUA1M1" /* EUA1M1 */:
            case "EUA2M1" /* EUA2M1 */:
            case "EUAM1" /* EUAM1 */:
            case "EUAMM1" /* EUAMM1 */:
                return {
                    vehicleDetails: getVehicleDetailsAM1,
                    vehicleWidth: null,
                    vehicleLength: null,
                };
            case "EUA1M2" /* EUA1M2 */:
            case "EUA2M2" /* EUA2M2 */:
            case "EUAM2" /* EUAM2 */:
            case "EUAMM2" /* EUAMM2 */:
                return {
                    vehicleDetails: getVehicleDetailsAM2,
                    vehicleWidth: null,
                    vehicleLength: null,
                };
            default:
                throw new Error(VehicleDetailsByCategoryProvider_1.getVehicleDetailsByCategoryCodeErrMsg);
        }
    };
    var VehicleDetailsByCategoryProvider_1;
    VehicleDetailsByCategoryProvider.getVehicleDetailsByCategoryCodeErrMsg = 'Error getting test category vehicle details';
    VehicleDetailsByCategoryProvider = VehicleDetailsByCategoryProvider_1 = __decorate([
        Injectable()
    ], VehicleDetailsByCategoryProvider);
    return VehicleDetailsByCategoryProvider;
}());
export { VehicleDetailsByCategoryProvider };
//# sourceMappingURL=vehicle-details-by-category.js.map