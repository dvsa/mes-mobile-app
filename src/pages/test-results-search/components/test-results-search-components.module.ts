import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { SearchResultComponent } from './search-result/search-result';
import { AdvancedSearchComponent } from './advanced-search/advanced-search';
import { DirectivesModule } from '../../../directives/directives.module';

@NgModule({
  declarations: [
    SearchResultComponent,
    AdvancedSearchComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    DirectivesModule,
  ],
  exports: [
    SearchResultComponent,
    AdvancedSearchComponent,
  ],
})
export class TestResultsSearchComponentsModule {}
