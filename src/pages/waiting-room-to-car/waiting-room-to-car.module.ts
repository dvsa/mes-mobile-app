import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { WaitingRoomToCarPage } from './waiting-room-to-car';
import { EffectsModule } from '@ngrx/effects';
import { WaitingRoomToCarAnalyticsEffects } from '../waiting-room-to-car/waiting-room-to-car.analytics.effects';
import { AnalyticsProvider } from '../../providers/analytics/analytics';

@NgModule({
  declarations: [
    WaitingRoomToCarPage,
  ],
  imports: [
    IonicPageModule.forChild(WaitingRoomToCarPage),
    EffectsModule.forFeature([WaitingRoomToCarAnalyticsEffects]),
    ComponentsModule,
  ],
  providers: [
    AnalyticsProvider
  ]
})
export class WaitingRoomToCarPageModule {}
