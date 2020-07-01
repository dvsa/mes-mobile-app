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

@NgModule({
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
export class ViewTestResultCatCPCPageModule {}
