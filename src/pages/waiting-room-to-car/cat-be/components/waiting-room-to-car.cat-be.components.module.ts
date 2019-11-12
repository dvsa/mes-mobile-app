import { NgModule } from '@angular/core';
import { VehicleChecksCatBEComponent } from './vehicle-checks/vehicle-checks';
import { IonicModule } from 'ionic-angular';
import { VehicleChecksModalCatBEModule } from './vehicle-checks-modal/vehicle-checks-modal.cat-be.page.module';
import { VehicleChecksCatBEModule } from './vehicle-checks/vehicle-checks.module';

@NgModule({
  // declarations: [
  //   VehicleChecksCatBEComponent,
  // ],
  imports: [
    IonicModule,
    VehicleChecksModalCatBEModule,
    VehicleChecksCatBEModule,
  ],
  exports: [
    VehicleChecksCatBEComponent,
  ],
})
export class WaitingRoomToCarCatBEComponentsModule { }
