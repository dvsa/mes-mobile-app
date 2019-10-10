import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NonPassFinalisationPage } from './non-pass-finalisation';
import { ComponentsModule } from '../../components/common/common-components.module';
import { TestFinalisationComponentsModule } from '../../components/test-finalisation/test-finalisation-component.module';

@NgModule({
  declarations: [
    NonPassFinalisationPage,
  ],
  imports: [
    IonicPageModule.forChild(NonPassFinalisationPage),
    ComponentsModule,
    TestFinalisationComponentsModule,
  ],
})
export class NonPassFinalisationPageModule { }
