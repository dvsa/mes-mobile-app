import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { VehicleChecksCardComponent } from './vehicle-checks-card/vehicle-checks-card';

@NgModule({
  declarations: [
    VehicleChecksCardComponent,
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    IonicModule,
  ],
  exports:[
    VehicleChecksCardComponent,
  ],
})
export class DebriefComponentsModule {}
