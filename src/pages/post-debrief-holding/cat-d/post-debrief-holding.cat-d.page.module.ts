import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { PostDebriefHoldingCatDPage } from './post-debrief-holding.cat-d.page';

@NgModule({
  declarations: [
    PostDebriefHoldingCatDPage,
  ],
  imports: [
    IonicPageModule.forChild(PostDebriefHoldingCatDPage),
    ComponentsModule,
  ],
})
export class PostDebriefHoldingCatDPageModule { }
