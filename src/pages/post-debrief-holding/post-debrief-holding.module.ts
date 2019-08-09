import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostDebriefHoldingPage } from './post-debrief-holding';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { ComponentsModule } from '../../components/common/common-components.module';

@NgModule({
  declarations: [
    PostDebriefHoldingPage,
  ],
  imports: [
    IonicPageModule.forChild(PostDebriefHoldingPage),
    ComponentsModule,
  ],
  providers: [
    AnalyticsProvider,
  ],
})
export class PostDebriefHoldingPageModule { }
