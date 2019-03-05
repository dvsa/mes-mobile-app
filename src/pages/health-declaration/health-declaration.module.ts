import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthDeclarationPage } from './health-declaration';
import { EffectsModule } from '@ngrx/effects';
import { HealthDeclarationAnalyticsEffects } from './health-declaration.analytics.effects';
import { AnalyticsProvider } from '../../providers/analytics/analytics';

@NgModule({
  declarations: [
    HealthDeclarationPage,
  ],
  imports: [
    IonicPageModule.forChild(HealthDeclarationPage),
    EffectsModule.forFeature([HealthDeclarationAnalyticsEffects]),
  ],
  providers: [
    AnalyticsProvider,
  ],
})
export class HealthDeclarationPageModule {}
