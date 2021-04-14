var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewTestResultCatCPage } from './view-test-result.cat-c.page';
import { SearchProvider } from '../../../providers/search/search';
import { CompressionProvider } from '../../../providers/compression/compression';
import { EffectsModule } from '@ngrx/effects';
import { ViewTestResultAnalyticsEffects } from '../view-test-result.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { ViewTestResultComponentsModule } from '../components/view-test-result.components.module';
import { ViewTestResultCatCComponentsModule } from './components/view-test-result.cat-c.components.module';
var ViewTestResultCatCPageModule = /** @class */ (function () {
    function ViewTestResultCatCPageModule() {
    }
    ViewTestResultCatCPageModule = __decorate([
        NgModule({
            declarations: [
                ViewTestResultCatCPage,
            ],
            imports: [
                ComponentsModule,
                IonicPageModule.forChild(ViewTestResultCatCPage),
                ViewTestResultComponentsModule,
                ViewTestResultCatCComponentsModule,
                EffectsModule.forFeature([ViewTestResultAnalyticsEffects]),
            ],
            providers: [
                SearchProvider,
                CompressionProvider,
                FaultSummaryProvider,
            ],
        })
    ], ViewTestResultCatCPageModule);
    return ViewTestResultCatCPageModule;
}());
export { ViewTestResultCatCPageModule };
//# sourceMappingURL=view-test-result.cat-c.page.module.js.map