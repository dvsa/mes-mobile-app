import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { TestFinalisationComponentsModule } from
  '../../../components/test-finalisation/test-finalisation-component.module';
import { NonPassFinalisationCatAMod1Page } from './non-pass-finalisation.cat-a-mod1.page';

@NgModule({
  declarations: [
    NonPassFinalisationCatAMod1Page,
  ],
  imports: [
    IonicPageModule.forChild(NonPassFinalisationCatAMod1Page),
    ComponentsModule,
    TestFinalisationComponentsModule,
  ],
})
export class NonPassFinalisationCatAMod1PageModule { }
