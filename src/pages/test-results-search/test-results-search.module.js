var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestResultsSearchPage } from './test-results-search';
import { TestResultsSearchComponentsModule } from './components/test-results-search-components.module';
import { SearchProvider } from '../../providers/search/search';
import { EffectsModule } from '@ngrx/effects';
import { TestResultsSearchAnalyticsEffects } from './test-results-search.analytics.effects';
import { ComponentsModule } from '../../components/common/common-components.module';
var TestResultsSearchPageModule = /** @class */ (function () {
    function TestResultsSearchPageModule() {
    }
    TestResultsSearchPageModule = __decorate([
        NgModule({
            declarations: [
                TestResultsSearchPage,
            ],
            imports: [
                IonicPageModule.forChild(TestResultsSearchPage),
                TestResultsSearchComponentsModule,
                EffectsModule.forFeature([TestResultsSearchAnalyticsEffects]),
                ComponentsModule,
            ],
            providers: [
                SearchProvider,
            ],
        })
    ], TestResultsSearchPageModule);
    return TestResultsSearchPageModule;
}());
export { TestResultsSearchPageModule };
//# sourceMappingURL=test-results-search.module.js.map