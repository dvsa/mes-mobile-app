import { NgModule } from '@angular/core';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { ViewTestResultComponentsModule } from '../../components/view-test-result.components.module';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { CPCVehicleDetailsCardComponent } from './vehicle-details-card/vehicle-details-card';
import { CPCTestSummaryCardComponent } from './test-summary-card/test-summary-card';

@NgModule({
  declarations: [
    CPCVehicleDetailsCardComponent,
    CPCTestSummaryCardComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ComponentsModule,
    ViewTestResultComponentsModule,
  ],
  exports: [
    CPCVehicleDetailsCardComponent,
    CPCTestSummaryCardComponent,
  ],
})
export class ViewTestResultCatCPCComponentsModule {}
