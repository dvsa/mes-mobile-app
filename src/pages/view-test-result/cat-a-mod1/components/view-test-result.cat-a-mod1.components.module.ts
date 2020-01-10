import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { VehicleDetailsCardComponent } from './vehicle-details-card/vehicle-details-card';
import { DebriefCardComponent } from './debrief-card/debrief-card';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { ViewTestResultComponentsModule } from '../../components/view-test-result.components.module';
import { BusinessDetailsCardComponent } from './business-details-card/business-details-card';

@NgModule({
  declarations: [
    VehicleDetailsCardComponent,
    DebriefCardComponent,
    BusinessDetailsCardComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ComponentsModule,
    ViewTestResultComponentsModule,
  ],
  exports: [
    VehicleDetailsCardComponent,
    DebriefCardComponent,
    BusinessDetailsCardComponent,
  ],
})
export class ViewTestResultCatAMod1ComponentsModule {}
