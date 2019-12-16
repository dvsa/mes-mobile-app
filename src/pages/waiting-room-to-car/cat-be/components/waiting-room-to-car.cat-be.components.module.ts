import { NgModule } from '@angular/core';
import { VehicleChecksCatBEComponent } from './vehicle-checks/vehicle-checks';
import { IonicModule } from 'ionic-angular';
// import { VehicleChecksModalCatBEModule } from './vehicle-checks-modal/vehicle-checks-modal.cat-be.page.module';
import { ComponentsModule } from '../../../../components/common/common-components.module';

@NgModule({
  declarations: [
    VehicleChecksCatBEComponent,
  ],
  imports: [
    IonicModule,
    ComponentsModule,
  ],
  exports: [
    VehicleChecksCatBEComponent,
  ],
})
export class WaitingRoomToCarCatBEComponentsModule { }
