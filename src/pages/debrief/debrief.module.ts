import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DebriefPage } from './debrief';
import { EffectsModule } from '@ngrx/effects';
import { DebriefAnalyticsEffects } from './debrief.analytics.effects';
import { ComponentsModule } from '../../components/common/common-components.module';
import { DebriefComponentsModule } from './components/debrief-components.module';
import { TranslateModule } from 'ng2-translate';
import { DebriefEffects } from './debrief.effects';

@NgModule({
  declarations: [
    DebriefPage,
  ],
  imports: [
    DebriefComponentsModule,
    IonicPageModule.forChild(DebriefPage),
    EffectsModule.forFeature([
      DebriefEffects,
      DebriefAnalyticsEffects,
    ]),
    ComponentsModule,
    TranslateModule,
  ],
})
export class DebriefPageModule { }
