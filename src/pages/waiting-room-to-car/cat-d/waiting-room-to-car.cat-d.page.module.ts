import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitingRoomToCarCatDPage } from './waiting-room-to-car.cat-d.page';
import { EffectsModule } from '@ngrx/effects';
import { WaitingRoomToCarAnalyticsEffects } from '../waiting-room-to-car.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { WaitingRoomToCarComponentsModule } from '../components/waiting-room-to-car.components.module';
import { WaitingRoomToCarCatDComponentsModule } from './components/waiting-room-to-car.cat-d.components.module';

@NgModule({
  declarations: [
    WaitingRoomToCarCatDPage,
  ],
  imports: [
    IonicPageModule.forChild(WaitingRoomToCarCatDPage),
    EffectsModule.forFeature([WaitingRoomToCarAnalyticsEffects]),
    ComponentsModule,
    WaitingRoomToCarComponentsModule,
    WaitingRoomToCarCatDComponentsModule,
  ],
})
export class WaitingRoomToCarCatDPageModule { }
