import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/components.module';
import { EyesightTestComponent } from './eyesight-test/eyesight-test';
import { EyesightFailureConfirmationComponent } from './eyesight-failure-confirmation/eyesight-failure-confirmation';
import { VehicleRegistrationComponent } from './vehicle-registration/vehicle-registration';
import { InstructorRegistrationComponent } from './instructor-registration/instructor-registration';
import { TransmissionComponent } from './transmission/transmission';
import { TellMeQuestionCardComponent } from './tell-me-question-card/tell-me-question-card';
import { TellMeQuestionComponent } from './tell-me-question/tell-me-question';
import { TellMeQuestionOutcomeComponent } from './tell-me-question-outcome/tell-me-question-outcome';
import { AccompanimentCardComponent } from './accompaniment-card/accompaniment-card';
import { AccompanimentComponent } from './accompaniment/accompaniment';
import { VehicleDetailsCardComponent } from './vehicle-details-card/vehicle-details-card';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details';

@NgModule({
  declarations: [
    EyesightTestComponent,
    EyesightFailureConfirmationComponent,
    VehicleRegistrationComponent,
    InstructorRegistrationComponent,
    TransmissionComponent,
    TellMeQuestionCardComponent,
    TellMeQuestionComponent,
    TellMeQuestionOutcomeComponent,
    AccompanimentCardComponent,
    AccompanimentComponent,
    VehicleDetailsCardComponent,
    VehicleDetailsComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    IonicModule,
  ],
  exports: [
    EyesightTestComponent,
    EyesightFailureConfirmationComponent,
    VehicleRegistrationComponent,
    InstructorRegistrationComponent,
    TransmissionComponent,
    TellMeQuestionCardComponent,
    TellMeQuestionComponent,
    TellMeQuestionOutcomeComponent,
    AccompanimentCardComponent,
    AccompanimentComponent,
    VehicleDetailsCardComponent,
    VehicleDetailsComponent,
  ],
})
export class WaitingRoomToCarComponentsModule { }
