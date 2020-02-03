import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { CommunicationCatDPage } from './communication.cat-d.page';
import { TranslateModule } from 'ng2-translate';
import { EffectsModule } from '@ngrx/effects';
import { CommunicationAnalyticsEffects } from '../communication.analytics.effects';
import { CommunicationEffects } from '../communication.effects';
import { CommunicationComponentsModule } from '../components/communication.components.module';

@NgModule({
  declarations: [
    CommunicationCatDPage,
  ],
  imports: [
    IonicPageModule.forChild(CommunicationCatDPage),
    EffectsModule.forFeature([
      CommunicationEffects,
      CommunicationAnalyticsEffects,
    ]),
    ComponentsModule,
    TranslateModule,
    CommunicationComponentsModule,
  ],
})
export class CommunicationCatDPageModule { }
