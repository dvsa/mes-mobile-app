var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { VehicleChecksCatHomeTestComponent } from './vehicle-checks/vehicle-checks';
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../../../components/common/common-components.module';
var WaitingRoomToCarCatHomeTestComponentsModule = /** @class */ (function () {
    function WaitingRoomToCarCatHomeTestComponentsModule() {
    }
    WaitingRoomToCarCatHomeTestComponentsModule = __decorate([
        NgModule({
            declarations: [
                VehicleChecksCatHomeTestComponent,
            ],
            imports: [
                IonicModule,
                ComponentsModule,
            ],
            exports: [
                VehicleChecksCatHomeTestComponent,
            ],
        })
    ], WaitingRoomToCarCatHomeTestComponentsModule);
    return WaitingRoomToCarCatHomeTestComponentsModule;
}());
export { WaitingRoomToCarCatHomeTestComponentsModule };
//# sourceMappingURL=waiting-room-to-car.cat-home-test.components.module.js.map