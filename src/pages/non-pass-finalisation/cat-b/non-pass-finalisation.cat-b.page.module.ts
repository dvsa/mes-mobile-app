import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { TestFinalisationComponentsModule } from
'../../../components/test-finalisation/test-finalisation-component.module';
import { NonPassFinalisationCatBPage } from './non-pass-finalisation.cat-b.page';

@NgModule({
  declarations: [
    NonPassFinalisationCatBPage,
  ],
  imports: [
    IonicPageModule.forChild(NonPassFinalisationCatBPage),
    ComponentsModule,
    TestFinalisationComponentsModule,
  ],
})
export class NonPassFinalisationCatBPageModule { }
