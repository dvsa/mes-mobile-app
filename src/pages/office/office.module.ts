import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfficePage } from './office';
import { EffectsModule } from '@ngrx/effects';
import { OfficeAnalyticsEffects } from './office.analytics.effects';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { ComponentsModule } from '../../components/common/common.components.module';
import { OfficeComponentsModule } from './components/office.components.module';
import { OfficeEffects } from './office.effects';

@NgModule({
  declarations: [
    OfficePage,
  ],
  imports: [
    IonicPageModule.forChild(OfficePage),
    EffectsModule.forFeature([
      OfficeAnalyticsEffects,
      OfficeEffects,
    ]),
    ComponentsModule,
    OfficeComponentsModule,
  ],
  providers: [
    AnalyticsProvider,
  ],
})
export class OfficePageModule { }
