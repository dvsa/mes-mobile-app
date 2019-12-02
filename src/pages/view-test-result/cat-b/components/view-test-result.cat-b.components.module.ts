import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { TestDetailsCardComponent } from './test-details-card/test-details-card';
import { RekeyDetailsCardComponent } from './rekey-details-card/rekey-details';
import { RekeyReasonCardComponent } from './rekey-reason-card/rekey-reason';
import { ExaminerDetailsCardComponent } from './examiner-details-card/examiner-details';
import { VehicleDetailsCardComponent } from './vehicle-details-card/vehicle-details-card';
import { TestSummaryCardComponent } from './test-summary-card/test-summary-card';
import { ViewTestHeaderComponent } from './view-test-header/view-test-header';
import { DebriefCardComponent } from './debrief-card/debrief-card';
import { ComponentsModule } from '../../../../components/common/common-components.module';

@NgModule({
  declarations: [
    TestDetailsCardComponent,
    RekeyDetailsCardComponent,
    RekeyReasonCardComponent,
    ExaminerDetailsCardComponent,
    VehicleDetailsCardComponent,
    TestSummaryCardComponent,
    ViewTestHeaderComponent,
    DebriefCardComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ComponentsModule,
  ],
  exports: [
    TestDetailsCardComponent,
    RekeyDetailsCardComponent,
    RekeyReasonCardComponent,
    ExaminerDetailsCardComponent,
    VehicleDetailsCardComponent,
    TestSummaryCardComponent,
    ViewTestHeaderComponent,
    DebriefCardComponent,
  ],
})
export class ViewTestResultCatBComponentsModule {}
