import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { CommunicationPage } from './communication';

@NgModule({
  declarations: [
    CommunicationPage,
  ],
  imports: [
    IonicPageModule.forChild(CommunicationPage),
    ComponentsModule,
  ],
  providers: [
    AnalyticsProvider,
  ],
})
export class CommunicationPageModule {}
