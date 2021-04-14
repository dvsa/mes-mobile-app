var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewTestResultCatADIPart2Page } from './view-test-result.cat-adi-part2.page';
import { SearchProvider } from '../../../providers/search/search';
import { CompressionProvider } from '../../../providers/compression/compression';
import { EffectsModule } from '@ngrx/effects';
import { ViewTestResultAnalyticsEffects } from '../view-test-result.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { ViewTestResultComponentsModule } from '../components/view-test-result.components.module';
import { ViewTestResultCatADIPart2ComponentsModule } from './components/view-test-result.cat-adi-part2.components.module';
var ViewTestResultCatADIPart2PageModule = /** @class */ (function () {
    function ViewTestResultCatADIPart2PageModule() {
    }
    ViewTestResultCatADIPart2PageModule = __decorate([
        NgModule({
            declarations: [
                ViewTestResultCatADIPart2Page,
            ],
            imports: [
                ComponentsModule,
                IonicPageModule.forChild(ViewTestResultCatADIPart2Page),
                ViewTestResultComponentsModule,
                ViewTestResultCatADIPart2ComponentsModule,
                EffectsModule.forFeature([ViewTestResultAnalyticsEffects]),
            ],
            providers: [
                SearchProvider,
                CompressionProvider,
                FaultSummaryProvider,
            ],
        })
    ], ViewTestResultCatADIPart2PageModule);
    return ViewTestResultCatADIPart2PageModule;
}());
export { ViewTestResultCatADIPart2PageModule };
//# sourceMappingURL=view-test-result.cat-adi-part2.page.module.js.map