import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewTestResultPage } from './view-test-result';
import { SearchProvider } from '../../providers/search/search';
import { ViewTestResultComponentsModule } from './components/view-test-result.components.module';
import { CompressionProvider } from '../../providers/compression/compression';
import { EffectsModule } from '@ngrx/effects';
import { ViewTestResultAnalyticsEffects } from './view-test-result.analytics.effects';
import { ComponentsModule } from '../../components/common/common-components.module';
import { FaultSummaryProvider } from '../../providers/fault-summary/fault-summary';

@NgModule({
  declarations: [
    ViewTestResultPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ViewTestResultPage),
    ViewTestResultComponentsModule,
    EffectsModule.forFeature([ViewTestResultAnalyticsEffects]),
  ],
  providers: [
    SearchProvider,
    CompressionProvider,
    FaultSummaryProvider,
  ],
})
export class ViewTestResultPageModule { }
