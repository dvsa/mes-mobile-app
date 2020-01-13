import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassFinalisationCatAMod1Page } from './pass-finalisation.cat-a-mod1.page';
import { EffectsModule } from '@ngrx/effects';
import { PassFinalisationAnalyticsEffects } from '../pass-finalisation.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { TestFinalisationComponentsModule } from
'../../../components/test-finalisation/test-finalisation-component.module';
import { PassFinalisationComponentsModule } from '../components/pass-finalisation-components.module';

@NgModule({
  declarations: [
    PassFinalisationCatAMod1Page,
  ],
  imports: [
    IonicPageModule.forChild(PassFinalisationCatAMod1Page),
    EffectsModule.forFeature([PassFinalisationAnalyticsEffects]),
    ComponentsModule,
    TestFinalisationComponentsModule,
    PassFinalisationComponentsModule,
  ],
})
export class PassFinalisationCatAMod1PageModule {}
