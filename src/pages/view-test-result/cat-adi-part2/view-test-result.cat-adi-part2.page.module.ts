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
import { ViewTestResultCatADIPart2ComponentsModule } from
'./components/view-test-result.cat-adi-part2.components.module';

@NgModule({
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
export class ViewTestResultCatADIPart2PageModule { }
