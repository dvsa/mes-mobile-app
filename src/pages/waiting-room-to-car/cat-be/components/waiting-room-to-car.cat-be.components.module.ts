import { NgModule } from '@angular/core';
import { VehicleChecksCatBEComponent } from './vehicle-checks/vehicle-checks.cat-be';
import { IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [
    VehicleChecksCatBEComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    VehicleChecksCatBEComponent,
  ],
})
export class WaitingRoomToCarCatBEComponentsModule { }
