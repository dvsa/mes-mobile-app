import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { VehicleDetailsCardCatBComponent } from './vehicle-details-card/vehicle-details-card.cat-b';
import { DebriefCardComponent } from './debrief-card/debrief-card';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { ViewTestResultComponentsModule } from '../../components/view-test-result.components.module';

@NgModule({
  declarations: [
    VehicleDetailsCardCatBComponent,
    DebriefCardComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ComponentsModule,
    ViewTestResultComponentsModule,
  ],
  exports: [
    VehicleDetailsCardCatBComponent,
    DebriefCardComponent,
  ],
})
export class ViewTestResultCatBComponentsModule {}
