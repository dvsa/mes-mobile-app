var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import { CPCEndTestModalModule } from './components/cpc-end-test-modal/cpc-end-test-modal.module';
var TestReportCatCPCPageModule = /** @class */ (function () {
    function TestReportCatCPCPageModule() {
    }
    TestReportCatCPCPageModule = __decorate([
        NgModule({
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
                CPCEndTestModalModule,
            ],
            providers: [
                TestReportValidatorProvider,
                TestResultProvider,
            ],
        })
    ], TestReportCatCPCPageModule);
    return TestReportCatCPCPageModule;
}());
export { TestReportCatCPCPageModule };
//# sourceMappingURL=test-report.cat-cpc.page.module.js.map