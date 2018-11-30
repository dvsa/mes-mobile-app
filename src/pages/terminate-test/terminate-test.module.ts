import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TerminateTestPage } from './terminate-test';

@NgModule({
  declarations: [
    TerminateTestPage,
  ],
  imports: [
    IonicPageModule.forChild(TerminateTestPage),
  ],
})
export class TerminateTestPageModule {}
