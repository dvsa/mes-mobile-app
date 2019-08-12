import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitingRoomPage } from './waiting-room';
import { EffectsModule } from '@ngrx/effects';
import { WaitingRoomAnalyticsEffects } from './waiting-room.analytics.effects';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { ComponentsModule } from '../../components/common/common-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate';
import { WaitingRoomEffects } from './waiting-room.effects';

@NgModule({
  declarations: [
    WaitingRoomPage,
  ],
  imports: [
    IonicPageModule.forChild(WaitingRoomPage),
    EffectsModule.forFeature([
      WaitingRoomEffects,
      WaitingRoomAnalyticsEffects,
    ]),
    ComponentsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  providers: [
    AnalyticsProvider,
  ],
})
export class WaitingRoomPageModule { }
