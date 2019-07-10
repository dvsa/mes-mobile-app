import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { TestDetailsCardComponent } from './test-details-card/test-details-card';
import { ExaminerDetailsCardComponent } from './examiner-details-card/examiner-details';
import { VehicleDetailsCardComponent } from './vehicle-details-card/vehicle-details-card';
import { TestSummaryCardComponent } from './test-summary-card/test-summary-card';

@NgModule({
  declarations: [
    TestDetailsCardComponent,
    ExaminerDetailsCardComponent,
    VehicleDetailsCardComponent,
    TestSummaryCardComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    TestDetailsCardComponent,
    ExaminerDetailsCardComponent,
    VehicleDetailsCardComponent,
    TestSummaryCardComponent,
  ],
})
export class ViewTestResultComponentsModule {}
