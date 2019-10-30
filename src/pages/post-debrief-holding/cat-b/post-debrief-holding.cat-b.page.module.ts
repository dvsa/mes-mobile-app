import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostDebriefHoldingCatBPage } from './post-debrief-holding.cat-b.page';
import { ComponentsModule } from '../../../components/common/common-components.module';

@NgModule({
  declarations: [
    PostDebriefHoldingCatBPage,
  ],
  imports: [
    IonicPageModule.forChild(PostDebriefHoldingCatBPage),
    ComponentsModule,
  ],
})
export class PostDebriefHoldingCatBPageModule { }
