import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { TestFinalisationComponentsModule } from
  '../../../components/test-finalisation/test-finalisation-component.module';
import { NonPassFinalisationCatHomeTestPage } from './non-pass-finalisation.cat-home-test.page';
import { NonPassFinalisationAnalyticsEffects } from '../non-pass-finalisation.analytics.effects';
import {
  ActivityCodeFinalisationProvider,
} from '../../../providers/activity-code-finalisation/activity-code-finalisation';

@NgModule({
  declarations: [
    NonPassFinalisationCatHomeTestPage,
  ],
  imports: [
    IonicPageModule.forChild(NonPassFinalisationCatHomeTestPage),
    EffectsModule.forFeature([NonPassFinalisationAnalyticsEffects]),
    ComponentsModule,
    TestFinalisationComponentsModule,
  ],
  providers: [ActivityCodeFinalisationProvider],
})
export class NonPassFinalisationCatHomeTestPageModule { }
