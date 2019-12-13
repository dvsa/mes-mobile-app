import { NgModule } from '@angular/core';
import { VehicleChecksCatCComponent } from './vehicle-checks/vehicle-checks.cat-c';
import { IonicModule } from 'ionic-angular';

@NgModule({
  imports: [
    IonicModule,
    VehicleChecksCatCComponent,
  ],
  exports: [
    VehicleChecksCatCComponent,
  ],
})
export class WaitingRoomToCarCatCComponentsModule { }
