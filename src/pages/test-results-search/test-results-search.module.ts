import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestResultsSearchPage } from './test-results-search';
import { TestResultsSearchComponentsModule } from './components/test-results-search-components.module';

@NgModule({
  declarations: [
    TestResultsSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(TestResultsSearchPage),
    TestResultsSearchComponentsModule,
  ],
})
export class TestResultsSearchPageModule {}
