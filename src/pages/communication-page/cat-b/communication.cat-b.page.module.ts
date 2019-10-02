import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { CommunicationCatBPage } from './communication.cat-b.page';
import { TranslateModule } from 'ng2-translate';
import { EffectsModule } from '@ngrx/effects';
import { CommunicationAnalyticsEffects } from '../communication.analytics.effects';
import { CommunicationComponentsModule } from './components/communication.components.module';
import { CommunicationEffects } from '../communication.effects';

@NgModule({
  declarations: [
    CommunicationCatBPage,
  ],
  imports: [
    IonicPageModule.forChild(CommunicationCatBPage),
    EffectsModule.forFeature([
      CommunicationEffects,
      CommunicationAnalyticsEffects,
    ]),
    ComponentsModule,
    TranslateModule,
    CommunicationComponentsModule,
  ],
})
export class CommunicationCatBPageModule { }
