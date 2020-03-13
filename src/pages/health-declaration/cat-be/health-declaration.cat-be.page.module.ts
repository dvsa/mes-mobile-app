import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthDeclarationCatBEPage } from './health-declaration.cat-be.page';
import { EffectsModule } from '@ngrx/effects';
import { HealthDeclarationAnalyticsEffects } from '../health-declaration.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HealthDeclarationEffects } from '../health-declaration.effects';
import { HealthDeclarationComponentsModule } from '../components/health-declaration.components.module';

@NgModule({
  declarations: [
    HealthDeclarationCatBEPage,
  ],
  imports: [
    IonicPageModule.forChild(HealthDeclarationCatBEPage),
    EffectsModule.forFeature([
      HealthDeclarationAnalyticsEffects,
      HealthDeclarationEffects,
    ]),
    HealthDeclarationComponentsModule,
    ComponentsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class HealthDeclarationCatBEPageModule { }
