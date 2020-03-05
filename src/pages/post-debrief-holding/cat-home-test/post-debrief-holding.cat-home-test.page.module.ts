import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { PostDebriefHoldingCatHomeTestPage } from './post-debrief-holding.cat-home-test.page';

@NgModule({
  declarations: [
    PostDebriefHoldingCatHomeTestPage,
  ],
  imports: [
    IonicPageModule.forChild(PostDebriefHoldingCatHomeTestPage),
    ComponentsModule,
  ],
})
export class PostDebriefHoldingCatHomeTestPageModule { }
