
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitingRoomPage } from './waiting-room';
import { EffectsModule } from '@ngrx/effects';
import { WaitingRoomAnalyticsEffects } from './waiting-room.analytics.effects';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { PreTestDeclarationsModule } from '../../modules/test/pre-test-declarations/pre-test-declarations.module';
import { MesSignaturePadComponent } from '../../components/mes-signature-pad/mes-signature-pad';
import { SignaturePadModule } from 'angular2-signaturepad';
@NgModule({
  declarations: [
    WaitingRoomPage,
    MesSignaturePadComponent,
  ],
  imports: [
    IonicPageModule.forChild(WaitingRoomPage),
    EffectsModule.forFeature([WaitingRoomAnalyticsEffects]),
    PreTestDeclarationsModule,
    SignaturePadModule,
  ],
  providers: [
    AnalyticsProvider,
  ],
})
export class WaitingRoomPageModule { }
