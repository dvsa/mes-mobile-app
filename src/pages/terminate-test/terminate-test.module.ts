import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { TerminateTestPage } from './terminate-test';

@NgModule({
  declarations: [
    TerminateTestPage,
  ],
  imports: [
    IonicPageModule.forChild(TerminateTestPage),
    ComponentsModule,
  ],
})
export class TerminateTestPageModule {}
