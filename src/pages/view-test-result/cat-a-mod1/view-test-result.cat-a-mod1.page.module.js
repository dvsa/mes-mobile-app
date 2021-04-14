var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewTestResultCatAMod1Page } from './view-test-result.cat-a-mod1.page';
import { SearchProvider } from '../../../providers/search/search';
import { CompressionProvider } from '../../../providers/compression/compression';
import { EffectsModule } from '@ngrx/effects';
import { ViewTestResultAnalyticsEffects } from '../view-test-result.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { ViewTestResultComponentsModule } from '../components/view-test-result.components.module';
import { ViewTestResultCatAMod1ComponentsModule } from './components/view-test-result.cat-a-mod1.components.module';
var ViewTestResultCatAMod1PageModule = /** @class */ (function () {
    function ViewTestResultCatAMod1PageModule() {
    }
    ViewTestResultCatAMod1PageModule = __decorate([
        NgModule({
            declarations: [
                ViewTestResultCatAMod1Page,
            ],
            imports: [
                ComponentsModule,
                IonicPageModule.forChild(ViewTestResultCatAMod1Page),
                ViewTestResultComponentsModule,
                ViewTestResultCatAMod1ComponentsModule,
                EffectsModule.forFeature([ViewTestResultAnalyticsEffects]),
            ],
            providers: [
                SearchProvider,
                CompressionProvider,
                FaultSummaryProvider,
            ],
        })
    ], ViewTestResultCatAMod1PageModule);
    return ViewTestResultCatAMod1PageModule;
}());
export { ViewTestResultCatAMod1PageModule };
//# sourceMappingURL=view-test-result.cat-a-mod1.page.module.js.map