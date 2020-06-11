import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects';

import { ComponentsModule } from '../../../components/common/common-components.module';
import { BackToOfficeCatCPCPage } from './back-to-office.cat-cpc.page';
import { BackToOfficeAnalyticsEffects } from '../back-to-office.analytics.effects';

@NgModule({
  declarations: [
    BackToOfficeCatCPCPage,
  ],
  imports: [
    IonicPageModule.forChild(BackToOfficeCatCPCPage),
    EffectsModule.forFeature([
      BackToOfficeAnalyticsEffects,
    ]),
    ComponentsModule,
    TranslateModule,
  ],
})
export class BackToOfficeCatCPCPageModule { }
