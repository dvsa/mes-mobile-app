import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
<<<<<<< HEAD
import { WaitingRoomToCarCatBEPage } from './waiting-room-to-car.cat-be.page';
=======
import { WaitingRoomToCarCatBePage } from './waiting-room-to-car.cat-be.page';
>>>>>>> Mes 3651 adding cat be to WRTC page (#826)
import { EffectsModule } from '@ngrx/effects';
import { WaitingRoomToCarAnalyticsEffects } from '../waiting-room-to-car.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { WaitingRoomToCarComponentsModule } from '../components/waiting-room-to-car.components.module';

@NgModule({
  declarations: [
<<<<<<< HEAD
    WaitingRoomToCarCatBEPage,
  ],
  imports: [
    IonicPageModule.forChild(WaitingRoomToCarCatBEPage),
=======
    WaitingRoomToCarCatBePage,
  ],
  imports: [
    IonicPageModule.forChild(WaitingRoomToCarCatBePage),
>>>>>>> Mes 3651 adding cat be to WRTC page (#826)
    EffectsModule.forFeature([WaitingRoomToCarAnalyticsEffects]),
    ComponentsModule,
    WaitingRoomToCarComponentsModule,
  ],
})
export class WaitingRoomToCarCatBEPageModule { }
