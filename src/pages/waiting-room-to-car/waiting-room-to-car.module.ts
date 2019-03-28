import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitingRoomToCarPage } from './waiting-room-to-car';
import { EffectsModule } from '@ngrx/effects';
import { WaitingRoomToCarAnalyticsEffects } from '../waiting-room-to-car/waiting-room-to-car.analytics.effects';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { InputRestrictionNumbersDirective } from '../../directives/input-restriction-numbers.directive';

@NgModule({
  declarations: [
    WaitingRoomToCarPage,
    InputRestrictionNumbersDirective,
  ],
  imports: [
    IonicPageModule.forChild(WaitingRoomToCarPage),
    EffectsModule.forFeature([WaitingRoomToCarAnalyticsEffects]),
  ],
  providers: [
    AnalyticsProvider,
  ],
})
export class WaitingRoomToCarPageModule {}
