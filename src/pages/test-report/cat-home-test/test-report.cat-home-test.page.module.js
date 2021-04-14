var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { TestReportCatHomeTestPage } from './test-report.cat-home-test.page';
import { TestReportComponentsModule } from '../components/test-report-components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { testReportReducer } from '../test-report.reducer';
import { TestReportAnalyticsEffects } from '../test-report.analytics.effects';
import { TestReportEffects } from '../test-report.effects';
import { ReverseDiagramModalComponentsModule, } from '../components/reverse-diagram-modal/reverse-diagram-modal.components.module';
import { TestReportValidatorProvider } from '../../../providers/test-report-validator/test-report-validator';
import { TestResultProvider } from '../../../providers/test-result/test-result';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TestReportCatHomeTestComponentsModule } from './components/test-report.cat-home-test.components.module';
var TestReportCatHomeTestPageModule = /** @class */ (function () {
    function TestReportCatHomeTestPageModule() {
    }
    TestReportCatHomeTestPageModule = __decorate([
        NgModule({
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
    ], TestReportCatHomeTestPageModule);
    return TestReportCatHomeTestPageModule;
}());
export { TestReportCatHomeTestPageModule };
//# sourceMappingURL=test-report.cat-home-test.page.module.js.map