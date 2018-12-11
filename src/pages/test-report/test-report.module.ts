import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestReportPage } from './test-report';

@NgModule({
  declarations: [
    TestReportPage,
  ],
  imports: [
    IonicPageModule.forChild(TestReportPage),
  ],
})
export class TestReportPageModule {}
