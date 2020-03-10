import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { PostDebriefHoldingCatADIPart2Page } from './post-debrief-holding.cat-adi-part2.page';

@NgModule({
  declarations: [
    PostDebriefHoldingCatADIPart2Page,
  ],
  imports: [
    IonicPageModule.forChild(PostDebriefHoldingCatADIPart2Page),
    ComponentsModule,
  ],
})
export class PostDebriefHoldingCatADIPart2PageModule { }
