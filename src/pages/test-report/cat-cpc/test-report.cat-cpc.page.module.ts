import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { TestReportAnalyticsEffects } from '../test-report.analytics.effects';
import { testReportReducer } from '../test-report.reducer';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { TestReportEffects } from '../test-report.effects';
import { TestReportCatCPCPage } from './test-report.cat-cpc.page';
import { TestReportValidatorProvider } from '../../../providers/test-report-validator/test-report-validator';
import { TestResultProvider } from '../../../providers/test-result/test-result';
import { TestReportComponentsModule } from '../components/test-report-components.module';
import { TestReportCatCPCComponentsModule } from './components/test-report.cat-cpc.components.module';
import { CpcEndTestModalModule } from './components/cpc-end-test-modal/cpc-end-test-modal.module';

@NgModule({
  declarations: [
    TestReportCatCPCPage,
  ],
  imports: [
    IonicPageModule.forChild(TestReportCatCPCPage),
    StoreModule.forFeature('testReport', testReportReducer),
    EffectsModule.forFeature([
      TestReportAnalyticsEffects,
      TestReportEffects,
    ]),
    ComponentsModule,
    TestReportComponentsModule,
    TestReportCatCPCComponentsModule,
    CpcEndTestModalModule,
  ],
  providers: [
    TestReportValidatorProvider,
    TestResultProvider,
  ],
})
export class TestReportCatCPCPageModule { }
