import { NgModule } from '@angular/core';
import { LicenseProvidedComponent } from './license-provided/license-provided';
import { PassCertificateNumberComponent } from './pass-certificate-number/pass-certificate-number';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { DirectivesModule } from '../../../directives/directives.module';
import { Code78Component } from './code-78/code-78';
import { LicenceProvidedWarningBannerComponent } from
    './licence-provided-warning-banner/licence-provided-warning-banner';

@NgModule({
  declarations: [
    LicenseProvidedComponent,
    PassCertificateNumberComponent,
    Code78Component,
    LicenceProvidedWarningBannerComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    IonicModule,
    DirectivesModule,
  ],
  exports: [
    LicenseProvidedComponent,
    PassCertificateNumberComponent,
    Code78Component,
    LicenceProvidedWarningBannerComponent,
  ],
})
export class PassFinalisationComponentsModule { }
