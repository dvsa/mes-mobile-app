import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Poc } from './poc';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { EmailComposer } from '@ionic-native/email-composer';

@NgModule({
  declarations: [
    Poc,
  ],
  imports: [
    IonicPageModule.forChild(Poc),
  ],
  providers: [
    AnalyticsProvider,
    EmailComposer,
  ],
})
export class PocPageModule {}
