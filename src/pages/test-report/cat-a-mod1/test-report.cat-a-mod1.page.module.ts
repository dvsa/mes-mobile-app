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
import { TestReportCatAMod1Page } from './test-report.cat-a-mod1.page';
import { TestReportCatAMod1ComponentsModule } from './components/test-report.cat-a-mod1.components.module';

@NgModule({
  declarations: [
    TestReportCatAMod1Page,
  ],
  imports: [
    TestReportComponentsModule,
    IonicPageModule.forChild(TestReportCatAMod1Page),
    StoreModule.forFeature('testReport', testReportReducer),
    EffectsModule.forFeature([
      TestReportAnalyticsEffects,
      TestReportEffects,
    ]),
    ComponentsModule,
    TestReportCatAMod1ComponentsModule,
  ],
  providers: [
    TestReportValidatorProvider,
    TestResultProvider,
  ],
})
export class TestReportCatAMod1PageModule { }
