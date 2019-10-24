import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { TestReportAnalyticsEffects } from '../test-report.analytics.effects';
import { testReportReducer } from '../test-report.reducer';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { TestReportComponentsModule } from '../components/test-report-components.module';
import { TestReportValidatorProvider } from '../../../providers/test-report-validator/test-report-validator';
import { TestReportEffects } from '../test-report.effects';
import { TestResultProvider } from '../../../providers/test-result/test-result';
import { TestReportCatBEPage } from './test-report.cat-be.page';
import { TestReportCatBEComponentsModule } from './components/test-report.cat-be.components.module';

@NgModule({
  declarations: [
    TestReportCatBEPage,
  ],
  imports: [
    TestReportCatBEComponentsModule,
    TestReportComponentsModule,
    IonicPageModule.forChild(TestReportCatBEPage),
    StoreModule.forFeature('testReport', testReportReducer),
    EffectsModule.forFeature([
      TestReportAnalyticsEffects,
      TestReportEffects,
    ]),
    ComponentsModule,
  ],
  providers: [
    TestReportValidatorProvider,
    TestResultProvider,
  ],
})
export class TestReportCatBEPageModule {}
