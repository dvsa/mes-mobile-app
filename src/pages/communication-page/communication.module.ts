import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/common/common.components.module';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { CommunicationPage } from './communication';
import { TranslateModule } from 'ng2-translate';
import { EffectsModule } from '@ngrx/effects';
import { CommunicationAnalyticsEffects } from './communication.analytics.effects';
import { CommunicationComponentsModule } from './components/communication.components.module';

@NgModule({
  declarations: [
    CommunicationPage,
  ],
  imports: [
    IonicPageModule.forChild(CommunicationPage),
    EffectsModule.forFeature([
      CommunicationAnalyticsEffects,
    ]),
    ComponentsModule,
    TranslateModule,
    CommunicationComponentsModule,
  ],
  providers: [
    AnalyticsProvider,
  ],
})
export class CommunicationPageModule { }
