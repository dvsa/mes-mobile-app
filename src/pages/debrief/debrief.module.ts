import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DebriefPage } from './debrief';
import { EffectsModule } from '@ngrx/effects';
import { DebriefAnalyticsEffects } from './debrief.analytics.effects';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DebriefPage,
  ],
  imports: [
    IonicPageModule.forChild(DebriefPage),
    EffectsModule.forFeature([DebriefAnalyticsEffects]),
    ComponentsModule,
  ],
  providers: [
    AnalyticsProvider,
  ],
})
export class DebriefPageModule {}
