import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DebriefCatBEPage } from './debrief.cat-be.page';
import { EffectsModule } from '@ngrx/effects';
import { DebriefAnalyticsEffects } from '../debrief.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { DebriefComponentsModule } from '../components/debrief-components.module';
import { TranslateModule } from 'ng2-translate';
import { DebriefEffects } from '../debrief.effects';
import { FaultListProvider } from '../../../providers/fault-list/fault-list';

@NgModule({
  declarations: [
    DebriefCatBEPage,
  ],
  imports: [
    DebriefComponentsModule,
    IonicPageModule.forChild(DebriefCatBEPage),
    EffectsModule.forFeature([
      DebriefEffects,
      DebriefAnalyticsEffects,
    ]),
    ComponentsModule,
    TranslateModule,
  ],
  providers: [
    FaultListProvider,
  ],
})
export class DebriefCatBEPageModule { }
