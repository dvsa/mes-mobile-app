import { NgModule } from '@angular/core';
import { WaitingRoomCatBPageModule } from './cat-b/waiting-room.cat-b.page.module';
import { WaitingRoomCatBePageModule } from './cat-be/waiting-room.cat-be.page.module';

@NgModule({
  imports: [
    WaitingRoomCatBPageModule,
    WaitingRoomCatBePageModule,
  ],
})
export class WaitingRoomPageModule { }
