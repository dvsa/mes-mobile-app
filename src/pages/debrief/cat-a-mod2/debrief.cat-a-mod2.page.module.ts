import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DebriefCatAMod2Page } from './debrief.cat-a-mod2.page';
import { EffectsModule } from '@ngrx/effects';
import { DebriefAnalyticsEffects } from '../debrief.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { DebriefComponentsModule } from '../components/debrief-components.module';
import { TranslateModule } from 'ng2-translate';
import { DebriefEffects } from '../debrief.effects';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { VehicleChecksCardCatAMod2Component } from
'../cat-a-mod2/components/vehicle-checks-card/vehicle-checks-card.cat-a-mod2';

@NgModule({
  declarations: [
    VehicleChecksCardCatAMod2Component,
    DebriefCatAMod2Page,
  ],
  imports: [
    DebriefComponentsModule,
    IonicPageModule.forChild(DebriefCatAMod2Page),
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
export class DebriefCatAMod2PageModule { }
