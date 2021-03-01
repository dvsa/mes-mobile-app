import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { DirectivesModule } from '../../../../directives/directives.module';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { TestReportComponentsModule } from '../../components/test-report-components.module';
import { VehicleChecksComponent } from './vehicle-checks/vehicle-checks';
import { PcvDoorExerciseComponent } from './pcv-door-exercise/pcv-door-exercise';

@NgModule({
  declarations: [
    VehicleChecksComponent,
    PcvDoorExerciseComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    TestReportComponentsModule,
    IonicModule,
    DirectivesModule,
  ],
  exports: [
    VehicleChecksComponent,
    PcvDoorExerciseComponent,
  ],
})
export class TestReportCatDComponentsModule { }
