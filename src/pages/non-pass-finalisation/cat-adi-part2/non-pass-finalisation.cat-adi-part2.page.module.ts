import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { TestFinalisationComponentsModule } from
  '../../../components/test-finalisation/test-finalisation-component.module';
import { NonPassFinalisationCatADIPart2Page } from './non-pass-finalisation.cat-adi-part2.page';
import { NonPassFinalisationAnalyticsEffects } from '../non-pass-finalisation.analytics.effects';
import {
  ActivityCodeFinalisationProvider,
} from '../../../providers/activity-code-finalisation/activity-code-finalisation';

@NgModule({
  declarations: [
    NonPassFinalisationCatADIPart2Page,
  ],
  imports: [
    IonicPageModule.forChild(NonPassFinalisationCatADIPart2Page),
    EffectsModule.forFeature([NonPassFinalisationAnalyticsEffects]),
    ComponentsModule,
    TestFinalisationComponentsModule,
  ],
  providers: [ActivityCodeFinalisationProvider],
})
export class NonPassFinalisationCatADIPart2PageModule { }
