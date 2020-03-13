import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DebriefCatBPage } from './debrief.cat-b.page';
import { EffectsModule } from '@ngrx/effects';
import { DebriefAnalyticsEffects } from '../debrief.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { DebriefComponentsModule } from '../components/debrief-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { DebriefEffects } from '../debrief.effects';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { DebriefCatBComponentsModule } from './components/debrief.cat-b.components.module';

@NgModule({
  declarations: [
    DebriefCatBPage,
  ],
  imports: [
    DebriefComponentsModule,
    IonicPageModule.forChild(DebriefCatBPage),
    EffectsModule.forFeature([
      DebriefEffects,
      DebriefAnalyticsEffects,
    ]),
    ComponentsModule,
    TranslateModule,
    DebriefCatBComponentsModule,
  ],
  providers: [
    FaultSummaryProvider,
  ],
})
export class DebriefCatBPageModule { }
