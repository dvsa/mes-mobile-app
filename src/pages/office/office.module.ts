import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfficePage } from './office';
import { EffectsModule } from '@ngrx/effects';
import { OfficeAnalyticsEffects } from './office.analytics.effects';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { ComponentsModule } from '../../components/components.module';
import { RouteNumberComponent } from './components/route-number/route-number';
import { WeatherConditionsComponent } from './components/weather-conditions/weather-conditions';
import { IndependentDrivingComponent } from './components/independent-driving/independent-driving';
import { CandidateDescriptionComponent } from './components/candidate-description/candidate-description';
@NgModule({
  declarations: [
    OfficePage,
    RouteNumberComponent,
    WeatherConditionsComponent,
    IndependentDrivingComponent,
    CandidateDescriptionComponent,
  ],
  imports: [
    IonicPageModule.forChild(OfficePage),
    EffectsModule.forFeature([OfficeAnalyticsEffects]),
    ComponentsModule,
  ],
  providers: [
    AnalyticsProvider,
  ],
})
export class OfficePageModule { }
