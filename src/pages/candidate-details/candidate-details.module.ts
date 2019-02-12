import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '../../components/components.module';
import { CandidateDetailsPage } from './candidate-details';
import { AnalyticsEffects } from '../../providers/analytics/analytics.effects';
import { AnalyticsProvider } from '../../providers/analytics/analytics';


@NgModule({
  declarations: [
    CandidateDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CandidateDetailsPage),
    EffectsModule.forFeature([AnalyticsEffects]),
    ComponentsModule,
  ],
  providers: [
    AnalyticsProvider
  ]
})
export class CandidateDetailsPageModule {}
