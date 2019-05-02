import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestReportPage } from './test-report';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { TestReportAnalyticsEffects } from './test-report.analytics.effects';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { testReportReducer } from './test-report.reducer';
import { ComponentsModule } from '../../components/components.module';
import { TestReportComponentsModule } from './components/test-report-components.module';
import { TestReportValidatorProvider } from '../../providers/test-report-validator/test-report-validator';
import { TestReportEffects } from './test-report.effects';

@NgModule({
  declarations: [
    TestReportPage,
  ],
  imports: [
    TestReportComponentsModule,
    IonicPageModule.forChild(TestReportPage),
    StoreModule.forFeature('testReport', testReportReducer),
    EffectsModule.forFeature([
      TestReportAnalyticsEffects,
      TestReportEffects,
    ]),
    ComponentsModule,
  ],
  providers: [
    AnalyticsProvider,
    TestReportValidatorProvider,
  ],
})
export class TestReportPageModule {}
