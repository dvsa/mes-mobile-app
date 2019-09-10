import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { testsReducer } from './tests.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TestsEffects } from './tests.effects';
import { TestSubmissionProvider } from '../../providers/test-submission/test-submission';
import { TestsAnalyticsEffects } from './tests.analytics.effects';
import { TestDataEffects } from './test-data/test-data.effects';
import { NavigationProvider } from '../../providers/navigation/navigation';
import { NavigationStateProvider } from '../../providers/navigation-state/navigation-state';
import { ExaminerBookedEffects } from './examiner-booked/examiner-booked.effects';
import { ExaminerConductedEffects } from './examiner-conducted/examiner-conducted.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('tests', testsReducer),
    EffectsModule.forFeature([
      TestsEffects,
      TestsAnalyticsEffects,
      TestDataEffects,
      ExaminerBookedEffects,
      ExaminerConductedEffects,
    ]),
  ],
  providers:[
    TestSubmissionProvider,
    NavigationProvider,
    NavigationStateProvider,
  ],
})
export class TestsModule {}
