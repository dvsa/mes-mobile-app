import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { DirectivesModule } from '../../../../directives/directives.module';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { TestReportComponentsModule } from '../../components/test-report-components.module';
import { ReverseLeftPopoverCatDComponent } from './reverse-left-popover/reverse-left-popover.cat-d';
import { ReverseDiagramLinkCatDComponent } from './reverse-diagram-link/reverse-diagram-link.cat-d';
import { ReverseLeftCatDComponent } from './reverse-left/reverse-left.cat-d';
import { VehicleChecksTestReportCatDComponent } from './vehicle-checks-test-report/vehicle-checks-test-report.cat-d';

@NgModule({
  declarations: [
    ReverseLeftCatDComponent,
    ReverseDiagramLinkCatDComponent,
    ReverseLeftPopoverCatDComponent,
    VehicleChecksTestReportCatDComponent,
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
    VehicleChecksTestReportCatDComponent,
  ],
})
export class TestReportCatDComponentsModule { }
