import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { Code78ProvidedComponent } from './code-78-provided/code-78-provided';
import { LicenseIssuedBannerComponent } from './license-issued-banner/license-issued-banner';
import { IonicModule } from 'ionic-angular';
import { PassFinalisationComponentsModule } from '../../components/pass-finalisation-components.module';

@NgModule({
  declarations: [
    Code78ProvidedComponent,
    LicenseIssuedBannerComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    ComponentsModule,
    PassFinalisationComponentsModule,
  ],
  exports:[
    Code78ProvidedComponent,
    LicenseIssuedBannerComponent,
  ],
})
export class PassFinalisationCatBEComponentsModule {}
