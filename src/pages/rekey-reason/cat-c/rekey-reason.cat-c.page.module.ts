import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { RekeyReasonCatCPage } from './rekey-reason.cat-c.page';
import { RekeyReasonComponentsModule } from '../components/rekey-reason.components.module';
import { RekeyReasonAnalyticsEffects } from '../rekey-reason.analytics.effects';
import { StoreModule } from '@ngrx/store';
import { RekeyReasonEffects } from '../rekey-reason.effects';
import { DirectivesModule } from '../../../directives/directives.module';
import { FindUserProvider } from '../../../providers/find-user/find-user';
import { rekeyReasonReducer } from '../rekey-reason.reducer';

@NgModule({
  declarations: [
    RekeyReasonCatCPage,
  ],
  imports: [
    IonicPageModule.forChild(RekeyReasonCatCPage),
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

export class RekeyReasonCatCPageModule { }
