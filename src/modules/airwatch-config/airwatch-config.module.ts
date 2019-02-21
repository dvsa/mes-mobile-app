import { NgModule } from '@angular/core';
import { AppPreferences } from '@ionic-native/app-preferences';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { airwatchConfigReducer } from './airwatch-config.reducer';
import { AirwatchConfigEffects } from './airwatch-config.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('airwatchConfig', airwatchConfigReducer),
    EffectsModule.forFeature([AirwatchConfigEffects]),
  ],
  providers: [
    AppPreferences,
  ],
})
export class AirwatchConfigModule {}
