import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/components.module';
import { FaultCommentComponent } from './fault-comment/fault-comment';
import { FaultCommentCardComponent } from './fault-comment-card/fault-comment-card';
import { RouteNumberComponent } from './route-number/route-number';
import { CandidateDescriptionComponent } from './candidate-description/candidate-description';
import { IdentificationComponent } from './identification/identification';
import { ShowMeQuestionComponent } from './show-me-question/show-me-question';
import { WeatherConditionsComponent } from './weather-conditions/weather-conditions';
import { AdditionalInformationComponent } from './additional-information/additional-information';
import { IndependentDrivingComponent } from './independent-driving/independent-driving';
import { ActivityCodeComponent } from './activity-code/activity-code';
import { DirectivesModule } from '../../../directives/directives.module';

@NgModule({
  declarations: [
    FaultCommentComponent,
    FaultCommentCardComponent,
    RouteNumberComponent,
    CandidateDescriptionComponent,
    IdentificationComponent,
    ShowMeQuestionComponent,
    WeatherConditionsComponent,
    AdditionalInformationComponent,
    IndependentDrivingComponent,
    ActivityCodeComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    IonicModule,
    DirectivesModule,
  ],
  exports: [
    FaultCommentComponent,
    FaultCommentCardComponent,
    RouteNumberComponent,
    CandidateDescriptionComponent,
    IdentificationComponent,
    ShowMeQuestionComponent,
    WeatherConditionsComponent,
    AdditionalInformationComponent,
    IndependentDrivingComponent,
    ActivityCodeComponent,
  ],
})
export class OfficeComponentsModule { }
