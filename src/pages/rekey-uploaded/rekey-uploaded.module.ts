import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RekeyUploadedPage } from './rekey-uploaded';
import { EffectsModule } from '@ngrx/effects';
import { RekeyUploadedAnalyticsEffects } from './rekey-uploaded.analytics.effects';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { ComponentsModule } from '../../components/common/common-components.module';

@NgModule({
  declarations: [
    RekeyUploadedPage,
  ],
  imports: [
    IonicPageModule.forChild(RekeyUploadedPage),
    EffectsModule.forFeature([RekeyUploadedAnalyticsEffects]),
    ComponentsModule,
  ],
  providers: [
    AnalyticsProvider,
  ],
})
export class RekeyUploadedPageModule {}
