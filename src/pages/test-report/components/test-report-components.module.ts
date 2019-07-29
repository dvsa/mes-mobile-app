import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { EtaComponent } from './examiner-takes-action/eta';
import { ManoeuvresPopoverComponent } from './manoeuvres-popover/manoeuvres-popover';
import { ManoeuvresComponent } from './manoeuvres/manoeuvres';
import { CompetencyComponent } from './competency/competency';
import { CompetencyButtonComponent } from './competency-button/competency-button';
import { DrivingFaultSummaryComponent } from './driving-fault-summary/driving-fault-summary';
import { ToolbarComponent } from './toolbar/toolbar';
import { SeriousTooltipComponent } from './serious-tooltip/serious-tooltip';
import { DangerousTooltipComponent } from './dangerous-tooltip/dangerous-tooltip';
import { LegalRequirementComponent } from './legal-requirement/legal-requirement';
import { ControlledStopComponent } from './controlled-stop/controlled-stop';
import { ManoeuvreCompetencyComponent } from './manoeuvre-competency/manoeuvre-competency';
import { VehicleCheckComponent } from './vehicle-check/vehicle-check';
import { EcoComponent } from './eco/eco';
import { TimerComponent } from './timer/timer';
import { EndTestModalModule } from './end-test-modal/end-test-modal.module';
import { LegalRequirementsModalModule } from './legal-requirements-modal/legal-requirements-modal.module';
import { EtaInvalidModalModule } from './eta-invalid-modal/eta-invalid-modal.module';
import { TestReportModalModule } from './test-report-modal/test-report-modal.module';

@NgModule({
  declarations: [
    EtaComponent,
    ManoeuvresPopoverComponent,
    ManoeuvresComponent,
    CompetencyComponent,
    CompetencyButtonComponent,
    DrivingFaultSummaryComponent,
    ToolbarComponent,
    SeriousTooltipComponent,
    DangerousTooltipComponent,
    LegalRequirementComponent,
    ControlledStopComponent,
    ManoeuvreCompetencyComponent,
    VehicleCheckComponent,
    EcoComponent,
    TimerComponent,
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    IonicModule,
    EndTestModalModule,
    LegalRequirementsModalModule,
    EtaInvalidModalModule,
    TestReportModalModule,
  ],
  exports:[
    EtaComponent,
    ManoeuvresPopoverComponent,
    ManoeuvresComponent,
    CompetencyComponent,
    CompetencyButtonComponent,
    DrivingFaultSummaryComponent,
    ToolbarComponent,
    SeriousTooltipComponent,
    DangerousTooltipComponent,
    LegalRequirementComponent,
    ControlledStopComponent,
    ManoeuvreCompetencyComponent,
    VehicleCheckComponent,
    EcoComponent,
    TimerComponent,
  ],
})
export class TestReportComponentsModule {}
