import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate';
import { EffectsModule } from '@ngrx/effects';
import { WaitingRoomAnalyticsEffects } from '../waiting-room.analytics.effects';
import { WaitingRoomCatAMod1Page } from './waiting-room.cat-a-mod1.page';
import { WaitingRoomComponentsModule } from '../components/waiting-room.components.module';

@NgModule({
  declarations: [
    WaitingRoomCatAMod1Page,
  ],
  imports: [
    IonicPageModule.forChild(WaitingRoomCatAMod1Page),
    EffectsModule.forFeature([
      WaitingRoomAnalyticsEffects,
    ]),
    WaitingRoomComponentsModule,
    ComponentsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class WaitingRoomCatAMod1PageModule { }
