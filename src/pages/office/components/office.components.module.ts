import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { ComponentsModule } from '../../../components/common/common-components.module';
import { FaultCommentComponent } from './fault-comment/fault-comment';
import { FaultCommentCardComponent } from './fault-comment-card/fault-comment-card';
import { RouteNumberComponent } from './route-number/route-number';
import { CandidateDescriptionComponent } from './candidate-description/candidate-description';
import { IdentificationComponent } from './identification/identification';
import { ShowMeQuestionComponent } from './show-me-question/show-me-question';
import { WeatherConditionsComponent } from './weather-conditions/weather-conditions';
import { AdditionalInformationComponent } from './additional-information/additional-information';
import { DirectivesModule } from '../../../directives/directives.module';
import { VehicleChecksOfficeCardComponent } from './vehicle-checks/vehicle-checks-office-card';
import { IndependentDrivingComponent } from './independent-driving/independent-driving';
import { CandidateSectionComponent } from './candidate-section/candidate-section';
import { DateOfTest } from './date-of-test/date-of-test';

@NgModule({
  declarations: [
    FaultCommentComponent,
    FaultCommentCardComponent,
    RouteNumberComponent,
    CandidateDescriptionComponent,
    IdentificationComponent,
    IndependentDrivingComponent,
    ShowMeQuestionComponent,
    WeatherConditionsComponent,
    AdditionalInformationComponent,
    VehicleChecksOfficeCardComponent,
    CandidateSectionComponent,
    DateOfTest,
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
    IndependentDrivingComponent,
    ShowMeQuestionComponent,
    WeatherConditionsComponent,
    AdditionalInformationComponent,
    VehicleChecksOfficeCardComponent,
    CandidateSectionComponent,
    DateOfTest,
  ],
})
export class OfficeComponentsModule { }
