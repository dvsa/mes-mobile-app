import { NgModule } from '@angular/core';
import { PostDebriefHoldingCatBPageModule } from './cat-b/post-debrief-holding.cat-b.page.module';
import { PostDebriefHoldingCatBEPageModule } from './cat-be/post-debrief-holding.cat-be.page.module';


@NgModule({
  imports: [
    PostDebriefHoldingCatBPageModule,
    PostDebriefHoldingCatBEPageModule,
  ],
})
export class PostDebriefHoldingPageModule { }
