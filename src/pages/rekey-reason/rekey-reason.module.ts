import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RekeyReasonPage } from './rekey-reason';
import { RekeyReasonAnalyticsEffects } from './rekey-reason.analytics.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    RekeyReasonPage,
  ],
  imports: [
    IonicPageModule.forChild(RekeyReasonPage),
    EffectsModule.forFeature([
      RekeyReasonAnalyticsEffects,
    ]),
  ],
})
export class RekeyReasonPageModule {}
