import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { DirectivesModule } from '../../../../directives/directives.module';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { TestReportComponentsModule } from '../../components/test-report-components.module';
import { ReverseLeftPopoverCatDComponent } from './reverse-left-popover/reverse-left-popover.cat-d';
import { ReverseDiagramLinkCatDComponent } from './reverse-diagram-link/reverse-diagram-link.cat-d';
import { ReverseLeftCatDComponent } from './reverse-left/reverse-left.cat-d';
import { UncoupleRecoupleCatDComponent } from './uncouple-recouple/uncouple-recouple.cat-d';
import { VehicleChecksCatDComponent } from './vehicle-checks/vehicle-checks.cat-d';

@NgModule({
  declarations: [
    ReverseLeftCatDComponent,
    ReverseDiagramLinkCatDComponent,
    ReverseLeftPopoverCatDComponent,
    VehicleChecksCatDComponent,
    UncoupleRecoupleCatDComponent,
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
    VehicleChecksCatDComponent,
    UncoupleRecoupleCatDComponent,
  ],
})
export class TestReportCatDComponentsModule { }
