import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate';
import { EffectsModule } from '@ngrx/effects';
import { WaitingRoomAnalyticsEffects } from '../waiting-room.analytics.effects';
import { WaitingRoomComponentsModule } from '../components/waiting-room.components.module';
import { WaitingRoomCatAMod2Page } from './waiting-room.cat-a-mod2.page';

@NgModule({
  declarations: [
    WaitingRoomCatAMod2Page,
  ],
  imports: [
    IonicPageModule.forChild(WaitingRoomCatAMod2Page),
    EffectsModule.forFeature([
      WaitingRoomAnalyticsEffects,
    ]),
    WaitingRoomComponentsModule,
    ComponentsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class WaitingRoomCatAMod2PageModule { }
