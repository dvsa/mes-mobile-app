import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfficeCatAMod1Page } from './office.cat-a-mod1.page';
import { EffectsModule } from '@ngrx/effects';
import { OfficeAnalyticsEffects } from '../office.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { OfficeComponentsModule } from '../components/office.components.module';
import { OfficeEffects } from '../office.effects';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { CircuitComponent } from './components/circuit/circuit';
import { DebriefCatAMod1ComponentsModule }
  from '../../debrief/cat-a-mod1/components/debrief.cat-a-mod1.components.module';

@NgModule({
  declarations: [
    OfficeCatAMod1Page,
    CircuitComponent,
  ],
  imports: [
    IonicPageModule.forChild(OfficeCatAMod1Page),
    EffectsModule.forFeature([
      OfficeAnalyticsEffects,
      OfficeEffects,
    ]),
    ComponentsModule,
    OfficeComponentsModule,
    DebriefCatAMod1ComponentsModule,
  ],
  providers: [
    FaultSummaryProvider,
  ],
})
export class OfficeCatAMod1PageModule { }
