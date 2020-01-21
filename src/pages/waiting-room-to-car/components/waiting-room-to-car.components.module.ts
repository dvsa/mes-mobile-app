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
import { CategoryTypeComponent } from './category-type/category-type';

@NgModule({
  declarations: [
    EyesightTestComponent,
    EyesightFailureConfirmationComponent,
    VehicleRegistrationComponent,
    AccompanimentCardComponent,
    AccompanimentComponent,
    VehicleDetailsCardComponent,
    VehicleDetailsComponent,
    CategoryTypeComponent,
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
    CategoryTypeComponent,
  ],
})
export class WaitingRoomToCarComponentsModule { }
