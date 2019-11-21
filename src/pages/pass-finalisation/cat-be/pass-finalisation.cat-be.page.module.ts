import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassFinalisationCatBEPage } from './pass-finalisation.cat-be.page';
import { EffectsModule } from '@ngrx/effects';
import { PassFinalisationAnalyticsEffects } from '../pass-finalisation.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { TestFinalisationComponentsModule } from
'../../../components/test-finalisation/test-finalisation-component.module';
import { PassFinalisationComponentsModule } from '../components/pass-finalisation-components.module';
import { PassFinalisationCatBEComponentsModule } from './components/pass-finalisation.cat-be.components.module';

@NgModule({
  declarations: [
    PassFinalisationCatBEPage,
  ],
  imports: [
    IonicPageModule.forChild(PassFinalisationCatBEPage),
    EffectsModule.forFeature([PassFinalisationAnalyticsEffects]),
    ComponentsModule,
    TestFinalisationComponentsModule,
    PassFinalisationComponentsModule,
    PassFinalisationCatBEComponentsModule,
  ],
})
export class PassFinalisationCatBEPageModule {}
