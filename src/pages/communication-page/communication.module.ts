import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { CommunicationPage } from './communication';
import { TranslateModule } from 'ng2-translate';
import { EffectsModule } from '@ngrx/effects';
import { CommunicationAnalyticsEffects } from './communication.analytics.effects';
import { CommunicationComponentsModule } from './components/communication.components.module';
import { CommunicationEffects } from './communication.effects';

@NgModule({
  declarations: [
    CommunicationPage,
  ],
  imports: [
    IonicPageModule.forChild(CommunicationPage),
    EffectsModule.forFeature([
      CommunicationEffects,
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
