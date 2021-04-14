var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { VehicleChecksCatAMod2Component } from './vehicle-checks/vehicle-checks';
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../../../components/common/common-components.module';
var WaitingRoomToCarCatAMod2ComponentsModule = /** @class */ (function () {
    function WaitingRoomToCarCatAMod2ComponentsModule() {
    }
    WaitingRoomToCarCatAMod2ComponentsModule = __decorate([
        NgModule({
            declarations: [
                VehicleChecksCatAMod2Component,
            ],
            imports: [
                IonicModule,
                ComponentsModule,
            ],
            exports: [
                VehicleChecksCatAMod2Component,
            ],
        })
    ], WaitingRoomToCarCatAMod2ComponentsModule);
    return WaitingRoomToCarCatAMod2ComponentsModule;
}());
export { WaitingRoomToCarCatAMod2ComponentsModule };
//# sourceMappingURL=waiting-room-to-car.cat-a-mod2.components.module.js.map