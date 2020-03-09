import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassFinalisationCatHomeTestPage } from './pass-finalisation.cat-home-test.page';
import { EffectsModule } from '@ngrx/effects';
import { PassFinalisationAnalyticsEffects } from '../pass-finalisation.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { TestFinalisationComponentsModule } from
'../../../components/test-finalisation/test-finalisation-component.module';
import { PassFinalisationComponentsModule } from '../components/pass-finalisation-components.module';

@NgModule({
  declarations: [
    PassFinalisationCatHomeTestPage,
  ],
  imports: [
    IonicPageModule.forChild(PassFinalisationCatHomeTestPage),
    EffectsModule.forFeature([PassFinalisationAnalyticsEffects]),
    ComponentsModule,
    TestFinalisationComponentsModule,
    PassFinalisationComponentsModule,
  ],
})
export class PassFinalisationCatHomeTestPageModule {}
