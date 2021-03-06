import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DebriefCatAMod1Page } from './debrief.cat-a-mod1.page';
import { EffectsModule } from '@ngrx/effects';
import { DebriefAnalyticsEffects } from '../debrief.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { DebriefComponentsModule } from '../components/debrief-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { DebriefEffects } from '../debrief.effects';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { DebriefCatAMod1ComponentsModule } from './components/debrief.cat-a-mod1.components.module';

@NgModule({
  declarations: [
    DebriefCatAMod1Page,
  ],
  imports: [
    DebriefComponentsModule,
    IonicPageModule.forChild(DebriefCatAMod1Page),
    EffectsModule.forFeature([
      DebriefEffects,
      DebriefAnalyticsEffects,
    ]),
    ComponentsModule,
    TranslateModule,
    DebriefCatAMod1ComponentsModule,
  ],
  providers: [
    FaultSummaryProvider,
  ],
})
export class DebriefCatAMod1PageModule { }
