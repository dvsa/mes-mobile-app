import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { D255Component } from './d255/d255';
import { DebriefWitnessedComponent } from './debrief-witnessed/debrief-witnessed';
import { LanguagePreferencesComponent } from './language-preference/language-preferences';
import { FinalisationHeaderComponent } from './finalisation-header/finalisation-header';
import { TransmissionComponent } from './transmission/transmission';

@NgModule({
  declarations: [
    LanguagePreferencesComponent,
    D255Component,
    DebriefWitnessedComponent,
    FinalisationHeaderComponent,
    TransmissionComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    LanguagePreferencesComponent,
    D255Component,
    DebriefWitnessedComponent,
    FinalisationHeaderComponent,
    TransmissionComponent,
  ],
})
export class TestFinalisationComponentsModule { }
