import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { testsReducer } from './tests.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('tests', testsReducer),
  ],
})
export class TestsModule {}
