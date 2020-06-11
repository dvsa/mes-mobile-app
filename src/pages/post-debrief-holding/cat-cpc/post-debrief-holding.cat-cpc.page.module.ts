import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../../components/common/common-components.module';
import { PostDebriefHoldingCatCPCPage } from './post-debrief-holding.cat-cpc.page';

@NgModule({
  declarations: [
    PostDebriefHoldingCatCPCPage,
  ],
  imports: [
    IonicPageModule.forChild(PostDebriefHoldingCatCPCPage),
    ComponentsModule,
  ],
})
export class PostDebriefHoldingCatCPCPageModule { }
