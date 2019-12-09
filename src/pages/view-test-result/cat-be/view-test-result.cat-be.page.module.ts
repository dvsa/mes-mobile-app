import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewTestResultCatBEPage } from './view-test-result.cat-be.page';
import { SearchProvider } from '../../../providers/search/search';
import { CompressionProvider } from '../../../providers/compression/compression';
import { EffectsModule } from '@ngrx/effects';
import { ViewTestResultAnalyticsEffects } from '../view-test-result.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { ViewTestResultComponentsModule } from '../components/view-test-result.components.module';
import { ViewTestResultCatBEComponentsModule } from './components/view-test-result.cat-be.components.module';

@NgModule({
  declarations: [
    ViewTestResultCatBEPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ViewTestResultCatBEPage),
    ViewTestResultComponentsModule,
    ViewTestResultCatBEComponentsModule,
    EffectsModule.forFeature([ViewTestResultAnalyticsEffects]),
  ],
  providers: [
    SearchProvider,
    CompressionProvider,
    FaultSummaryProvider,
  ],
})
export class ViewTestResultCatBEPageModule { }
