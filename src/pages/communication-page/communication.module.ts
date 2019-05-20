import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { CommunicationPage } from './communication';
import { ProvidedEmailComponent } from './components/provided-email/provided-email';
import { NewEmailComponent } from './components/new-email/new-email';
import { PostalAddressComponent } from './components/postal-address/postal-address';

@NgModule({
  declarations: [
    CommunicationPage,
    ProvidedEmailComponent,
    NewEmailComponent,
    PostalAddressComponent,
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
