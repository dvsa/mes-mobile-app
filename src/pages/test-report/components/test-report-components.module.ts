import { ComponentsModule } from '../../../components/common/common-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { EtaComponent } from './examiner-takes-action/eta';
import { CompetencyComponent } from './competency/competency';
import { CompetencyButtonComponent } from './competency-button/competency-button';
import { DrivingFaultSummaryComponent } from './driving-fault-summary/driving-fault-summary';
import { ToolbarComponent } from './toolbar/toolbar';
import { SeriousTooltipComponent } from './serious-tooltip/serious-tooltip';
import { DangerousTooltipComponent } from './dangerous-tooltip/dangerous-tooltip';
import { LegalRequirementComponent } from './legal-requirement/legal-requirement';
import { EcoComponent } from './eco/eco';
import { TimerComponent } from './timer/timer';
import { EndTestModalModule } from './end-test-modal/end-test-modal.module';
import { LegalRequirementsModalModule } from './legal-requirements-modal/legal-requirements-modal.module';
import { EtaInvalidModalModule } from './eta-invalid-modal/eta-invalid-modal.module';
import { UncoupleRecoupleComponent } from './uncouple-recouple/uncouple-recouple';

@NgModule({
  declarations: [
    EtaComponent,
    CompetencyComponent,
    CompetencyButtonComponent,
    DrivingFaultSummaryComponent,
    ToolbarComponent,
    SeriousTooltipComponent,
    DangerousTooltipComponent,
    LegalRequirementComponent,
    EcoComponent,
    TimerComponent,
    UncoupleRecoupleComponent,
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    IonicModule,
    EndTestModalModule,
    LegalRequirementsModalModule,
    EtaInvalidModalModule,
  ],
  exports:[
    EtaComponent,
    CompetencyComponent,
    CompetencyButtonComponent,
    DrivingFaultSummaryComponent,
    ToolbarComponent,
    SeriousTooltipComponent,
    DangerousTooltipComponent,
    LegalRequirementComponent,
    EcoComponent,
    TimerComponent,
    UncoupleRecoupleComponent,
  ],
})
export class TestReportComponentsModule {}
