import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { testsReducer } from './tests.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TestsEffects } from './tests.effects';
import { TestSubmissionProvider } from '../../providers/test-submission/test-submission';
import { TestsAnalyticsEffects } from './tests.analytics.effects';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { TestDataEffects } from './test-data/test-data.effects';
import { NavigationProvider } from '../../providers/navigation/navigation';
import { NavigationStateProvider } from '../../providers/navigation-state/navigation-state';

@NgModule({
  imports: [
    StoreModule.forFeature('tests', testsReducer),
    EffectsModule.forFeature([
      TestsEffects,
      TestsAnalyticsEffects,
      TestDataEffects,
    ]),
  ],
  providers:[
    TestSubmissionProvider,
    AnalyticsProvider,
    NavigationProvider,
    NavigationStateProvider,
  ],
})
export class TestsModule {}
