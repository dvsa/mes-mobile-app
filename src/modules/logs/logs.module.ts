import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { logsReducer } from './logs.reducer';
import { LogsEffects } from './logs.effects';
import { DateTimeProvider } from '../../providers/date-time/date-time';

@NgModule({
  imports: [
    StoreModule.forFeature('logs', logsReducer),
    EffectsModule.forFeature([LogsEffects]),
  ],
  providers: [
    DateTimeProvider,
  ],
})
export class LogsModule {}
