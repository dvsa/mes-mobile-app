import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { VehicleChecksCatBEModal } from './vehicle-checks-modal.cat-be.page';

@NgModule({
  declarations: [
    VehicleChecksCatBEModal,
  ],
  imports: [
    IonicPageModule.forChild(VehicleChecksCatBEModal),
    IonicModule,
  ],
})
export class VehicleChecksModalCatBEModule { }
