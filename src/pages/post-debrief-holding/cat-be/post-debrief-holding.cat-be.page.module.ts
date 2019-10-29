import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { PostDebriefHoldingCatBEPage } from './post-debrief-holding.cat-be.page';

@NgModule({
  declarations: [
    PostDebriefHoldingCatBEPage,
  ],
  imports: [
    IonicPageModule.forChild(PostDebriefHoldingCatBEPage),
    ComponentsModule,
  ],
})
export class PostDebriefHoldingCatBEPageModule { }
