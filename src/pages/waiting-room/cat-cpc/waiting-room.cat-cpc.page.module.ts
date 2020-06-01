import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

import { ComponentsModule } from '../../../components/common/common-components.module';
import { WaitingRoomAnalyticsEffects } from '../waiting-room.analytics.effects';
import { WaitingRoomComponentsModule } from '../components/waiting-room.components.module';
import { WaitingRoomCatCPCPage } from './waiting-room.cat-cpc.page';

@NgModule({
  declarations: [
    WaitingRoomCatCPCPage,
  ],
  imports: [
    IonicPageModule.forChild(WaitingRoomCatCPCPage),
    EffectsModule.forFeature([
      WaitingRoomAnalyticsEffects,
    ]),
    WaitingRoomComponentsModule,
    ComponentsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class WaitingRoomCatCPCPageModule { }
