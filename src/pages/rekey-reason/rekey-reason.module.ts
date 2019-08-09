import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RekeyReasonPage } from './rekey-reason';
import { ComponentsModule } from '../../components/components.module';
import { RekeyReasonAnalyticsEffects } from './rekey-reason.analytics.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    RekeyReasonPage,
  ],
  imports: [
    IonicPageModule.forChild(RekeyReasonPage),
    ComponentsModule,
    EffectsModule.forFeature([
      RekeyReasonAnalyticsEffects,
    ]),
  ],
})
export class RekeyReasonPageModule {}
