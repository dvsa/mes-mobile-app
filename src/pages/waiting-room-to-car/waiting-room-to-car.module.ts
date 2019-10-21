import { NgModule } from '@angular/core';
import { WaitingRoomToCarCatBPageModule } from './cat-b/waiting-room-to-car.cat-b.page.module';
import { WaitingRoomToCarCatBePageModule } from './cat-be/waiting-room-to-car.cat-be.page.module';

@NgModule({
  imports: [
    WaitingRoomToCarCatBPageModule,
    WaitingRoomToCarCatBePageModule,
  ],
})
export class WaitingRoomToCarPageModule { }
