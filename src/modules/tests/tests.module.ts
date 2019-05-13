import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { testsReducer } from './tests.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TestsEffects } from './tests.effects';
import { TestSubmissionProvider } from '../../providers/test-submission/test-submission';

@NgModule({
  imports: [
    StoreModule.forFeature('tests', testsReducer),
    EffectsModule.forFeature([TestsEffects]),
  ],
  providers:[
    TestSubmissionProvider,
  ],
})
export class TestsModule {}
