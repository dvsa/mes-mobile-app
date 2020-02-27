import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { PassCertificateNumberCatAMod1Component } from './pass-certificate-number/pass-certificate-number.cat-a-mod1';
import { ComponentsModule } from '../../../../components/common/common-components.module';

@NgModule({
  declarations: [
    PassCertificateNumberCatAMod1Component,
  ],
  imports: [
    IonicModule,
    CommonModule,
    ComponentsModule,
  ],
  exports:[
    PassCertificateNumberCatAMod1Component,
  ],
})
export class PassFinalisationCatAMod1ComponentsModule {}
