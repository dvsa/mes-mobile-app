import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { DataRowComponent } from './data-row/data-row';
import { DataRowCustomComponent } from './data-row-custom/data-row-custom';
import { DataRowWithListComponent } from './data-row-with-list/data-list-with-row';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { FaultsDataRowComponent } from './faults-data-row/faults-data-row';
import { TestDetailsCardComponent } from './test-details-card/test-details-card';
import { ViewTestHeaderComponent } from './view-test-header/view-test-header';
import { ExaminerDetailsCardComponent } from './examiner-details-card/examiner-details';
import { RekeyDetailsCardComponent } from './rekey-details-card/rekey-details';
import { RekeyReasonCardComponent } from './rekey-reason-card/rekey-reason';
import { VehicleChecksDataRowComponent } from './vehicle-checks-data-row/vehicle-checks-data-row';
import { TestSummaryCardComponent } from './test-summary-card/test-summary-card';
import { ContactDetailsCardComponent } from './contact-details-card/contact-details-card';

@NgModule({
  declarations: [
    DataRowComponent,
    DataRowCustomComponent,
    DataRowWithListComponent,
    FaultsDataRowComponent,
    ViewTestHeaderComponent,
    TestDetailsCardComponent,
    ExaminerDetailsCardComponent,
    RekeyDetailsCardComponent,
    RekeyReasonCardComponent,
    VehicleChecksDataRowComponent,
    TestSummaryCardComponent,
    ContactDetailsCardComponent,

  ],
  imports: [
    CommonModule,
    IonicModule,
    ComponentsModule,
  ],
  exports: [
    DataRowComponent,
    DataRowCustomComponent,
    DataRowWithListComponent,
    FaultsDataRowComponent,
    ViewTestHeaderComponent,
    TestDetailsCardComponent,
    ExaminerDetailsCardComponent,
    RekeyDetailsCardComponent,
    RekeyReasonCardComponent,
    VehicleChecksDataRowComponent,
    TestSummaryCardComponent,
    ContactDetailsCardComponent,
  ],
})
export class ViewTestResultComponentsModule {}
