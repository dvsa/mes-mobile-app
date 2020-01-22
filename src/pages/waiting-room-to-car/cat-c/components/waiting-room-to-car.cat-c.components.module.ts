import { NgModule } from '@angular/core';
import { VehicleChecksCatCComponent } from './vehicle-checks/vehicle-checks.cat-c';
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../../../components/common/common-components.module';

@NgModule({
  declarations: [
    VehicleChecksCatCComponent,
  ],
  imports: [
    IonicModule,
    ComponentsModule,
  ],
  exports: [
    VehicleChecksCatCComponent,
  ],
})
export class WaitingRoomToCarCatCComponentsModule { }
