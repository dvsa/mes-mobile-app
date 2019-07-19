import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { CommunicationPage } from './communication';
import { ProvidedEmailComponent } from './components/provided-email/provided-email';
import { NewEmailComponent } from './components/new-email/new-email';
import { PostalAddressComponent } from './components/postal-address/postal-address';
import { TranslateModule } from 'ng2-translate';
import { EffectsModule } from '@ngrx/effects';
import { CommunicationAnalyticsEffects } from './communication.analytics.effects';
import { PrivacyNoticeComponent } from './components/privacy-notice/privacy-notice';

@NgModule({
  declarations: [
    CommunicationPage,
    ProvidedEmailComponent,
    NewEmailComponent,
    PostalAddressComponent,
    PrivacyNoticeComponent,
  ],
  imports: [
    IonicPageModule.forChild(CommunicationPage),
    EffectsModule.forFeature([
      CommunicationAnalyticsEffects,
    ]),
    ComponentsModule,
    TranslateModule,
  ],
  providers: [
    AnalyticsProvider,
  ],
})
export class CommunicationPageModule { }
