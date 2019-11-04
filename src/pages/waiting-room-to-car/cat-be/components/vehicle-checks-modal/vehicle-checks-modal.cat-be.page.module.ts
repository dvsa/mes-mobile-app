import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { VehicleChecksCatBEModal } from './vehicle-checks-modal.cat-be.page';
import { VehicleChecksQuestionComponent } from '../vehicle-checks-question/vehicle-checks-question';

@NgModule({
  declarations: [
    VehicleChecksCatBEModal,
    VehicleChecksQuestionComponent,
  ],
  imports: [
    IonicPageModule.forChild(VehicleChecksCatBEModal),
    IonicModule,
  ],
})
export class VehicleChecksModalCatBEModule { }
