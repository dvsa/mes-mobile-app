import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitingRoomPage } from './waiting-room';
import { EffectsModule } from '@ngrx/effects';
import { SignaturePadModule } from 'angular2-signaturepad';
import { WaitingRoomAnalyticsEffects } from './waiting-room.analytics.effects';
import { MesSignaturePadComponent } from './components/mes-signature-pad';
import { AnalyticsProvider } from '../../providers/analytics/analytics';

@NgModule({
  declarations: [
    WaitingRoomPage,
    MesSignaturePadComponent,
  ],
  imports: [
    IonicPageModule.forChild(WaitingRoomPage),
    EffectsModule.forFeature([WaitingRoomAnalyticsEffects]),
    SignaturePadModule,
  ],
  providers: [
    AnalyticsProvider,
  ],
})
export class WaitingRoomPageModule { }
