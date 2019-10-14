import { NgModule } from '@angular/core';
import { WaitingRoomToCarCatBPageModule } from './cat-b/waiting-room-to-car.cat-b.page.module';
import { WaitingRoomToCarCatBEPageModule } from './cat-be/waiting-room-to-car.cat-be.page.module';

@NgModule({
  imports: [
    WaitingRoomToCarCatBPageModule,
    WaitingRoomToCarCatBEPageModule,
  ],
})
export class WaitingRoomToCarPageModule { }
