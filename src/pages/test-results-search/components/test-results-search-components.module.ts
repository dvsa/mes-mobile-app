import { NgModule } from '@angular/core';
import { TabComponent } from './tab/tab';
import { TabsComponent } from './tabs/tabs';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [
    TabComponent,
    TabsComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    TabComponent,
    TabsComponent,
  ],
})
export class TestResultsSearchComponentsModule {}
