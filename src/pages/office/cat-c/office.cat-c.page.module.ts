import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfficeCatCPage } from './office.cat-c.page';
import { EffectsModule } from '@ngrx/effects';
import { OfficeAnalyticsEffects } from '../office.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { OfficeComponentsModule } from '../components/office.components.module';
import { OfficeEffects } from '../office.effects';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { PassFinalisationComponentsModule }
 from '../../pass-finalisation/components/pass-finalisation-components.module';
import { TestFinalisationComponentsModule }
 from '../../../components/test-finalisation/test-finalisation-component.module';

@NgModule({
  declarations: [
    OfficeCatCPage,
  ],
  imports: [
    IonicPageModule.forChild(OfficeCatCPage),
    EffectsModule.forFeature([
      OfficeAnalyticsEffects,
      OfficeEffects,
    ]),
    ComponentsModule,
    OfficeComponentsModule,
    PassFinalisationComponentsModule,
    TestFinalisationComponentsModule,
  ],
  providers: [
    FaultSummaryProvider,
  ],
})
export class OfficeCatCPageModule { }
