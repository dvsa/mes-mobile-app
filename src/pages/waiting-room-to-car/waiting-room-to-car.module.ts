import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { WaitingRoomToCarPage } from './waiting-room-to-car';

@NgModule({
  declarations: [
    WaitingRoomToCarPage,
  ],
  imports: [
    IonicPageModule.forChild(WaitingRoomToCarPage),
    ComponentsModule,
  ],
})
export class WaitingRoomToCarPageModule {}
