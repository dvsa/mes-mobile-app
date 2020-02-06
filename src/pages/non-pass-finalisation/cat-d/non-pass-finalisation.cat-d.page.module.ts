import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { TestFinalisationComponentsModule } from
  '../../../components/test-finalisation/test-finalisation-component.module';
import { NonPassFinalisationCatDPage } from './non-pass-finalisation.cat-d.page';
import { NonPassFinalisationAnalyticsEffects } from '../non-pass-finalisation.analytics.effects';

@NgModule({
  declarations: [
    NonPassFinalisationCatDPage,
  ],
  imports: [
    IonicPageModule.forChild(NonPassFinalisationCatDPage),
    EffectsModule.forFeature([NonPassFinalisationAnalyticsEffects]),
    ComponentsModule,
    TestFinalisationComponentsModule,
  ],
})
export class NonPassFinalisationCatDPageModule { }
