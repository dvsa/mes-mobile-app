import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { BackToOfficeCatHomeTestPage } from './back-to-office.cat-home-test.page';
import { TranslateModule } from 'ng2-translate';
import { EffectsModule } from '@ngrx/effects';
import { BackToOfficeAnalyticsEffects } from '../back-to-office.analytics.effects';

@NgModule({
  declarations: [
    BackToOfficeCatHomeTestPage,
  ],
  imports: [
    IonicPageModule.forChild(BackToOfficeCatHomeTestPage),
    EffectsModule.forFeature([
      BackToOfficeAnalyticsEffects,
    ]),
    ComponentsModule,
    TranslateModule,
  ],
})
export class BackToOfficeCatHomeTestPageModule { }
