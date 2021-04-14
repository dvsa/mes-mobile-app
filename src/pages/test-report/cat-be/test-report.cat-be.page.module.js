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
import { TestReportComponentsModule } from '../components/test-report-components.module';
import { TestReportValidatorProvider } from '../../../providers/test-report-validator/test-report-validator';
import { TestReportEffects } from '../test-report.effects';
import { TestResultProvider } from '../../../providers/test-result/test-result';
import { TestReportCatBEPage } from './test-report.cat-be.page';
import { TestReportCatBEComponentsModule } from './components/test-report.cat-be.components.module';
import { ReverseDiagramModalComponentsModule } from '../components/reverse-diagram-modal/reverse-diagram-modal.components.module';
var TestReportCatBEPageModule = /** @class */ (function () {
    function TestReportCatBEPageModule() {
    }
    TestReportCatBEPageModule = __decorate([
        NgModule({
            declarations: [
                TestReportCatBEPage,
            ],
            imports: [
                TestReportComponentsModule,
                IonicPageModule.forChild(TestReportCatBEPage),
                StoreModule.forFeature('testReport', testReportReducer),
                EffectsModule.forFeature([
                    TestReportAnalyticsEffects,
                    TestReportEffects,
                ]),
                ComponentsModule,
                TestReportCatBEComponentsModule,
                ReverseDiagramModalComponentsModule,
            ],
            providers: [
                TestReportValidatorProvider,
                TestResultProvider,
            ],
        })
    ], TestReportCatBEPageModule);
    return TestReportCatBEPageModule;
}());
export { TestReportCatBEPageModule };
//# sourceMappingURL=test-report.cat-be.page.module.js.map