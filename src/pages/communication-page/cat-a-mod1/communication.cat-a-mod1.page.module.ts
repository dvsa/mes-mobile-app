import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { CommunicationCatAMod1Page } from './communication.cat-a-mod1.page';
import { TranslateModule } from 'ng2-translate';
import { EffectsModule } from '@ngrx/effects';
import { CommunicationAnalyticsEffects } from '../communication.analytics.effects';
import { CommunicationEffects } from '../communication.effects';
import { CommunicationComponentsModule } from '../components/communication.components.module';

@NgModule({
  declarations: [
    CommunicationCatAMod1Page,
  ],
  imports: [
    IonicPageModule.forChild(CommunicationCatAMod1Page),
    EffectsModule.forFeature([
      CommunicationEffects,
      CommunicationAnalyticsEffects,
    ]),
    ComponentsModule,
    TranslateModule,
    CommunicationComponentsModule,
  ],
})
export class CommunicationCatAMod1PageModule { }
