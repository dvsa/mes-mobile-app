import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { LWSosButtonComponent } from './lw-sos-button/lw-sos-button';
import { StoreModule } from '@ngrx/store';
import { alertReducer } from './lw-store/alert/alert.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AlertEffects } from './lw-store/alert/alert.effects';
import { AlertProvider } from './lw-providers/alert.provider';

@NgModule({
  declarations: [
    LWSosButtonComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    StoreModule.forFeature('loneWorkerAlerts', alertReducer),
    EffectsModule.forFeature([
      AlertEffects,
    ]),
  ],
  exports: [
    LWSosButtonComponent,
  ],
  providers: [
    AlertProvider,
  ],
})
export class LoneWorkerModule { }
