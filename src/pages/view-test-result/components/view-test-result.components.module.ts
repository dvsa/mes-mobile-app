import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
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
import { BusinessDetailsCardComponent } from './business-details-card/business-details-card';
import { VehicleDetailsCardComponent } from './vehicle-details-card/vehicle-details-card';
import { VehicleDetailsCardCatAComponent } from './vehicle-details-card-cat-a/vehicle-details-card-cat-a';

@NgModule({
  declarations: [
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
    BusinessDetailsCardComponent,
    VehicleDetailsCardComponent,
    VehicleDetailsCardCatAComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ComponentsModule,
  ],
  exports: [
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
    BusinessDetailsCardComponent,
    VehicleDetailsCardComponent,
    VehicleDetailsCardCatAComponent,
  ],
})
export class ViewTestResultComponentsModule {}
