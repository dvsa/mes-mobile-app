import { CommunicationCatHomeTestPage } from './communication.cat-home-test.page';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunicationEffects } from '../communication.effects';
import { CommunicationAnalyticsEffects } from '../communication.analytics.effects';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { CommunicationComponentsModule } from '../components/communication.components.module';

@NgModule({
  declarations: [
    CommunicationCatHomeTestPage,
  ],
  imports: [
    IonicPageModule.forChild(CommunicationCatHomeTestPage),
    EffectsModule.forFeature([
      CommunicationEffects,
      CommunicationAnalyticsEffects,
    ]),
    ComponentsModule,
    TranslateModule,
    CommunicationComponentsModule,
  ],
})
export class CommunicationCatHomeTestPageModule { }
