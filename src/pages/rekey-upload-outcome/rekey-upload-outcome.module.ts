import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RekeyUploadOutcomePage } from './rekey-upload-outcome';
import { EffectsModule } from '@ngrx/effects';
import { RekeyUploadOutcomeAnalyticsEffects } from './rekey-upload-outcome.analytics.effects';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { ComponentsModule } from '../../components/common/common-components.module';

@NgModule({
  declarations: [
    RekeyUploadOutcomePage,
  ],
  imports: [
    IonicPageModule.forChild(RekeyUploadOutcomePage),
    EffectsModule.forFeature([RekeyUploadOutcomeAnalyticsEffects]),
    ComponentsModule,
  ],
  providers: [
    AnalyticsProvider,
  ],
})
export class RekeyUploadOutcomePageModule {}
