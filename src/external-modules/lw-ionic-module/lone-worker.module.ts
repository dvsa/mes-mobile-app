import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { SosButtonComponent } from './components/sos-button/sos-button.component';
import { StoreModule } from '@ngrx/store';
import { raisedAlertReducer } from './store/raised-alert/raised-alert.reducer';
import { EffectsModule } from '@ngrx/effects';
import { RaisedAlertEffects } from './store/raised-alert/raised-alert.effects';
import { AlertProvider } from './providers/alert.provider';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LocationProvider } from './providers/location.provider';
import { amberAlertReducer } from './store/amber-alert/amber-alert.reducer';
import { AmberAlertEffects } from './store/amber-alert/amber-alert.effects';
import { AmberAlertProvider } from './providers/amber-alert.provider';
import { LoneWorkerConfigProvider, LoneWorkerConfigProviderLocal } from './providers/lone-worker-config.provider';

export interface LoneWorkerConfig {
  configProvider?: Provider;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    StoreModule.forFeature('loneWorkerRaisedAlerts', raisedAlertReducer),
    EffectsModule.forFeature([
      RaisedAlertEffects,
    ]),
    StoreModule.forFeature('loneWorkerAmberAlerts', amberAlertReducer),
    EffectsModule.forFeature([
      AmberAlertEffects,
    ]),
  ],
  declarations: [
    SosButtonComponent,
  ],
  exports: [
    SosButtonComponent,
  ],
})
export class LoneWorkerIonicModule {
  static forRoot(config: LoneWorkerConfig): ModuleWithProviders {
    return {
      ngModule: LoneWorkerIonicModule,
      providers:[
        config.configProvider ||
          {
            provide: LoneWorkerConfigProvider,
            useClass: LoneWorkerConfigProviderLocal,
          },
        AlertProvider,
        LocationProvider,
        AmberAlertProvider,
      ],
    };
  }
}
