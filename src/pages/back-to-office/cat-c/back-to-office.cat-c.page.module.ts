import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { BackToOfficeCatCPage } from './back-to-office.cat-c.page';
import { TranslateModule } from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects';
import { BackToOfficeAnalyticsEffects } from '../back-to-office.analytics.effects';

@NgModule({
  declarations: [
    BackToOfficeCatCPage,
  ],
  imports: [
    IonicPageModule.forChild(BackToOfficeCatCPage),
    EffectsModule.forFeature([
      BackToOfficeAnalyticsEffects,
    ]),
    ComponentsModule,
    TranslateModule,
  ],
})
export class BackToOfficeCatCPageModule { }
