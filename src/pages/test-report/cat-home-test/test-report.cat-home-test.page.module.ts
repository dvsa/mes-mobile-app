import { TestReportCatHomeTestPage } from './test-report.cat-home-test.page';
import { TestReportComponentsModule } from '../components/test-report-components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { testReportReducer } from '../test-report.reducer';
import { TestReportAnalyticsEffects } from '../test-report.analytics.effects';
import { TestReportEffects } from '../test-report.effects';
import {
  ReverseDiagramModalComponentsModule,
} from '../components/reverse-diagram-modal/reverse-diagram-modal.components.module';
import { TestReportValidatorProvider } from '../../../providers/test-report-validator/test-report-validator';
import { TestResultProvider } from '../../../providers/test-result/test-result';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TestReportCatHomeTestComponentsModule } from './components/test-report.cat-home-test.components.module';

@NgModule({
  declarations: [
    TestReportCatHomeTestPage,
  ],
  imports: [
    TestReportComponentsModule,
    IonicPageModule.forChild(TestReportCatHomeTestPage),
    StoreModule.forFeature('testReport', testReportReducer),
    EffectsModule.forFeature([
      TestReportAnalyticsEffects,
      TestReportEffects,
    ]),
    ComponentsModule,
    TestReportCatHomeTestComponentsModule,
    ReverseDiagramModalComponentsModule,
  ],
  providers: [
    TestReportValidatorProvider,
    TestResultProvider,
  ],
})
export class TestReportCatHomeTestPageModule { }
