import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfficePage } from './office';
import { EffectsModule } from '@ngrx/effects';
import { OfficeAnalyticsEffects } from './office.analytics.effects';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { ComponentsModule } from '../../components/components.module';
import { OfficeComponentsModule } from './components/office.components.module';
import { RouteNumberComponent } from './components/route-number/route-number';
import { CandidateDescriptionComponent } from './components/candidate-description/candidate-description';
import { DebriefWitnessedComponent } from './components/debrief-witnessed/debrief-witnessed';
import { IdentificationComponent } from './components/identification/identification';
import { ShowMeQuestionComponent } from './components/show-me-question/show-me-question';
import { WeatherConditionsComponent } from './components/weather-conditions/weather-conditions';
import { D255Component } from './components/d255/d255';
import { AdditionalInformationComponent } from './components/additional-information/additional-information';

@NgModule({
  declarations: [
    OfficePage,
    RouteNumberComponent,
    CandidateDescriptionComponent,
    DebriefWitnessedComponent,
    IdentificationComponent,
    ShowMeQuestionComponent,
    WeatherConditionsComponent,
    D255Component,
    AdditionalInformationComponent,
  ],
  imports: [
    IonicPageModule.forChild(OfficePage),
    EffectsModule.forFeature([OfficeAnalyticsEffects]),
    ComponentsModule,
    OfficeComponentsModule,
  ],
  providers: [
    AnalyticsProvider,
  ],
})
export class OfficePageModule { }
