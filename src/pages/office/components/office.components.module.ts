import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/components.module';
import { FaultCommentComponent } from './fault-comment/fault-comment';
import { FaultCommentCardComponent } from './fault-comment-card/fault-comment-card';
import { RouteNumberComponent } from './route-number/route-number';
import { CandidateDescriptionComponent } from './candidate-description/candidate-description';
import { DebriefWitnessedComponent } from './debrief-witnessed/debrief-witnessed';
import { IdentificationComponent } from './identification/identification';
import { ShowMeQuestionComponent } from './show-me-question/show-me-question';
import { WeatherConditionsComponent } from './weather-conditions/weather-conditions';
import { D255Component } from './d255/d255';
import { AdditionalInformationComponent } from './additional-information/additional-information';
import { IndependentDrivingComponent } from './independent-driving/independent-driving';
import { ActivityCodeComponent } from './activity-code/activity-code';
import { LanguagePreferencesComponent } from './language-preference/language-preferences';

@NgModule({
  declarations: [
    FaultCommentComponent,
    FaultCommentCardComponent,
    RouteNumberComponent,
    CandidateDescriptionComponent,
    DebriefWitnessedComponent,
    IdentificationComponent,
    ShowMeQuestionComponent,
    WeatherConditionsComponent,
    D255Component,
    AdditionalInformationComponent,
    IndependentDrivingComponent,
    ActivityCodeComponent,
    LanguagePreferencesComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    IonicModule,
  ],
  exports: [
    FaultCommentComponent,
    FaultCommentCardComponent,
    RouteNumberComponent,
    CandidateDescriptionComponent,
    DebriefWitnessedComponent,
    IdentificationComponent,
    ShowMeQuestionComponent,
    WeatherConditionsComponent,
    D255Component,
    AdditionalInformationComponent,
    IndependentDrivingComponent,
    ActivityCodeComponent,
    LanguagePreferencesComponent,
  ],
})
export class OfficeComponentsModule { }
