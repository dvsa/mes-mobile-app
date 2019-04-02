import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BackToOfficePage } from './back-to-office';
import { EffectsModule } from '@ngrx/effects';
import { BackToOfficeAnalyticsEffects } from './back-to-office.analytics.effects';
import { AnalyticsProvider } from '../../providers/analytics/analytics';

@NgModule({
  declarations: [
    BackToOfficePage,
  ],
  imports: [
    IonicPageModule.forChild(BackToOfficePage),
    EffectsModule.forFeature([BackToOfficeAnalyticsEffects]),
  ],
  providers: [
    AnalyticsProvider,
  ],
})
export class BackToOfficePageModule {}
