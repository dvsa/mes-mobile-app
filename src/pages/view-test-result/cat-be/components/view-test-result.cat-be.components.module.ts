import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { VehicleDetailsCardComponent } from './vehicle-details-card/vehicle-details-card';
import { TestSummaryCardComponent } from './test-summary-card/test-summary-card';
import { DebriefCardComponent } from './debrief-card/debrief-card';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { ViewTestResultComponentsModule } from '../../components/view-test-result.components.module';

@NgModule({
  declarations: [
    VehicleDetailsCardComponent,
    TestSummaryCardComponent,
    DebriefCardComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ComponentsModule,
    ViewTestResultComponentsModule,
  ],
  exports: [
    VehicleDetailsCardComponent,
    TestSummaryCardComponent,
    DebriefCardComponent,
  ],
})
export class ViewTestResultCatBEComponentsModule {}
