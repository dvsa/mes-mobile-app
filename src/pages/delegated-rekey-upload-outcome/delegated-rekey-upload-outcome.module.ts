import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '../../components/common/common-components.module';
import { DelegatedRekeyUploadOutcomePage } from './delegated-rekey-upload-outcome';

@NgModule({
  declarations: [
    DelegatedRekeyUploadOutcomePage,
  ],
  imports: [
    IonicPageModule.forChild(DelegatedRekeyUploadOutcomePage),
    EffectsModule.forFeature([]),
    ComponentsModule,
  ],
})
export class DelegatedRekeyUploadOutcomePageModule {}
