import { NgModule } from '@angular/core';
import { VehicleChecksCatBEComponent } from './vehicle-checks/vehicle-checks.cat-be';
import { IonicModule } from 'ionic-angular';
import { VehicleChecksModalCatBEModule } from './vehicle-checks-modal/vehicle-checks-modal.cat-be.page.module';

@NgModule({
  declarations: [
    VehicleChecksCatBEComponent,
  ],
  imports: [
    IonicModule,
    VehicleChecksModalCatBEModule,
  ],
  exports: [
    VehicleChecksCatBEComponent,
  ],
})
export class WaitingRoomToCarCatBEComponentsModule { }
