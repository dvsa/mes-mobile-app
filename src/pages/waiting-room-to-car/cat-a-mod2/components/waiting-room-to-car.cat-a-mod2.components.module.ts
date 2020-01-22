import { NgModule } from '@angular/core';
import { VehicleChecksCatAMod2Component } from './vehicle-checks/vehicle-checks';
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../../../components/common/common-components.module';

@NgModule({
  declarations: [
    VehicleChecksCatAMod2Component,
  ],
  imports: [
    IonicModule,
    ComponentsModule,
  ],
  exports: [
    VehicleChecksCatAMod2Component,
  ],
})
export class WaitingRoomToCarCatAMod2ComponentsModule { }
