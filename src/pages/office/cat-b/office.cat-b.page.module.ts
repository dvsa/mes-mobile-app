import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfficeCatBPage } from './office.cat-b.page';
import { EffectsModule } from '@ngrx/effects';
import { OfficeAnalyticsEffects } from '../office.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { OfficeComponentsModule } from '../components/office.components.module';
import { OfficeEffects } from '../office.effects';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
//import { OfficeCatBComponentsModule } from './components/office.cat-b.components.module';

@NgModule({
  declarations: [
    OfficeCatBPage,
  ],
  imports: [
    IonicPageModule.forChild(OfficeCatBPage),
    EffectsModule.forFeature([
      OfficeAnalyticsEffects,
      OfficeEffects,
    ]),
    ComponentsModule,
    //OfficeCatBComponentsModule,
    OfficeComponentsModule,
  ],
  providers: [
    FaultSummaryProvider,
  ],
})
export class OfficeCatBPageModule { }
