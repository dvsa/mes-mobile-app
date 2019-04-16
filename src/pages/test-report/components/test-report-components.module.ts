import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { EtaComponent } from '../components/examiner-takes-action/eta';
import { ManoeuvresPopoverComponent } from '../components/manoeuvres-popover/manoeuvres-popover';
import { CompetencyWithModalComponent } from '../components/competency-with-modal/competency-with-modal';
import { CompetencyComponent } from '../components/competency/competency';
import { TickIndicatorComponent } from '../components/tick-indicator/tick-indicator';
import { DrivingFaultSummaryComponent } from '../components/driving-fault-summary/driving-fault-summary';
import { ToolbarComponent } from '../components/toolbar/toolbar';
import { SeriousTooltipComponent } from '../components/serious-tooltip/serious-tooltip';
import { DangerousTooltipComponent } from '../components/dangerous-tooltip/dangerous-tooltip';
import { LegalRequirementComponent } from '../components/legal-requirement/legal-requirement';
import { ControlledStopComponent } from './controlled-stop/controlled-stop';
import { ManoeuvreCompetencyComponent } from './manoeuvre-competency/manoeuvre-competency';

@NgModule({
  declarations: [
    EtaComponent,
    ManoeuvresPopoverComponent,
    CompetencyWithModalComponent,
    CompetencyComponent,
    TickIndicatorComponent,
    DrivingFaultSummaryComponent,
    ToolbarComponent,
    SeriousTooltipComponent,
    DangerousTooltipComponent,
    LegalRequirementComponent,
    ControlledStopComponent,
    ManoeuvreCompetencyComponent,
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    IonicModule,
  ],
  exports:[
    EtaComponent,
    ManoeuvresPopoverComponent,
    CompetencyWithModalComponent,
    CompetencyComponent,
    TickIndicatorComponent,
    DrivingFaultSummaryComponent,
    ToolbarComponent,
    SeriousTooltipComponent,
    DangerousTooltipComponent,
    LegalRequirementComponent,
    ControlledStopComponent,
    ManoeuvreCompetencyComponent,
  ],
})
export class TestReportComponentsModule {}
