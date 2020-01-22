import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchProvider } from '../../../providers/search/search';
import { CompressionProvider } from '../../../providers/compression/compression';
import { EffectsModule } from '@ngrx/effects';
import { ViewTestResultAnalyticsEffects } from '../view-test-result.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { ViewTestResultComponentsModule } from '../components/view-test-result.components.module';
import { ViewTestResultCatAMod2ComponentsModule } from './components/view-test-result.cat-a-mod2.components.module';
import { ViewTestResultCatAMod2Page } from './view-test-result.cat-a-mod2.page';

@NgModule({
  declarations: [
    ViewTestResultCatAMod2Page,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ViewTestResultCatAMod2Page),
    ViewTestResultComponentsModule,
    ViewTestResultCatAMod2ComponentsModule,
    EffectsModule.forFeature([ViewTestResultAnalyticsEffects]),
  ],
  providers: [
    SearchProvider,
    CompressionProvider,
    FaultSummaryProvider,
  ],
})
export class ViewTestResultCatAMod2PageModule { }
