import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { OfficePage } from './office';
import { EffectsModule } from '@ngrx/effects';
import { OfficeAnalyticsEffects } from './office.analytics.effects';
import { AnalyticsProvider } from '../../providers/analytics/analytics';

@NgModule({
  declarations: [
    OfficePage,
  ],
  imports: [
    IonicPageModule.forChild(OfficePage),
    EffectsModule.forFeature([OfficeAnalyticsEffects]),
    ComponentsModule,
  ],
  providers: [
    AnalyticsProvider    
  ]
})
export class OfficePageModule {}
