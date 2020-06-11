import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { IonicPageModule } from 'ionic-angular';
import { OfficeCatCpcPage } from './office.cat-cpc.page';
import { OfficeAnalyticsEffects } from '../office.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { OfficeComponentsModule } from '../components/office.components.module';
import { OfficeEffects } from '../office.effects';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { AssessmentReportComponent } from './components/assessment-report/assessment-report';
import { CombinationComponent } from './components/combination/combination';

@NgModule({
  declarations: [
    OfficeCatCpcPage,
    AssessmentReportComponent,
    CombinationComponent,
  ],
  imports: [
    IonicPageModule.forChild(OfficeCatCpcPage),
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
export class OfficeCatCpcPageModule { }
