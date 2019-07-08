import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewTestResultPage } from './view-test-result';
import { SearchProvider } from '../../providers/search/search';
import { ViewTestResultComponentsModule } from './components/view-test-result.components.module';
import { CompressionProvider } from '../../providers/compression/compression';

@NgModule({
  declarations: [
    ViewTestResultPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewTestResultPage),
    ViewTestResultComponentsModule,
  ],
  providers: [
    SearchProvider,
    CompressionProvider,
  ],
})
export class ViewTestResultPageModule {}
