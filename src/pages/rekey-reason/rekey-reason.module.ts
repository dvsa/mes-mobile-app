import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RekeyReasonPage } from './rekey-reason';
import { RekeyReasonAnalyticsEffects } from './rekey-reason.analytics.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { rekeyReasonReducer } from './rekey-reason.reducer';
import { DirectivesModule } from '../../directives/directives.module';
import { FindUserProvider } from '../../providers/find-user/find-user';
import { ComponentsModule } from '../../components/common/common-components.module';

@NgModule({
  declarations: [
    RekeyReasonPage,
  ],
  imports: [
    IonicPageModule.forChild(RekeyReasonPage),
    StoreModule.forFeature('rekeyReason', rekeyReasonReducer),
    EffectsModule.forFeature([
      RekeyReasonAnalyticsEffects,
    ]),
    DirectivesModule,
    ComponentsModule,
  ],
  providers: [
    FindUserProvider,
  ],
})
export class RekeyReasonPageModule { }
