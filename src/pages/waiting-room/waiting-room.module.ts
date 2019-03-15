import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitingRoomPage } from './waiting-room';
import { EffectsModule } from '@ngrx/effects';
import { WaitingRoomAnalyticsEffects } from './waiting-room.analytics.effects';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { StoreModule } from '@ngrx/store';
import { waitingRoomReducer } from './waiting-room.reducer';

@NgModule({
  declarations: [
    WaitingRoomPage,
  ],
  imports: [
    IonicPageModule.forChild(WaitingRoomPage),
    StoreModule.forFeature('waitingRoom', waitingRoomReducer),
    EffectsModule.forFeature([WaitingRoomAnalyticsEffects]),
  ],
  providers: [
    AnalyticsProvider,
  ],
})
export class WaitingRoomPageModule {}
