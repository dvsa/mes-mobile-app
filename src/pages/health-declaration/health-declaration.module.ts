import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthDeclarationPage } from './health-declaration';
import { EffectsModule } from '@ngrx/effects';
import { HealthDeclarationAnalyticsEffects } from './health-declaration.analytics.effects';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { ComponentsModule } from '../../components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate';

@NgModule({
  declarations: [
    HealthDeclarationPage,
  ],
  imports: [
    IonicPageModule.forChild(HealthDeclarationPage),
    EffectsModule.forFeature([HealthDeclarationAnalyticsEffects]),
    ComponentsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  providers: [
    AnalyticsProvider,
  ],
})
export class HealthDeclarationPageModule { }
