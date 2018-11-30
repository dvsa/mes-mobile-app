import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitingRoomToCarPage } from './waiting-room-to-car';

@NgModule({
  declarations: [
    WaitingRoomToCarPage,
  ],
  imports: [
    IonicPageModule.forChild(WaitingRoomToCarPage),
  ],
})
export class WaitingRoomToCarPageModule {}
