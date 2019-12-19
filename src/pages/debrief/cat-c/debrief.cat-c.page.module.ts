import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DebriefCatCPage } from './debrief.cat-c.page';
import { EffectsModule } from '@ngrx/effects';
import { DebriefAnalyticsEffects } from '../debrief.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { DebriefComponentsModule } from '../components/debrief-components.module';
import { TranslateModule } from 'ng2-translate';
import { DebriefEffects } from '../debrief.effects';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { VehicleChecksCardCatCComponent } from './components/vehicle-checks-card/vehicle-checks-card.cat-c';

@NgModule({
  declarations: [
    VehicleChecksCardCatCComponent,
    DebriefCatCPage,
  ],
  imports: [
    DebriefComponentsModule,
    IonicPageModule.forChild(DebriefCatCPage),
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
export class DebriefCatCPageModule { }
