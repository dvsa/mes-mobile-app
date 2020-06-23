import { NgModule } from '@angular/core';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { ViewTestResultComponentsModule } from '../../components/view-test-result.components.module';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { CPCVehicleDetailsCardComponent } from './vehicle-details-card/vehicle-details-card';

@NgModule({
  declarations: [
    CPCVehicleDetailsCardComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ComponentsModule,
    ViewTestResultComponentsModule,
  ],
  exports: [
    CPCVehicleDetailsCardComponent,
  ],
})
export class ViewTestResultCatCPCComponentsModule {}
