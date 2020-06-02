import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { AccompanimentCardCatCPCComponent } from './accompaniment-card/accompaniment-card.cat-cpc';
import { WaitingRoomToCarComponentsModule } from '../../components/waiting-room-to-car.components.module';
import { CombinationComponent } from './combination/combination';
import { VehicleDetailsCatCPCComponent } from './vehicle-details/vehicle-details';

@NgModule({
  declarations: [
    AccompanimentCardCatCPCComponent,
    CombinationComponent,
    VehicleDetailsCatCPCComponent,
  ],
  imports: [
    IonicModule,
    ComponentsModule,
    WaitingRoomToCarComponentsModule,
  ],
  exports: [
    AccompanimentCardCatCPCComponent,
    CombinationComponent,
    VehicleDetailsCatCPCComponent,
  ],
})
export class WaitingRoomToCarCatCPCComponentsModule { }
