import { CommunicationCatFGHKPage } from './communication.cat-f-g-h-k.page';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunicationEffects } from '../communication.effects';
import { CommunicationAnalyticsEffects } from '../communication.analytics.effects';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { TranslateModule } from 'ng2-translate';
import { CommunicationComponentsModule } from '../components/communication.components.module';

@NgModule({
  declarations: [
    CommunicationCatFGHKPage,
  ],
  imports: [
    IonicPageModule.forChild(CommunicationCatFGHKPage),
    EffectsModule.forFeature([
      CommunicationEffects,
      CommunicationAnalyticsEffects,
    ]),
    ComponentsModule,
    TranslateModule,
    CommunicationComponentsModule,
  ],
})
export class CommunicationCatFGHKPageModule { }
