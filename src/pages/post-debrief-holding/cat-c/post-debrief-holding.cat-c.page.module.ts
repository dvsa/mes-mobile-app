import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { PostDebriefHoldingCatCPage } from './post-debrief-holding.cat-c.page';

@NgModule({
  declarations: [
    PostDebriefHoldingCatCPage,
  ],
  imports: [
    IonicPageModule.forChild(PostDebriefHoldingCatCPage),
    ComponentsModule,
  ],
})
export class PostDebriefHoldingCatCPageModule { }
