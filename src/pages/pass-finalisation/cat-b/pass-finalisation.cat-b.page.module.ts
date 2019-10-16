import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassFinalisationCatBPage } from './pass-finalisation.cat-b.page';
import { EffectsModule } from '@ngrx/effects';
import { PassFinalisationAnalyticsEffects } from '../pass-finalisation.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { TestFinalisationComponentsModule } from
'../../../components/test-finalisation/test-finalisation-component.module';
import { PassFinalisationCatBComponentsModule } from './components/pass-finalisation-components.module';

@NgModule({
  declarations: [
    PassFinalisationCatBPage,
  ],
  imports: [
    IonicPageModule.forChild(PassFinalisationCatBPage),
    EffectsModule.forFeature([PassFinalisationAnalyticsEffects]),
    ComponentsModule,
    TestFinalisationComponentsModule,
    PassFinalisationCatBComponentsModule,
  ],
})
export class PassFinalisationCatBPageModule {}
