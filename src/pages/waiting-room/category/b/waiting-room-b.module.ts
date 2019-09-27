import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../../components/common/common-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate';
import { EffectsModule } from '@ngrx/effects';
import { WaitingRoomAnalyticsEffects } from '../../waiting-room.analytics.effects';
import { WaitingRoomPageB } from './waiting-room-b';

@NgModule({
  declarations: [
    WaitingRoomPageB,
  ],
  imports: [
    IonicPageModule.forChild(WaitingRoomPageB),
    EffectsModule.forFeature([
      WaitingRoomAnalyticsEffects,
    ]),
    ComponentsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class WaitingRoomPageBModule { }
