import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { testsReducer } from './tests.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TestsEffects } from './tests.effects';
import { TestSubmissionProvider } from '../../providers/test-submission/test-submission';
import { TestsAnalyticsEffects } from './tests.analytics.effects';
import { AnalyticsProvider } from '../../providers/analytics/analytics';

@NgModule({
  imports: [
    StoreModule.forFeature('tests', testsReducer),
    EffectsModule.forFeature([
      TestsEffects,
      TestsAnalyticsEffects,
    ]),
  ],
  providers:[
    TestSubmissionProvider,
    AnalyticsProvider,
  ],
})
export class TestsModule {}
