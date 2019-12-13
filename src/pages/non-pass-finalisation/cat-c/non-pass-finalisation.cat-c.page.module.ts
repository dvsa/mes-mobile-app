import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { TestFinalisationComponentsModule } from
  '../../../components/test-finalisation/test-finalisation-component.module';
import { NonPassFinalisationCatCPage } from './non-pass-finalisation.cat-c.page';

@NgModule({
  declarations: [
    NonPassFinalisationCatCPage,
  ],
  imports: [
    IonicPageModule.forChild(NonPassFinalisationCatCPage),
    ComponentsModule,
    TestFinalisationComponentsModule,
  ],
})
export class NonPassFinalisationCatCPageModule { }
