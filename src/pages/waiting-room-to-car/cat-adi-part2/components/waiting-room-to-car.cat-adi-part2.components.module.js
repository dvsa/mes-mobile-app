var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { VehicleChecksCatADIPart2Component } from './vehicle-checks/vehicle-checks.cat-adi-part2';
import { DirectivesModule } from '../../../../directives/directives.module';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { AccompanimentCardCatADIPart2Component } from './accompaniment-card/accompaniment-card.cat-adi-part2';
import { WaitingRoomToCarComponentsModule } from '../../components/waiting-room-to-car.components.module';
import { TrainingRecordsCatAdiPart2Component } from './training-records/training-records.cat-adi-part2';
import { OrditTrainerCatAdiPart2Component } from './ordit-trainer/ordit-trainer.cat-adi-part2';
import { TrainerRegistrationNumberCatAdiPart2Component, } from './trainer-registration-number/trainer-registration-number.cat-adi-part2';
var WaitingRoomToCarCatADIPart2ComponentsModule = /** @class */ (function () {
    function WaitingRoomToCarCatADIPart2ComponentsModule() {
    }
    WaitingRoomToCarCatADIPart2ComponentsModule = __decorate([
        NgModule({
            declarations: [
                VehicleChecksCatADIPart2Component,
                AccompanimentCardCatADIPart2Component,
                TrainingRecordsCatAdiPart2Component,
                OrditTrainerCatAdiPart2Component,
                TrainerRegistrationNumberCatAdiPart2Component,
            ],
            imports: [
                CommonModule,
                ComponentsModule,
                IonicModule,
                DirectivesModule,
                WaitingRoomToCarComponentsModule,
            ],
            exports: [
                VehicleChecksCatADIPart2Component,
                AccompanimentCardCatADIPart2Component,
                TrainingRecordsCatAdiPart2Component,
                OrditTrainerCatAdiPart2Component,
                TrainerRegistrationNumberCatAdiPart2Component,
            ],
        })
    ], WaitingRoomToCarCatADIPart2ComponentsModule);
    return WaitingRoomToCarCatADIPart2ComponentsModule;
}());
export { WaitingRoomToCarCatADIPart2ComponentsModule };
//# sourceMappingURL=waiting-room-to-car.cat-adi-part2.components.module.js.map