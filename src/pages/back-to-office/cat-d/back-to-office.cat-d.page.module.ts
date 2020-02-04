import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { BackToOfficeCatDPage } from './back-to-office.cat-d.page';
import { TranslateModule } from 'ng2-translate';
import { EffectsModule } from '@ngrx/effects';
import { BackToOfficeAnalyticsEffects } from '../back-to-office.analytics.effects';

@NgModule({
  declarations: [
    BackToOfficeCatDPage,
  ],
  imports: [
    IonicPageModule.forChild(BackToOfficeCatDPage),
    EffectsModule.forFeature([
      BackToOfficeAnalyticsEffects,
    ]),
    ComponentsModule,
    TranslateModule,
  ],
})
export class BackToOfficeCatDPageModule { }
