import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestResultsSearchPage } from './test-results-search';
import { TestResultsSearchComponentsModule } from './components/test-results-search-components.module';
import { SearchProvider } from '../../providers/search/search';

@NgModule({
  declarations: [
    TestResultsSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(TestResultsSearchPage),
    TestResultsSearchComponentsModule,
  ],
  providers: [
    SearchProvider,
  ],
})
export class TestResultsSearchPageModule {}
