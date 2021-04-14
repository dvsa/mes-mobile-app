var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { ViewTestResultCatCPCPage } from './view-test-result.cat-cpc.page';
import { IonicPageModule } from 'ionic-angular';
import { ViewTestResultComponentsModule } from '../components/view-test-result.components.module';
import { EffectsModule } from '@ngrx/effects';
import { ViewTestResultAnalyticsEffects } from '../view-test-result.analytics.effects';
import { ViewTestResultCatCPCComponentsModule } from './components/view-test-result.cat-cpc.components.module';
import { CompressionProvider } from '../../../providers/compression/compression';
import { SearchProvider } from '../../../providers/search/search';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
var ViewTestResultCatCPCPageModule = /** @class */ (function () {
    function ViewTestResultCatCPCPageModule() {
    }
    ViewTestResultCatCPCPageModule = __decorate([
        NgModule({
            declarations: [
                ViewTestResultCatCPCPage,
            ],
            imports: [
                ComponentsModule,
                IonicPageModule.forChild(ViewTestResultCatCPCPage),
                ViewTestResultComponentsModule,
                EffectsModule.forFeature([ViewTestResultAnalyticsEffects]),
                ViewTestResultCatCPCComponentsModule,
            ],
            providers: [
                SearchProvider,
                CompressionProvider,
                FaultSummaryProvider,
            ],
        })
    ], ViewTestResultCatCPCPageModule);
    return ViewTestResultCatCPCPageModule;
}());
export { ViewTestResultCatCPCPageModule };
//# sourceMappingURL=view-test-result.cat-cpc.page.module.js.map