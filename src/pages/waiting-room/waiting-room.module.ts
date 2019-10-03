import { NgModule } from '@angular/core';
import { WaitingRoomCatBPageModule } from './cat-b/waiting-room.cat-b.page.module';
import { WaitingRoomCatBEPageModule } from './cat-be/waiting-room.cat-be.page.module';

@NgModule({
  imports: [
    WaitingRoomCatBPageModule,
    WaitingRoomCatBEPageModule,
  ],
})
export class WaitingRoomPageModule { }
