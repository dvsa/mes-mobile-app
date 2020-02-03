import { NgModule } from '@angular/core';
import { VehicleChecksCatDComponent } from './vehicle-checks/vehicle-checks.cat-d';
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../../../components/common/common-components.module';

@NgModule({
  declarations: [
    VehicleChecksCatDComponent,
  ],
  imports: [
    IonicModule,
    ComponentsModule,
  ],
  exports: [
    VehicleChecksCatDComponent,
  ],
})
export class WaitingRoomToCarCatDComponentsModule { }
