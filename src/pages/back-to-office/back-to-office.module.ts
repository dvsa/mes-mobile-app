import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BackToOfficePage } from './back-to-office';
import { EffectsModule } from '@ngrx/effects';
import { BackToOfficeAnalyticsEffects } from './back-to-office.analytics.effects';
import { ComponentsModule } from '../../components/common/common-components.module';

@NgModule({
  declarations: [
    BackToOfficePage,
  ],
  imports: [
    IonicPageModule.forChild(BackToOfficePage),
    EffectsModule.forFeature([BackToOfficeAnalyticsEffects]),
    ComponentsModule,
  ],
})
export class BackToOfficePageModule {}
