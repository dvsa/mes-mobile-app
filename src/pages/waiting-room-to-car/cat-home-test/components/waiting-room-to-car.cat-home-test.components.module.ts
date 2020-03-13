import { NgModule } from '@angular/core';
import { VehicleChecksCatHomeTestComponent } from './vehicle-checks/vehicle-checks';
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../../../components/common/common-components.module';

@NgModule({
  declarations: [
    VehicleChecksCatHomeTestComponent,
  ],
  imports: [
    IonicModule,
    ComponentsModule,
  ],
  exports: [
    VehicleChecksCatHomeTestComponent,
  ],
})
export class WaitingRoomToCarCatHomeTestComponentsModule { }
