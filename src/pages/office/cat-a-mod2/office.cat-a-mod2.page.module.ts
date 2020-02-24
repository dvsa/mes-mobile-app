import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfficeCatAMod2Page } from './office.cat-a-mod2.page';
import { EffectsModule } from '@ngrx/effects';
import { OfficeAnalyticsEffects } from '../office.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { OfficeComponentsModule } from '../components/office.components.module';
import { TranslateModule } from 'ng2-translate';
import { SafetyAndBalanceCardCatAMod2Component } from './components/safety-and-balance/safety-and-balance.cat-a-mod2';
import { OfficeEffects } from '../office.effects';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';

@NgModule({
  declarations: [
    OfficeCatAMod2Page,
    SafetyAndBalanceCardCatAMod2Component,
  ],
  imports: [
    IonicPageModule.forChild(OfficeCatAMod2Page),
    EffectsModule.forFeature([
      OfficeAnalyticsEffects,
      OfficeEffects,
    ]),
    ComponentsModule,
    OfficeComponentsModule,
    TranslateModule,
  ],
  providers: [
    FaultSummaryProvider,
  ],
})
export class OfficeCatAMod2PageModule { }
