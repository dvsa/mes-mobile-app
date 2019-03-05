import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';
import { CandidateDetailsPage } from './candidate-details';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { CandidateDetailsAnalyticsEffects } from './candidate-details.analytics.effects';
import { CandidateDetailsLogsEffects } from './candidate-details.logs.effects';

@NgModule({
  declarations: [
    CandidateDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CandidateDetailsPage),
    EffectsModule.forFeature([
      CandidateDetailsAnalyticsEffects,
      CandidateDetailsLogsEffects,
    ]),
  ],
  providers: [
    AnalyticsProvider,
  ],
})
export class CandidateDetailsPageModule {}
