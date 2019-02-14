import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '../../components/components.module';
import { CandidateDetailsPage } from './candidate-details';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { CandidateDetailsAnalyticsEffects } from './candidate-details.analytics.effects';


@NgModule({
  declarations: [
    CandidateDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CandidateDetailsPage),
    EffectsModule.forFeature([CandidateDetailsAnalyticsEffects]),
    ComponentsModule,
  ],
  providers: [
    AnalyticsProvider
  ]
})
export class CandidateDetailsPageModule {}
 