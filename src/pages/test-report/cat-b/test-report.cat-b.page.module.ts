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
import { TestReportCatBPage } from './test-report.cat-b.page';
import { TestReportCatBComponentsModule } from './components/test-report.cat-b.components.module';
import {
  LoneWorkerIntegrationProvider,
} from '../../../providers/lone-worker-integration/lone-worker-integration.provider';
import { LoneWorkerIonicModule } from '../../../external-modules/lw-ionic-module/lone-worker.module';

@NgModule({
  declarations: [
    TestReportCatBPage,
  ],
  imports: [
    TestReportCatBComponentsModule,
    TestReportComponentsModule,
    IonicPageModule.forChild(TestReportCatBPage),
    StoreModule.forFeature('testReport', testReportReducer),
    EffectsModule.forFeature([
      TestReportAnalyticsEffects,
      TestReportEffects,
    ]),
    ComponentsModule,
    LoneWorkerIonicModule,
  ],
  providers: [
    TestReportValidatorProvider,
    TestResultProvider,
    LoneWorkerIntegrationProvider,
  ],
})
export class TestReportCatBPageModule {}
