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
import { TestReportCatAMod2Page } from './test-report.cat-a-mod2.page';
import { TestReportCatAMod2ComponentsModule } from './components/test-report.cat-a-mod2.components.module';
var TestReportCatAMod2PageModule = /** @class */ (function () {
    function TestReportCatAMod2PageModule() {
    }
    TestReportCatAMod2PageModule = __decorate([
        NgModule({
            declarations: [
                TestReportCatAMod2Page,
            ],
            imports: [
                TestReportComponentsModule,
                IonicPageModule.forChild(TestReportCatAMod2Page),
                StoreModule.forFeature('testReport', testReportReducer),
                EffectsModule.forFeature([
                    TestReportAnalyticsEffects,
                    TestReportEffects,
                ]),
                ComponentsModule,
                TestReportCatAMod2ComponentsModule,
            ],
            providers: [
                TestReportValidatorProvider,
                TestResultProvider,
            ],
        })
    ], TestReportCatAMod2PageModule);
    return TestReportCatAMod2PageModule;
}());
export { TestReportCatAMod2PageModule };
//# sourceMappingURL=test-report.cat-a-mod2.page.module.js.map