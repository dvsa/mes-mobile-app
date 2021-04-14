var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { AccompanimentCardCatCPCComponent } from './accompaniment-card/accompaniment-card.cat-cpc';
import { WaitingRoomToCarComponentsModule } from '../../components/waiting-room-to-car.components.module';
import { CombinationComponent } from './combination/combination';
import { VehicleDetailsCatCPCComponent } from './vehicle-details/vehicle-details';
var WaitingRoomToCarCatCPCComponentsModule = /** @class */ (function () {
    function WaitingRoomToCarCatCPCComponentsModule() {
    }
    WaitingRoomToCarCatCPCComponentsModule = __decorate([
        NgModule({
            declarations: [
                AccompanimentCardCatCPCComponent,
                CombinationComponent,
                VehicleDetailsCatCPCComponent,
            ],
            imports: [
                IonicModule,
                ComponentsModule,
                WaitingRoomToCarComponentsModule,
            ],
            exports: [
                AccompanimentCardCatCPCComponent,
                CombinationComponent,
                VehicleDetailsCatCPCComponent,
            ],
        })
    ], WaitingRoomToCarCatCPCComponentsModule);
    return WaitingRoomToCarCatCPCComponentsModule;
}());
export { WaitingRoomToCarCatCPCComponentsModule };
//# sourceMappingURL=waiting-room-to-car.cat-cpc.components.module.js.map