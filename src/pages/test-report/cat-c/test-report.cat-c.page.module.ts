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
import { TestReportCatCPage } from './test-report.cat-c.page';
import { TestReportCatCComponentsModule } from './components/test-report.cat-c.components.module';
import { ReverseDiagramModalComponentsModule }
 from '../components/reverse-diagram-modal/reverse-diagram-modal.components.module';

@NgModule({
  declarations: [
    TestReportCatCPage,
  ],
  imports: [
    TestReportComponentsModule,
    IonicPageModule.forChild(TestReportCatCPage),
    StoreModule.forFeature('testReport', testReportReducer),
    EffectsModule.forFeature([
      TestReportAnalyticsEffects,
      TestReportEffects,
    ]),
    ComponentsModule,
    TestReportCatCComponentsModule,
    ReverseDiagramModalComponentsModule,
  ],
  providers: [
    TestReportValidatorProvider,
    TestResultProvider,
  ],
})
export class TestReportCatCPageModule { }
