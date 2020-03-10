import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { RekeyReasonCatADIPart2Page } from './rekey-reason.cat-adi-part2.page';
import { RekeyReasonComponentsModule } from '../components/rekey-reason.components.module';
import { RekeyReasonAnalyticsEffects } from '../rekey-reason.analytics.effects';
import { StoreModule } from '@ngrx/store';
import { RekeyReasonEffects } from '../rekey-reason.effects';
import { DirectivesModule } from '../../../directives/directives.module';
import { FindUserProvider } from '../../../providers/find-user/find-user';
import { rekeyReasonReducer } from '../rekey-reason.reducer';

@NgModule({
  declarations: [
    RekeyReasonCatADIPart2Page,
  ],
  imports: [
    IonicPageModule.forChild(RekeyReasonCatADIPart2Page),
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

export class RekeyReasonCatADIPart2PageModule { }
