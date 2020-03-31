import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfficeCatADIPart2Page } from './office.cat-adi-part2.page';
import { EffectsModule } from '@ngrx/effects';
import { OfficeAnalyticsEffects } from '../office.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { OfficeComponentsModule } from '../components/office.components.module';
import { OfficeEffects } from '../office.effects';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { VehicleChecksOfficeCardCatADI2Component } from './components/vehicle-checks/vehicle-checks-office-card';
import { ShowMeQuestionsCatADI2Component } from './components/show-me-questions/show-me-questions';

@NgModule({
  declarations: [
    OfficeCatADIPart2Page,
    VehicleChecksOfficeCardCatADI2Component,
    ShowMeQuestionsCatADI2Component,
  ],
  imports: [
    IonicPageModule.forChild(OfficeCatADIPart2Page),
    EffectsModule.forFeature([
      OfficeAnalyticsEffects,
      OfficeEffects,
    ]),
    ComponentsModule,
    OfficeComponentsModule,
  ],
  providers: [
    FaultSummaryProvider,
  ],
})
export class OfficeCatADIPart2PageModule { }
