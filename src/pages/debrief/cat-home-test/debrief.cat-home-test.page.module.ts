import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DebriefCatHomeTestPage } from './debrief.cat-home-test.page';
import { EffectsModule } from '@ngrx/effects';
import { DebriefAnalyticsEffects } from '../debrief.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { DebriefComponentsModule } from '../components/debrief-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { DebriefEffects } from '../debrief.effects';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';

@NgModule({
  declarations: [
    DebriefCatHomeTestPage,
  ],
  imports: [
    DebriefComponentsModule,
    IonicPageModule.forChild(DebriefCatHomeTestPage),
    EffectsModule.forFeature([
      DebriefEffects,
      DebriefAnalyticsEffects,
    ]),
    ComponentsModule,
    TranslateModule,
  ],
  providers: [
    FaultSummaryProvider,
  ],
})
export class DebriefCatHomeTestPageModule { }
