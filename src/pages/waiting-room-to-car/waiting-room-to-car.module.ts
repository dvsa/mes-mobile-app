import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitingRoomToCarPage } from './waiting-room-to-car';
import { EffectsModule } from '@ngrx/effects';
import { WaitingRoomToCarAnalyticsEffects } from '../waiting-room-to-car/waiting-room-to-car.analytics.effects';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { InputRestrictionNumbersDirective } from '../../directives/input-restriction-numbers.directive';
import {
  InputRestrictionUppercaseAlphanumDirective,
} from '../../directives/input-restriction-uppercasealphanum.directive';
import {
  EyesightFailureConfirmationComponent,
} from './components/eyesight-failure-confirmation/eyesight-failure-confirmation';
import { ComponentsModule } from '../../components/components.module';
import { VehicleRegistrationComponent } from './components/vehicle-registration/vehicle-registration';
import { InstructorRegistrationComponent } from './components/instructor-registration/instructor-registration';
import { TransmissionComponent } from './components/transmission/transmission';
import { TellMeQuestionComponent } from './components/tell-me-question/tell-me-question';
import { TellMeQuestionCardComponent } from './components/tell-me-question-card/tell-me-question-card';
import { TellMeQuestionOutcomeComponent } from './components/tell-me-question-outcome/tell-me-question-outcome';

@NgModule({
  declarations: [
    WaitingRoomToCarPage,
    InputRestrictionNumbersDirective,
    InputRestrictionUppercaseAlphanumDirective,
    EyesightFailureConfirmationComponent,
    VehicleRegistrationComponent,
    InstructorRegistrationComponent,
    TransmissionComponent,
    TellMeQuestionCardComponent,
    TellMeQuestionComponent,
    TellMeQuestionOutcomeComponent,
  ],
  imports: [
    IonicPageModule.forChild(WaitingRoomToCarPage),
    EffectsModule.forFeature([WaitingRoomToCarAnalyticsEffects]),
    ComponentsModule,
  ],
  providers: [
    AnalyticsProvider,
  ],
})
export class WaitingRoomToCarPageModule { }
