import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '../../components/common/common-components.module';
import { DelegatedRekeyUploadOutcomePage } from './delegated-rekey-upload-outcome';
import { StoreModule } from '@ngrx/store';
import { delegatedRekeyUploadOutcomeReducer } from './delegated-rekey-upload-outcome.reducer';

@NgModule({
  declarations: [
    DelegatedRekeyUploadOutcomePage,
  ],
  imports: [
    IonicPageModule.forChild(DelegatedRekeyUploadOutcomePage),
    StoreModule.forFeature('delegatedRekeyUploadOutcome', delegatedRekeyUploadOutcomeReducer),
    EffectsModule.forFeature([]),
    ComponentsModule,
  ],
})
export class DelegatedRekeyUploadOutcomePageModule {}
