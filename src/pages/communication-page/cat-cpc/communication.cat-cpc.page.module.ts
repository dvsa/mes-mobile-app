import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects';

import { ComponentsModule } from '../../../components/common/common-components.module';
import { CommunicationCatCPCPage } from './communication.cat-cpc.page';
import { CommunicationAnalyticsEffects } from '../communication.analytics.effects';
import { CommunicationEffects } from '../communication.effects';
import { CommunicationComponentsModule } from '../components/communication.components.module';

@NgModule({
  declarations: [
    CommunicationCatCPCPage,
  ],
  imports: [
    IonicPageModule.forChild(CommunicationCatCPCPage),
    EffectsModule.forFeature([
      CommunicationEffects,
      CommunicationAnalyticsEffects,
    ]),
    ComponentsModule,
    TranslateModule,
    CommunicationComponentsModule,
  ],
})
export class CommunicationCatCPCPageModule { }
