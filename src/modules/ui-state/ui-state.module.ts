import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { uiStateReducer } from './ui-state.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('ui', uiStateReducer),
  ],
})
export class UiStateModule {}
