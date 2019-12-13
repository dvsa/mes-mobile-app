import { NgModule } from '@angular/core';
import { VehicleChecksCatBEComponent } from './vehicle-checks/vehicle-checks';
import { IonicModule } from 'ionic-angular';
import { VehicleChecksModalCatBEModule } from './vehicle-checks-modal/vehicle-checks-modal.cat-be.page.module';

@NgModule({
  imports: [
    IonicModule,
    VehicleChecksModalCatBEModule,
  ],
  exports: [
    VehicleChecksCatBEComponent,
  ],
})
export class WaitingRoomToCarCatBEComponentsModule { }
