import { NgModule } from '@angular/core';
import { TabComponent } from './tab/tab';
import { TabsComponent } from './tabs/tabs';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { SearchResultComponent } from './search-result/search-result';
import { AdvancedSearchComponent } from './advanced-search/advanced-search';

@NgModule({
  declarations: [
    TabComponent,
    TabsComponent,
    SearchResultComponent,
    AdvancedSearchComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    TabComponent,
    TabsComponent,
    SearchResultComponent,
    AdvancedSearchComponent,
  ],
})
export class TestResultsSearchComponentsModule {}
