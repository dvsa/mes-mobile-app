import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchProvider } from '../../../providers/search/search';
import { CompressionProvider } from '../../../providers/compression/compression';
import { EffectsModule } from '@ngrx/effects';
import { ViewTestResultAnalyticsEffects } from '../view-test-result.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { ViewTestResultComponentsModule } from '../components/view-test-result.components.module';
import { ViewTestResultCatManoeuvresPage } from './view-test-result.cat-manoeuvres.page';
import {
  ViewTestResultCatManoeuvresComponentsModule,
} from './components/view-test-result.cat-manoeuvres.components.module';

@NgModule({
  declarations: [
    ViewTestResultCatManoeuvresPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ViewTestResultCatManoeuvresPage),
    ViewTestResultComponentsModule,
    EffectsModule.forFeature([ViewTestResultAnalyticsEffects]),
    ViewTestResultCatManoeuvresComponentsModule,
  ],
  providers: [
    SearchProvider,
    CompressionProvider,
    FaultSummaryProvider,
  ],
})
export class ViewTestResultCatBPageModule { }
