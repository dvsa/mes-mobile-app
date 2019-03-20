import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { testReducer } from './test.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('tests', testReducer),
  ],
})
export class TestModule {}
