import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { IonicPageModule } from 'ionic-angular';
import { OfficeCatCPCPage } from './office.cat-cpc.page';
import { OfficeAnalyticsEffects } from '../office.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { OfficeComponentsModule } from '../components/office.components.module';
import { OfficeEffects } from '../office.effects';
import { AssessmentReportComponent } from './components/assessment-report/assessment-report';
import { CombinationComponent } from './components/combination/combination';
import { TestFinalisationComponentsModule }
 from '../../../components/test-finalisation/test-finalisation-component.module';
import { PassFinalisationComponentsModule }
 from '../../pass-finalisation/components/pass-finalisation-components.module';

@NgModule({
  declarations: [
    OfficeCatCPCPage,
    AssessmentReportComponent,
    CombinationComponent,
  ],
  imports: [
    IonicPageModule.forChild(OfficeCatCPCPage),
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
  ],
})
export class OfficeCatCPCPageModule { }
