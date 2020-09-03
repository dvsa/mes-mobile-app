import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfficeCatDPage } from './office.cat-d.page';
import { EffectsModule } from '@ngrx/effects';
import { OfficeAnalyticsEffects } from '../office.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { OfficeComponentsModule } from '../components/office.components.module';
import { OfficeEffects } from '../office.effects';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { TestFinalisationComponentsModule }
 from '../../../components/test-finalisation/test-finalisation-component.module';
import { PassFinalisationComponentsModule }
 from '../../pass-finalisation/components/pass-finalisation-components.module';

@NgModule({
  declarations: [
    OfficeCatDPage,
  ],
  imports: [
    IonicPageModule.forChild(OfficeCatDPage),
    EffectsModule.forFeature([
      OfficeAnalyticsEffects,
      OfficeEffects,
    ]),
    ComponentsModule,
    OfficeComponentsModule,
    TestFinalisationComponentsModule,
    PassFinalisationComponentsModule,
  ],
  providers: [
    FaultSummaryProvider,
  ],
})
export class OfficeCatDPageModule { }
