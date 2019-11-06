import { NgModule } from '@angular/core';
import { LicenseProvidedComponent } from './license-provided/license-provided';
import { PassCertificateNumberComponent } from './pass-certificate-number/pass-certificate-number';
import { TransmissionComponent } from '../../../components/test-finalisation/transmission/transmission';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { DirectivesModule } from '../../../directives/directives.module';

@NgModule({
  declarations: [
    LicenseProvidedComponent,
    PassCertificateNumberComponent,
    TransmissionComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    IonicModule,
    DirectivesModule,
  ],
  exports: [
    LicenseProvidedComponent,
    TransmissionComponent,
    PassCertificateNumberComponent,
  ],
})
export class PassFinalisationComponentsModule { }
