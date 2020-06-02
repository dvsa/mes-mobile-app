import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';

import { WaitingRoomToCarCatCPCPage } from './waiting-room-to-car.cat-cpc.page';
import { WaitingRoomToCarAnalyticsEffects } from '../waiting-room-to-car.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { WaitingRoomToCarComponentsModule } from '../components/waiting-room-to-car.components.module';
import { WaitingRoomToCarCatCPCComponentsModule }
from './components/waiting-room-to-car.cat-cpc.components.module';

@NgModule({
  declarations: [
    WaitingRoomToCarCatCPCPage,
  ],
  imports: [
    IonicPageModule.forChild(WaitingRoomToCarCatCPCPage),
    EffectsModule.forFeature([WaitingRoomToCarAnalyticsEffects]),
    ComponentsModule,
    WaitingRoomToCarComponentsModule,
    WaitingRoomToCarCatCPCComponentsModule,
  ],
})
export class WaitingRoomToCarCatCPCPageModule { }
