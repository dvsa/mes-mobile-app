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
import { ViewTestResultCatAMod1ComponentsModule } from './components/view-test-result.cat-be.components.module';

@NgModule({
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
export class ViewTestResultCatBEPageModule { }
