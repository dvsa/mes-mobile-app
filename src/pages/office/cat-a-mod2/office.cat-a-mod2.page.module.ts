import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfficeCatAMod2Page } from './office.cat-a-mod2.page';
import { EffectsModule } from '@ngrx/effects';
import { OfficeAnalyticsEffects } from '../office.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { OfficeComponentsModule } from '../components/office.components.module';
import { OfficeEffects } from '../office.effects';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
//import { OfficeCatAMod2ComponentsModule } from './components/office.cat-a-mod2.components.module';

@NgModule({
  declarations: [
    OfficeCatAMod2Page,
  ],
  imports: [
    IonicPageModule.forChild(OfficeCatAMod2Page),
    EffectsModule.forFeature([
      OfficeAnalyticsEffects,
      OfficeEffects,
    ]),
    ComponentsModule,
    //OfficeCatAMod2ComponentsModule,
    OfficeComponentsModule,
  ],
  providers: [
    FaultSummaryProvider,
  ],
})
export class OfficeCatAMod2PageModule { }
