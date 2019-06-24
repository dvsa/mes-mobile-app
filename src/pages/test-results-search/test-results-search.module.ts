import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestResultsSearchPage } from './test-results-search';

@NgModule({
  declarations: [
    TestResultsSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(TestResultsSearchPage),
  ],
})
export class TestResultsSearchPageModule {}
