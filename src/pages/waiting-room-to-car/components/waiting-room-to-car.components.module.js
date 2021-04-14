var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { EyesightTestComponent } from './eyesight-test/eyesight-test';
import { EyesightFailureConfirmationComponent } from './eyesight-failure-confirmation/eyesight-failure-confirmation';
import { VehicleRegistrationComponent } from './vehicle-registration/vehicle-registration';
import { AccompanimentCardComponent } from './accompaniment-card/accompaniment-card';
import { AccompanimentComponent } from './accompaniment/accompaniment';
import { VehicleDetailsCardComponent } from './vehicle-details-card/vehicle-details-card';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details';
import { DirectivesModule } from '../../../directives/directives.module';
import { VehicleChecksToggleComponent } from './vehicle-checks-completed/vehicle-checks-completed';
import { CandidateDeclarationSignedComponent } from './candidate-declaration/candidate-declaration';
var WaitingRoomToCarComponentsModule = /** @class */ (function () {
    function WaitingRoomToCarComponentsModule() {
    }
    WaitingRoomToCarComponentsModule = __decorate([
        NgModule({
            declarations: [
                EyesightTestComponent,
                EyesightFailureConfirmationComponent,
                VehicleRegistrationComponent,
                AccompanimentCardComponent,
                AccompanimentComponent,
                VehicleDetailsCardComponent,
                VehicleDetailsComponent,
                VehicleChecksToggleComponent,
                CandidateDeclarationSignedComponent,
            ],
            imports: [
                CommonModule,
                ComponentsModule,
                IonicModule,
                DirectivesModule,
            ],
            exports: [
                EyesightTestComponent,
                EyesightFailureConfirmationComponent,
                VehicleRegistrationComponent,
                AccompanimentCardComponent,
                AccompanimentComponent,
                VehicleDetailsCardComponent,
                VehicleDetailsComponent,
                VehicleChecksToggleComponent,
                CandidateDeclarationSignedComponent,
            ],
        })
    ], WaitingRoomToCarComponentsModule);
    return WaitingRoomToCarComponentsModule;
}());
export { WaitingRoomToCarComponentsModule };
//# sourceMappingURL=waiting-room-to-car.components.module.js.map