import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { TestFinalisationComponentsModule } from
  '../../../components/test-finalisation/test-finalisation-component.module';
import { NonPassFinalisationCatBEPage } from './non-pass-finalisation.cat-be.page';

@NgModule({
  declarations: [
    NonPassFinalisationCatBEPage,
  ],
  imports: [
    IonicPageModule.forChild(NonPassFinalisationCatBEPage),
    ComponentsModule,
    TestFinalisationComponentsModule,
  ],
})
export class NonPassFinalisationCatBEPageModule { }
