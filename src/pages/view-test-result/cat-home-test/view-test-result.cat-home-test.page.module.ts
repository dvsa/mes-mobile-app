import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewTestResultCatHomeTestPage } from './view-test-result.cat-home-test.page';
import { SearchProvider } from '../../../providers/search/search';
import { CompressionProvider } from '../../../providers/compression/compression';
import { EffectsModule } from '@ngrx/effects';
import { ViewTestResultAnalyticsEffects } from '../view-test-result.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { ViewTestResultComponentsModule } from '../components/view-test-result.components.module';
import { ViewTestResultCatHomeTestComponentsModule } from './components/view-test-result.cat-home-test.components.module';

@NgModule({
  declarations: [
    ViewTestResultCatHomeTestPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ViewTestResultCatHomeTestPage),
    ViewTestResultComponentsModule,
    ViewTestResultCatHomeTestComponentsModule,
    EffectsModule.forFeature([ViewTestResultAnalyticsEffects]),
  ],
  providers: [
    SearchProvider,
    CompressionProvider,
    FaultSummaryProvider,
  ],
})
export class ViewTestResultCatHomeTestPageModule { }
