import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { DirectivesModule } from '../../../../directives/directives.module';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { TestReportComponentsModule } from '../../components/test-report-components.module';
import { VehicleChecksCompactCatDComponent } from './vehicle-checks-compact/vehicle-checks-compact.cat-d';
import { SafetyQuestionsCatDComponent } from './safety-questions/safety-questions.cat-d';

@NgModule({
  declarations: [
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
    VehicleChecksCompactCatDComponent,
    SafetyQuestionsCatDComponent,
  ],
})
export class TestReportCatDComponentsModule { }
