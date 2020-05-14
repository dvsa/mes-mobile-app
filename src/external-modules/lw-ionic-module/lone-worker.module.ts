import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    // StoreModule.forFeature('loneWorkerAmberAlerts', amberAlertReducer),
    // EffectsModule.forFeature([
    //   AmberAlertEffects,
    // ]),
  ],
  declarations: [
    SosButtonComponent,
    // AmberAlertModalComponent,
  ],
  exports: [
    SosButtonComponent,
    // AmberAlertModalComponent,
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
        // NetworkStateProvider,
        // AmberAlertProvider,
      ],
    };
  }
}
