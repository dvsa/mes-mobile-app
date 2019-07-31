import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassFinalisationPage } from './pass-finalisation';
import { EffectsModule } from '@ngrx/effects';
import { PassFinalisationAnalyticsEffects } from './pass-finalisation.analytics.effects';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { ComponentsModule } from '../../components/components.module';
import { LanguagePreferencesComponent } from '../office/components/language-preference/language-preferences';
import { D255Component } from '../office/components/d255/d255';
import { DebriefWitnessedComponent } from '../office/components/debrief-witnessed/debrief-witnessed';

@NgModule({
  declarations: [
    PassFinalisationPage,
    LanguagePreferencesComponent,
    D255Component,
    DebriefWitnessedComponent,
  ],
  imports: [
    IonicPageModule.forChild(PassFinalisationPage),
    EffectsModule.forFeature([PassFinalisationAnalyticsEffects]),
    ComponentsModule,
  ],
  providers: [
    AnalyticsProvider,
  ],
})
export class PassFinalisationPageModule {}
