import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';

import { ComponentsModule } from '../../../components/common/common-components.module';
import {
  TestFinalisationComponentsModule,
} from '../../../components/test-finalisation/test-finalisation-component.module';
import { NonPassFinalisationCatCPCPage } from './non-pass-finalisation.cat-cpc.page';
import { NonPassFinalisationAnalyticsEffects } from '../non-pass-finalisation.analytics.effects';

@NgModule({
  declarations: [
    NonPassFinalisationCatCPCPage,
  ],
  imports: [
    IonicPageModule.forChild(NonPassFinalisationCatCPCPage),
    EffectsModule.forFeature([NonPassFinalisationAnalyticsEffects]),
    ComponentsModule,
    TestFinalisationComponentsModule,
  ],
})
export class NonPassFinalisationCatCPCPageModule { }
