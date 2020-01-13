import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { TestFinalisationComponentsModule } from
  '../../../components/test-finalisation/test-finalisation-component.module';
import { NonPassFinalisationCatAMod2Page } from './non-pass-finalisation.cat-a-mod2.page';

@NgModule({
  declarations: [
    NonPassFinalisationCatAMod2Page,
  ],
  imports: [
    IonicPageModule.forChild(NonPassFinalisationCatAMod2Page),
    ComponentsModule,
    TestFinalisationComponentsModule,
  ],
})
export class NonPassFinalisationCatAMod2PageModule { }
