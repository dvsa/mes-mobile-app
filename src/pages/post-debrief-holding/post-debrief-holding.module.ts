import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostDebriefHoldingPage } from './post-debrief-holding';
import { ComponentsModule } from '../../components/common/common-components.module';

@NgModule({
  declarations: [
    PostDebriefHoldingPage,
  ],
  imports: [
    IonicPageModule.forChild(PostDebriefHoldingPage),
    ComponentsModule,
  ],
})
export class PostDebriefHoldingPageModule { }
