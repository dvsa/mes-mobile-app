import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { RekeyReasonCatAMod1Page } from './rekey-reason.cat-a-mod1.page';
import { RekeyReasonComponentsModule } from '../components/rekey-reason.components.module';
import { RekeyReasonAnalyticsEffects } from '../rekey-reason.analytics.effects';
import { StoreModule } from '@ngrx/store';
import { RekeyReasonEffects } from '../rekey-reason.effects';
import { DirectivesModule } from '../../../directives/directives.module';
import { FindUserProvider } from '../../../providers/find-user/find-user';
import { rekeyReasonReducer } from '../rekey-reason.reducer';

@NgModule({
  declarations: [
    RekeyReasonCatAMod1Page,
  ],
  imports: [
    IonicPageModule.forChild(RekeyReasonCatAMod1Page),
    StoreModule.forFeature('rekeyReason', rekeyReasonReducer),
    EffectsModule.forFeature([
      RekeyReasonAnalyticsEffects,
      RekeyReasonEffects,
    ]),
    DirectivesModule,
    ComponentsModule,
    RekeyReasonComponentsModule,
  ],
  providers: [
    FindUserProvider,
  ],
})

export class RekeyReasonCatAMod1PageModule { }
