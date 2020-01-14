import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { PostDebriefHoldingCatAMod2Page } from './post-debrief-holding.cat-a-mod2.page';

@NgModule({
  declarations: [
    PostDebriefHoldingCatAMod2Page,
  ],
  imports: [
    IonicPageModule.forChild(PostDebriefHoldingCatAMod2Page),
    ComponentsModule,
  ],
})
export class PostDebriefHoldingCatAMod2PageModule { }
