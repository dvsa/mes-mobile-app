import { NgModule } from '@angular/core';
import { DebriefCatBPageModule } from './cat-b/debrief.cat-b.page.module';
import { DebriefCatBEPageModule } from './cat-be/debrief.cat-be.page.module';

@NgModule({
  imports: [
    DebriefCatBPageModule,
    DebriefCatBEPageModule,
  ],
})
export class DebriefPageModule { }
