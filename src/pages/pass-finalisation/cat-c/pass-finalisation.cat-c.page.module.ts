import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassFinalisationCatCPage } from './pass-finalisation.cat-c.page';
import { EffectsModule } from '@ngrx/effects';
import { PassFinalisationAnalyticsEffects } from '../pass-finalisation.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { TestFinalisationComponentsModule } from
'../../../components/test-finalisation/test-finalisation-component.module';
import { PassFinalisationComponentsModule } from '../components/pass-finalisation-components.module';

@NgModule({
  declarations: [
    PassFinalisationCatCPage,
  ],
  imports: [
    IonicPageModule.forChild(PassFinalisationCatCPage),
    EffectsModule.forFeature([PassFinalisationAnalyticsEffects]),
    ComponentsModule,
    TestFinalisationComponentsModule,
    PassFinalisationComponentsModule,
  ],
})
export class PassFinalisationCatCPageModule {}
