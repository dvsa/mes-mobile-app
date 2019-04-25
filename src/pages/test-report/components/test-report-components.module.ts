import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { EtaComponent } from '../components/examiner-takes-action/eta';
import { ManoeuvresPopoverComponent } from '../components/manoeuvres-popover/manoeuvres-popover';
import { ManoeuvresComponent } from '../components/manoeuvres/manoeuvres';
import { CompetencyComponent } from '../components/competency/competency';
import { CompetencyButtonComponent } from '../components/competency-button/competency-button';
import { TickIndicatorComponent } from '../components/tick-indicator/tick-indicator';
import { DrivingFaultSummaryComponent } from '../components/driving-fault-summary/driving-fault-summary';
import { ToolbarComponent } from '../components/toolbar/toolbar';
import { SeriousTooltipComponent } from '../components/serious-tooltip/serious-tooltip';
import { DangerousTooltipComponent } from '../components/dangerous-tooltip/dangerous-tooltip';
import { LegalRequirementComponent } from '../components/legal-requirement/legal-requirement';
import { ControlledStopComponent } from './controlled-stop/controlled-stop';
import { ManoeuvreCompetencyComponent } from './manoeuvre-competency/manoeuvre-competency';
import { VehicleCheckComponent } from './vehicle-check/vehicle-check';

@NgModule({
  declarations: [
    EtaComponent,
    ManoeuvresPopoverComponent,
    ManoeuvresComponent,
    CompetencyComponent,
    CompetencyButtonComponent,
    TickIndicatorComponent,
    DrivingFaultSummaryComponent,
    ToolbarComponent,
    SeriousTooltipComponent,
    DangerousTooltipComponent,
    LegalRequirementComponent,
    ControlledStopComponent,
    ManoeuvreCompetencyComponent,
    VehicleCheckComponent,
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    IonicModule,
  ],
  exports:[
    EtaComponent,
    ManoeuvresPopoverComponent,
    ManoeuvresComponent,
    CompetencyComponent,
    CompetencyButtonComponent,
    TickIndicatorComponent,
    DrivingFaultSummaryComponent,
    ToolbarComponent,
    SeriousTooltipComponent,
    DangerousTooltipComponent,
    LegalRequirementComponent,
    ControlledStopComponent,
    ManoeuvreCompetencyComponent,
    VehicleCheckComponent,
  ],
})
export class TestReportComponentsModule {}
