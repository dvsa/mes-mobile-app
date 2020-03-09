import { NgModule } from '@angular/core';
import { TestReportComponentsModule } from '../../components/test-report-components.module';
import { IonicModule } from 'ionic-angular';
import { DirectivesModule } from '../../../../directives/directives.module';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { CommonModule } from '@angular/common';
import { VehicleChecksComponent } from './vehicle-checks/vehicle-checks';

@NgModule({
  declarations: [
    VehicleChecksComponent,
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
  ],
})
export class TestReportCatHomeTestComponentsModule { }
