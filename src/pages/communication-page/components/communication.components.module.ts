import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { ProvidedEmailComponent } from './provided-email/provided-email';
import { NewEmailComponent } from './new-email/new-email';
import { PostalAddressComponent } from './postal-address/postal-address';
import { PrivacyNoticeComponent } from './privacy-notice/privacy-notice';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../components/common/common-components.module';

@NgModule({
  declarations: [
    ProvidedEmailComponent,
    NewEmailComponent,
    PostalAddressComponent,
    PrivacyNoticeComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    IonicModule,
    TranslateModule,
  ],
  exports: [
    ProvidedEmailComponent,
    NewEmailComponent,
    PostalAddressComponent,
    PrivacyNoticeComponent,
  ],
})
export class CommunicationComponentsModule { }
