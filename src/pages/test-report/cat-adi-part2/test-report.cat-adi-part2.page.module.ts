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
import { TestReportCatADIPart2Page } from './test-report.cat-adi-part2.page';
import { TestReportCatADIPart2ComponentsModule } from './components/test-report.cat-adi-part2.components.module';

@NgModule({
  declarations: [
    TestReportCatADIPart2Page,
  ],
  imports: [
    TestReportCatADIPart2ComponentsModule,
    TestReportComponentsModule,
    IonicPageModule.forChild(TestReportCatADIPart2Page),
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
export class TestReportCatADIPart2PageModule {}
