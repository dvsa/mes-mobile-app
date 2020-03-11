import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfficeCatAMod2Page } from './office.cat-a-mod2.page';
import { EffectsModule } from '@ngrx/effects';
import { OfficeAnalyticsEffects } from '../office.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { OfficeComponentsModule } from '../components/office.components.module';
import { TranslateModule } from '@ngx-translate/core';
import { SafetyAndBalanceCardCatAMod2Component } from './components/safety-and-balance/safety-and-balance.cat-a-mod2';
import { ModeOfTransportCatAMod2Component } from './components/mode-of-transport/mode-of-transport.cat-a-mod2';
import { OfficeEffects } from '../office.effects';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';

@NgModule({
  declarations: [
    OfficeCatAMod2Page,
    SafetyAndBalanceCardCatAMod2Component,
    ModeOfTransportCatAMod2Component,
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
