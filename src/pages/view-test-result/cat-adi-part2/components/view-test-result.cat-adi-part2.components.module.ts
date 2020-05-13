import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { DebriefCardComponent } from './debrief-card/debrief-card';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { ViewTestResultComponentsModule }
from '../../components/view-test-result.components.module';
import { VehicleDetailsCatADIPt2Component } from './vehicle-details/vehicle-details';
import { TestDetailsCardCatADI2Component } from './test-details/test-details.cat-adi-part2';

@NgModule({
  declarations: [
    DebriefCardComponent,
    VehicleDetailsCatADIPt2Component,
    TestDetailsCardCatADI2Component,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ComponentsModule,
    ViewTestResultComponentsModule,
  ],
  exports: [
    DebriefCardComponent,
    VehicleDetailsCatADIPt2Component,
    TestDetailsCardCatADI2Component,
  ],
})
export class ViewTestResultCatADIPart2ComponentsModule {}
