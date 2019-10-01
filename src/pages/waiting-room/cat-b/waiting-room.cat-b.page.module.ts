import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate';
import { EffectsModule } from '@ngrx/effects';
import { WaitingRoomAnalyticsEffects } from '../waiting-room.analytics.effects';
import { WaitingRoomCatBPage } from './waiting-room.cat-b.page';

@NgModule({
  declarations: [
    WaitingRoomCatBPage,
  ],
  imports: [
    IonicPageModule.forChild(WaitingRoomCatBPage),
    EffectsModule.forFeature([
      WaitingRoomAnalyticsEffects,
    ]),
    ComponentsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class WaitingRoomCatBPageModule { }
