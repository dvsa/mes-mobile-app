import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { D255Component } from '../components/d255/d255';
import { DebriefWitnessedComponent } from '../components/debrief-witnessed/debrief-witnessed';
import { LanguagePreferencesComponent } from '../components/language-preference/language-preferences';
import { FinalisationHeaderComponent } from '../components/finalisation-header/finalisation-header';
import { ComponentsModule } from '../../../components/common/common-components.module';

@NgModule({
  declarations: [
    LanguagePreferencesComponent,
    D255Component,
    DebriefWitnessedComponent,
    FinalisationHeaderComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    IonicModule,
  ],
  exports: [
    LanguagePreferencesComponent,
    D255Component,
    DebriefWitnessedComponent,
    FinalisationHeaderComponent,
  ],
})
export class TestFinalisationComponentsModule { }
