import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { CommunicationCatBePage } from './communication.cat-be.page';
import { TranslateModule } from 'ng2-translate';
import { EffectsModule } from '@ngrx/effects';
import { CommunicationAnalyticsEffects } from '../communication.analytics.effects';
import { CommunicationEffects } from '../communication.effects';
import { CommunicationComponentsModule } from '../common/communication.components.module';

@NgModule({
  declarations: [
    CommunicationCatBePage,
  ],
  imports: [
    IonicPageModule.forChild(CommunicationCatBePage),
    EffectsModule.forFeature([
      CommunicationEffects,
      CommunicationAnalyticsEffects,
    ]),
    ComponentsModule,
    TranslateModule,
    CommunicationComponentsModule,
  ],
})
export class CommunicationCatBePageModule { }
