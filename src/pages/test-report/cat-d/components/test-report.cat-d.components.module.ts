import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { DirectivesModule } from '../../../../directives/directives.module';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { TestReportComponentsModule } from '../../components/test-report-components.module';
// TODO Implement Cat D UncoupleRecoupleComponent
import { UncoupleRecoupleComponent } from '../../cat-c/components/uncouple-recouple/uncouple-recouple';
// TODO Implement Cat D VehicleChecksComponent
import { VehicleChecksComponent } from '../../cat-c/components/vehicle-checks/vehicle-checks';
import { ReverseLeftPopoverCatDComponent } from './reverse-left-popover/reverse-left-popover.cat-d';
import { ReverseDiagramLinkCatDComponent } from './reverse-diagram-link/reverse-diagram-link.cat-d';
import { ReverseLeftCatDComponent } from './reverse-left/reverse-left.cat-d';

@NgModule({
  declarations: [
    ReverseLeftCatDComponent,
    ReverseDiagramLinkCatDComponent,
    ReverseLeftPopoverCatDComponent,
    VehicleChecksComponent,
    UncoupleRecoupleComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    TestReportComponentsModule,
    IonicModule,
    DirectivesModule,
  ],
  exports: [
    ReverseLeftCatDComponent,
    ReverseDiagramLinkCatDComponent,
    ReverseLeftPopoverCatDComponent,
    VehicleChecksComponent,
    UncoupleRecoupleComponent,
  ],
})
export class TestReportCatDComponentsModule { }
