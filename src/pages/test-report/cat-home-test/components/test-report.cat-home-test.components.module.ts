import { NgModule } from '@angular/core';
import { TestReportComponentsModule } from '../../components/test-report-components.module';
import { IonicModule } from 'ionic-angular';
import { DirectivesModule } from '../../../../directives/directives.module';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { CommonModule } from '@angular/common';
import { VehicleChecksComponent } from './vehicle-checks/vehicle-checks';
import { HighwayCodeSafetyComponent } from '../../components/highway-code-safety/highway-code-safety';

@NgModule({
  declarations: [
    VehicleChecksComponent,
    HighwayCodeSafetyComponent,
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
    HighwayCodeSafetyComponent,
  ],
})
export class TestReportCatHomeTestComponentsModule { }
