import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { WaitingRoomAnalyticsEffects } from './waiting-room.analytics.effects';
import { CatBWaitingRoomPageModule } from './cat-b/cat-b-waiting-room.module';

@NgModule({
  imports: [
    EffectsModule.forFeature([
      WaitingRoomAnalyticsEffects,
    ]),
    CatBWaitingRoomPageModule,
  ],
})
export class WaitingRoomPageModule { }
