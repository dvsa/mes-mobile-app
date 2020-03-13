import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthDeclarationCatBPage } from './health-declaration.cat-b.page';
import { EffectsModule } from '@ngrx/effects';
import { HealthDeclarationAnalyticsEffects } from '../health-declaration.analytics.effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HealthDeclarationEffects } from '../health-declaration.effects';
import { HealthDeclarationComponentsModule } from '../components/health-declaration.components.module';

@NgModule({
  declarations: [
    HealthDeclarationCatBPage,
  ],
  imports: [
    IonicPageModule.forChild(HealthDeclarationCatBPage),
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
export class HealthDeclarationCatBPageModule { }
