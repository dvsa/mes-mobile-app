import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { SosButtonComponent } from './components/sos-button/sos-button.component';
import { StoreModule } from '@ngrx/store';
import { raisedAlertReducer } from './store/raised-alert/raised-alert.reducer';
import { EffectsModule } from '@ngrx/effects';
import { RaisedAlertEffects } from './store/raised-alert/raised-alert.effects';
import { AlertProvider } from './providers/alert.provider';
import { LoneWorkerConfig, loneWorkerConfigService } from './lone-worker-config.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LocationProvider } from './providers/location.provider';
import { amberAlertReducer } from './store/amber-alert/amber-alert.reducer';
import { AmberAlertEffects } from './store/amber-alert/amber-alert.effects';
import { AmberAlertProvider } from './providers/amber-alert.provider';

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
        {
          provide: loneWorkerConfigService,
          useValue: config,
        },
        AlertProvider,
        LocationProvider,
        AmberAlertProvider,
        DatePipe,
      ],
    };
  }
}
