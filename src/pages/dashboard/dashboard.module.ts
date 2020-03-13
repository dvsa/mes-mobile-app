import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardPage } from './dashboard';
import { DashboardComponentsModule } from './components/dashboard-components.module';
import { EffectsModule } from '@ngrx/effects';
import { DashboardAnalyticsEffects } from './dashboard.analytics.effects';
import { ComponentsModule } from '../../components/common/common-components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DashboardPage,
  ],
  imports: [
    DashboardComponentsModule,
    IonicPageModule.forChild(DashboardPage),
    EffectsModule.forFeature([
      DashboardAnalyticsEffects,
    ]),
    ComponentsModule,
    TranslateModule,
  ],
})
export class DashboardPageModule { }
