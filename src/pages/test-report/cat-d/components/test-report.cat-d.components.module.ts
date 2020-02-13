import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { DirectivesModule } from '../../../../directives/directives.module';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { TestReportComponentsModule } from '../../components/test-report-components.module';
import { ReverseLeftPopoverCatDComponent } from './reverse-left-popover/reverse-left-popover.cat-d';
import { ReverseDiagramLinkCatDComponent } from './reverse-diagram-link/reverse-diagram-link.cat-d';
import { ReverseLeftCatDComponent } from './reverse-left/reverse-left.cat-d';
import { VehicleChecksCompactCatDComponent } from './vehicle-checks-compact/vehicle-checks-compact.cat-d';
import { SafetyQuestionsCatDComponent } from './safety-questions/safety-questions.cat-d';

@NgModule({
  declarations: [
    ReverseLeftCatDComponent,
    ReverseDiagramLinkCatDComponent,
    ReverseLeftPopoverCatDComponent,
    VehicleChecksCompactCatDComponent,
    SafetyQuestionsCatDComponent,
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
    VehicleChecksCompactCatDComponent,
    SafetyQuestionsCatDComponent,
  ],
})
export class TestReportCatDComponentsModule { }
