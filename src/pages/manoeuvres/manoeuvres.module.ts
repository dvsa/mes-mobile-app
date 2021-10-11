import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { IonicPageModule } from 'ionic-angular';

import { ManoeuvresPage } from './manoeuvres';
import { ComponentsModule } from '../../components/common/common-components.module';
import { PassFinalisationComponentsModule } from '../pass-finalisation/components/pass-finalisation-components.module';
import { ManoeuvresPageAnalyticsEffects } from './manoeuvres.analytics.effects';

@NgModule({
  declarations: [
    ManoeuvresPage,
  ],
  imports: [
    IonicPageModule.forChild(ManoeuvresPage),
    EffectsModule.forFeature([
      ManoeuvresPageAnalyticsEffects,
    ]),
    ComponentsModule,
    PassFinalisationComponentsModule,
  ],
})
export class ManoeuvrePageModule {}
