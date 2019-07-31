import { NgModule } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { appInfoReducer } from './app-info.reducer';
import { AppInfoEffects } from './app-info.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('appInfo', appInfoReducer),
    EffectsModule.forFeature([AppInfoEffects]),
  ],
  providers: [
    AppVersion,
  ],
})
export class AppInfoModule {}
