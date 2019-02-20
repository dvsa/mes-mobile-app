import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { WaitingRoomPage } from './waiting-room';
import { EffectsModule } from '@ngrx/effects';
import { WaitingRoomAnalyticsEffects } from './waiting-room.analytics.effects';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { AppPreferences } from '@ionic-native/app-preferences';

@NgModule({
  declarations: [
    WaitingRoomPage,
  ],
  imports: [
    IonicPageModule.forChild(WaitingRoomPage),
    EffectsModule.forFeature([WaitingRoomAnalyticsEffects]),
    ComponentsModule,
  ],
  providers: [
    AnalyticsProvider,
    AppPreferences,
  ],
})
export class WaitingRoomPageModule {}
