import { NgModule } from '@angular/core';
import { DebriefCatBPageModule } from './cat-b/debrief.cat-b.page.module';
import { DebriefCatBePageModule } from './cat-be/debrief.cat-be.page.module';

@NgModule({
  imports: [
    DebriefCatBPageModule,
    DebriefCatBePageModule,
  ],
})
export class DebriefPageModule { }
