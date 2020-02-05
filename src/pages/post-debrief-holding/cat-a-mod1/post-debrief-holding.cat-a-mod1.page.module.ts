import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { PostDebriefHoldingCatAMod1Page } from './post-debrief-holding.cat-a-mod1.page';

@NgModule({
  declarations: [
    PostDebriefHoldingCatAMod1Page,
  ],
  imports: [
    IonicPageModule.forChild(PostDebriefHoldingCatAMod1Page),
    ComponentsModule,
  ],
})
export class PostDebriefHoldingCatAMod1PageModule { }
