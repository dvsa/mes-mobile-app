import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { TestFinalisationComponentsModule } from
  '../../../components/test-finalisation/test-finalisation-component.module';
import { NonPassFinalisationCatAMod1Page } from './non-pass-finalisation.cat-a-mod1.page';
import { NonPassFinalisationAnalyticsEffects } from '../non-pass-finalisation.analytics.effects';
import {
  ActivityCodeFinalisationProvider,
} from '../../../providers/activity-code-finalisation/activity-code-finalisation';

@NgModule({
  declarations: [
    NonPassFinalisationCatAMod1Page,
  ],
  imports: [
    IonicPageModule.forChild(NonPassFinalisationCatAMod1Page),
    EffectsModule.forFeature([NonPassFinalisationAnalyticsEffects]),
    ComponentsModule,
    TestFinalisationComponentsModule,
  ],
  providers: [ActivityCodeFinalisationProvider],
})
export class NonPassFinalisationCatAMod1PageModule { }
