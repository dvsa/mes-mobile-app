import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DebriefPage } from './debrief';
import { EffectsModule } from '@ngrx/effects';
import { DebriefAnalyticsEffects } from './debrief.analytics.effects';
import { AnalyticsProvider } from '../../providers/analytics/analytics';

@NgModule({
  declarations: [
    DebriefPage,
  ],
  imports: [
    IonicPageModule.forChild(DebriefPage),
    EffectsModule.forFeature([DebriefAnalyticsEffects]),
  ],
  providers: [
    AnalyticsProvider,
  ],
})
export class DebriefPageModule {}
