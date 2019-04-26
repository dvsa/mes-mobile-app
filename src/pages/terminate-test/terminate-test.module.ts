import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TerminateTestPage } from './terminate-test';
import { EffectsModule } from '@ngrx/effects';
import { TerminateTestAnalyticsEffects } from './terminate-test.analytics.effects';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { EndTestLinkComponent } from './components/end-test-link';

@NgModule({
  declarations: [
    TerminateTestPage,
    EndTestLinkComponent,
  ],
  imports: [
    IonicPageModule.forChild(TerminateTestPage),
    EffectsModule.forFeature([TerminateTestAnalyticsEffects]),
  ],
  providers: [
    AnalyticsProvider,
  ],
  exports: [
    TerminateTestPage,
    EndTestLinkComponent,
  ],
})
export class TerminateTestPageModule {}
