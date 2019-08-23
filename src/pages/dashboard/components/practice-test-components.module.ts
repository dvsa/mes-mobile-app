import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { PracticeTestReportCardComponent } from './practice-test-report-card/practice-test-report-card';
import { PracticeEndToEndCardComponent } from './practice-end-to-end-card/practice-end-to-end-card';

@NgModule({
  declarations: [
    PracticeTestReportCardComponent,
    PracticeEndToEndCardComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    PracticeTestReportCardComponent,
    PracticeEndToEndCardComponent,
  ],
})
export class PracticeTestComponentsModule { }
