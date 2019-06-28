import { NgModule } from '@angular/core';
import { TabComponent } from './tab/tab';
import { TabsComponent } from './tabs/tabs';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { SearchResultComponent } from './search-result/search-result';

@NgModule({
  declarations: [
    TabComponent,
    TabsComponent,
    SearchResultComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    TabComponent,
    TabsComponent,
    SearchResultComponent,
  ],
})
export class TestResultsSearchComponentsModule {}
