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
// TODO Implement Cat D ReverseLeftPopoverComponent
import { ReverseLeftPopoverComponent } from '../../cat-c/components/reverse-left-popover/reverse-left-popover';
// TODO Implement Cat D ReverseDiagramLinkComponent
import { ReverseDiagramLinkComponent } from '../../cat-c/components/reverse-diagram-link/reverse-diagram-link';
// TODO Implement ReverseLeftComponent
import { ReverseLeftComponent } from '../../cat-c/components/reverse-left/reverse-left';

@NgModule({
  declarations: [
    ReverseLeftComponent,
    ReverseDiagramLinkComponent,
    ReverseLeftPopoverComponent,
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
    ReverseLeftComponent,
    ReverseDiagramLinkComponent,
    ReverseLeftPopoverComponent,
    VehicleChecksComponent,
    UncoupleRecoupleComponent,
  ],
})
export class TestReportCatDComponentsModule { }
