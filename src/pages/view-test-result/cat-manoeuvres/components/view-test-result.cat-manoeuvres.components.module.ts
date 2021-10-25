import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { VehicleDetailsCardCatManoeuvresComponent } from './vehicle-details-card/vehicle-details-card.cat-manoeuvres';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { ViewTestResultComponentsModule } from '../../components/view-test-result.components.module';
import { TestSummaryCardCatManoeuvreComponent } from './test-summary-card/test-summary-card';

@NgModule({
  declarations: [
    VehicleDetailsCardCatManoeuvresComponent,
    TestSummaryCardCatManoeuvreComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ComponentsModule,
    ViewTestResultComponentsModule,
  ],
  exports: [
    VehicleDetailsCardCatManoeuvresComponent,
    TestSummaryCardCatManoeuvreComponent,
  ],
})
export class ViewTestResultCatManoeuvresComponentsModule {}
