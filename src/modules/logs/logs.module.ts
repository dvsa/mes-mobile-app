import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { logsReducer } from './logs.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('logs', logsReducer),
  ],
})
export class LogsModule {}
