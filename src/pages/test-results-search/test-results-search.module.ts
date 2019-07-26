import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestResultsSearchPage } from './test-results-search';
import { TestResultsSearchComponentsModule } from './components/test-results-search-components.module';
import { SearchProvider } from '../../providers/search/search';
import { EffectsModule } from '@ngrx/effects';
import { TestResultsSearchAnalyticsEffects } from './test-results-search.analytics.effects';

@NgModule({
  declarations: [
    TestResultsSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(TestResultsSearchPage),
    TestResultsSearchComponentsModule,
    EffectsModule.forFeature([TestResultsSearchAnalyticsEffects]),
  ],
  providers: [
    SearchProvider,
  ],
})
export class TestResultsSearchPageModule {}
