import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { TestFinalisationComponentsModule } from
  '../../../components/test-finalisation/test-finalisation-component.module';
import { NonPassFinalisationCatDPage } from './non-pass-finalisation.cat-d.page';
import { NonPassFinalisationAnalyticsEffects } from '../non-pass-finalisation.analytics.effects';
import {
  ActivityCodeFinalisationProvider,
} from '../../../providers/activity-code-finalisation/activity-code-finalisation';

@NgModule({
  declarations: [
    NonPassFinalisationCatDPage,
  ],
  imports: [
    IonicPageModule.forChild(NonPassFinalisationCatDPage),
    EffectsModule.forFeature([NonPassFinalisationAnalyticsEffects]),
    ComponentsModule,
    TestFinalisationComponentsModule,
  ],
  providers: [ActivityCodeFinalisationProvider],
})
export class NonPassFinalisationCatDPageModule { }
