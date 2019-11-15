import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../../../../components/common/common-components.module';
import { VehicleChecksCatBEComponent } from './vehicle-checks';

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
export class VehicleChecksCatBEModule { }
