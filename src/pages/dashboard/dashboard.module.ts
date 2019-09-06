import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardPage } from './dashboard';
import { DashboardComponentsModule } from './components/dashboard-components.module';
import { EffectsModule } from '@ngrx/effects';
import { DashboardAnalyticsEffects } from './dashboard.analytics.effects';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { ComponentsModule } from '../../components/common/common-components.module';
import { TranslateModule } from 'ng2-translate';
import { JournalPageModule } from '../journal/journal.module';

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
    JournalPageModule,
  ],
  providers: [
    AnalyticsProvider,
  ],
})
export class DashboardPageModule { }
