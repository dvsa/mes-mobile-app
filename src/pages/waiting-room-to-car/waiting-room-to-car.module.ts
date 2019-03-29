import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitingRoomToCarPage } from './waiting-room-to-car';
import { EffectsModule } from '@ngrx/effects';
import { WaitingRoomToCarAnalyticsEffects } from '../waiting-room-to-car/waiting-room-to-car.analytics.effects';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { InputRestrictionNumbersDirective } from '../../directives/input-restriction-numbers.directive';
import {
  InputRestrictionUppercaseAlphanumDirective,
} from '../../directives/input-restriction-uppercasealphanum.directive';
import {
  EyesightFailureConfirmationComponent,
} from './components/eyesight-failure-confirmation/eyesight-failure-confirmation';
import { StoreModule } from '@ngrx/store';
import { waitingRoomToCarReducer } from './waiting-room-to-car.reducer';

@NgModule({
  declarations: [
    WaitingRoomToCarPage,
    InputRestrictionNumbersDirective,
    InputRestrictionUppercaseAlphanumDirective,
    EyesightFailureConfirmationComponent,
  ],
  imports: [
    IonicPageModule.forChild(WaitingRoomToCarPage),
    StoreModule.forFeature('waitingRoomToCar', waitingRoomToCarReducer),
    EffectsModule.forFeature([WaitingRoomToCarAnalyticsEffects]),
  ],
  providers: [
    AnalyticsProvider,
  ],
})
export class WaitingRoomToCarPageModule {}
