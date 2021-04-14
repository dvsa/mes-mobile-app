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
import { TestReportCatADIPart2Page } from './test-report.cat-adi-part2.page';
import { TestReportCatADIPart2ComponentsModule } from './components/test-report.cat-adi-part2.components.module';
var TestReportCatADIPart2PageModule = /** @class */ (function () {
    function TestReportCatADIPart2PageModule() {
    }
    TestReportCatADIPart2PageModule = __decorate([
        NgModule({
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
    ], TestReportCatADIPart2PageModule);
    return TestReportCatADIPart2PageModule;
}());
export { TestReportCatADIPart2PageModule };
//# sourceMappingURL=test-report.cat-adi-part2.page.module.js.map