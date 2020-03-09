import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { BackToOfficeCatADIPart2Page } from './back-to-office.cat-adi-part2.page';
import { TranslateModule } from 'ng2-translate';
import { EffectsModule } from '@ngrx/effects';
import { BackToOfficeAnalyticsEffects } from '../back-to-office.analytics.effects';

@NgModule({
  declarations: [
    BackToOfficeCatADIPart2Page,
  ],
  imports: [
    IonicPageModule.forChild(BackToOfficeCatADIPart2Page),
    EffectsModule.forFeature([
      BackToOfficeAnalyticsEffects,
    ]),
    ComponentsModule,
    TranslateModule,
  ],
})
export class BackToOfficeCatADIPart2PageModule { }
