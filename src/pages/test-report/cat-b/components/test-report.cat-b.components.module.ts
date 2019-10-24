import { NgModule } from '@angular/core';
import { ControlledStopComponent } from './controlled-stop/controlled-stop';
import { ManoeuvresComponent } from './manoeuvres/manoeuvres';
import { VehicleCheckComponent } from './vehicle-check/vehicle-check';
import { ManoeuvreCompetencyComponent } from './manoeuvre-competency/manoeuvre-competency';
import { ManoeuvresPopoverComponent } from './manoeuvres-popover/manoeuvres-popover';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { TestReportComponentsModule } from '../../components/test-report-components.module';

@NgModule({
  declarations: [
    ControlledStopComponent,
    ManoeuvresComponent,
    ManoeuvreCompetencyComponent,
    ManoeuvresPopoverComponent,
    VehicleCheckComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    ComponentsModule,
    TestReportComponentsModule,
  ],
  exports:[
    ControlledStopComponent,
    ManoeuvresComponent,
    ManoeuvreCompetencyComponent,
    ManoeuvresPopoverComponent,
    VehicleCheckComponent,
  ],
})
export class TestReportCatBComponentsModule {}
