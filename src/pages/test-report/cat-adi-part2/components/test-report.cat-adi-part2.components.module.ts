import { NgModule } from '@angular/core';
import { ManoeuvresComponent } from './manoeuvres/manoeuvres';
import { VehicleCheckComponent } from './vehicle-check/vehicle-check';
import { ManoeuvresPopoverComponent } from './manoeuvres-popover/manoeuvres-popover';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { TestReportComponentsModule } from '../../components/test-report-components.module';
import { ManoeuvreCompetencyComponentAdiPart2 } from './manoeuvre-competency/manoeuvre-competency';

@NgModule({
  declarations: [
    ManoeuvresComponent,
    ManoeuvresPopoverComponent,
    ManoeuvreCompetencyComponentAdiPart2,
    VehicleCheckComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    ComponentsModule,
    TestReportComponentsModule,
  ],
  exports:[
    ManoeuvresComponent,
    ManoeuvresPopoverComponent,
    ManoeuvreCompetencyComponentAdiPart2,
    VehicleCheckComponent,
  ],
})
export class TestReportCatADIPart2ComponentsModule {}
