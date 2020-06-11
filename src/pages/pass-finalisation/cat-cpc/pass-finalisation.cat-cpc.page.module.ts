import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';

import { ComponentsModule } from '../../../components/common/common-components.module';
import { PassFinalisationAnalyticsEffects } from '../pass-finalisation.analytics.effects';
import {
  TestFinalisationComponentsModule,
} from '../../../components/test-finalisation/test-finalisation-component.module';
import { PassFinalisationComponentsModule } from '../components/pass-finalisation-components.module';
import { PassFinalisationCatCPCPage } from './pass-finalisation.cat-cpc.page';

@NgModule({
  declarations: [
    PassFinalisationCatCPCPage,
  ],
  imports: [
    IonicPageModule.forChild(PassFinalisationCatCPCPage),
    EffectsModule.forFeature([PassFinalisationAnalyticsEffects]),
    ComponentsModule,
    TestFinalisationComponentsModule,
    PassFinalisationComponentsModule,
  ],
})
export class PassFinalisationCatCPCPageModule {}
