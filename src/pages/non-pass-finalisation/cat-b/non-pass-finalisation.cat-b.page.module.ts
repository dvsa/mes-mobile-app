import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { TestFinalisationComponentsModule } from
'../../../components/test-finalisation/test-finalisation-component.module';
import { NonPassFinalisationCatBPage } from './non-pass-finalisation.cat-b.page';
import { NonPassFinalisationAnalyticsEffects } from '../non-pass-finalisation.analytics.effects';
import {
  LoneWorkerIntegrationProvider,
} from '../../../providers/lone-worker-integration/lone-worker-integration.provider';
import { LoneWorkerIonicModule } from '../../../external-modules/lw-ionic-module/lone-worker.module';

@NgModule({
  declarations: [
    NonPassFinalisationCatBPage,
  ],
  imports: [
    IonicPageModule.forChild(NonPassFinalisationCatBPage),
    EffectsModule.forFeature([NonPassFinalisationAnalyticsEffects]),
    ComponentsModule,
    TestFinalisationComponentsModule,
    LoneWorkerIonicModule,
  ],
  providers: [
    LoneWorkerIntegrationProvider,
  ],
})
export class NonPassFinalisationCatBPageModule { }
