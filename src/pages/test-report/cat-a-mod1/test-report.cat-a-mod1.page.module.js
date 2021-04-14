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
import { TestReportCatAMod1Page } from './test-report.cat-a-mod1.page';
import { TestReportCatAMod1ComponentsModule } from './components/test-report.cat-a-mod1.components.module';
var TestReportCatAMod1PageModule = /** @class */ (function () {
    function TestReportCatAMod1PageModule() {
    }
    TestReportCatAMod1PageModule = __decorate([
        NgModule({
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
    ], TestReportCatAMod1PageModule);
    return TestReportCatAMod1PageModule;
}());
export { TestReportCatAMod1PageModule };
//# sourceMappingURL=test-report.cat-a-mod1.page.module.js.map