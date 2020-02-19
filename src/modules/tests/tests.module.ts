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
import { FaultCountProvider } from '../../providers/fault-count/fault-count';
import { TestStatusAnalyticsEffects } from './test-status/test-status.analytics.effects';
import { TestDataByCategoryProvider } from '../../providers/test-data-by-category/test-data-by-category';
import { ManoeuvresByCategoryProvider } from '../../providers/manoeuvres-by-category/manoeuvres-by-category';
import { VehicleDetailsByCategoryProvider }
 from '../../providers/vehicle-details-by-category/vehicle-details-by-category';

@NgModule({
  imports: [
    StoreModule.forFeature('tests', testsReducer),
    EffectsModule.forFeature([
      TestsEffects,
      TestsAnalyticsEffects,
      TestDataEffects,
      ExaminerBookedEffects,
      ExaminerConductedEffects,
      TestStatusAnalyticsEffects,
    ]),
  ],
  providers:[
    TestSubmissionProvider,
    FaultCountProvider,
    NavigationProvider,
    NavigationStateProvider,
    TestDataByCategoryProvider,
    ManoeuvresByCategoryProvider,
    VehicleDetailsByCategoryProvider,
  ],
})
export class TestsModule {}
