import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewTestResultPage } from './view-test-result';
import { SearchProvider } from '../../providers/search/search';
import { ViewTestResultComponentsModule } from './components/view-test-result.components.module';

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
  ],
})
export class ViewTestResultPageModule {}
