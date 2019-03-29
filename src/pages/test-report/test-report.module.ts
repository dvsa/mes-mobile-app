import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestReportPage } from './test-report';
import { EffectsModule } from '@ngrx/effects';
import { TestReportAnalyticsEffects } from './test-report.analytics.effects';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { CompetencyComponent } from './components/competency/competency';
import { FaultCounterComponent } from './components/fault-counter/fault-counter';
import { DrivingFaultSummaryComponent } from './components/driving-fault-summary/driving-fault-summary';
import { ToolbarComponent } from './components/toolbar/toolbar';

@NgModule({
  declarations: [
    TestReportPage,
    CompetencyComponent,
    FaultCounterComponent,
    DrivingFaultSummaryComponent,
    ToolbarComponent,
  ],
  imports: [
    IonicPageModule.forChild(TestReportPage),
    EffectsModule.forFeature([TestReportAnalyticsEffects]),
  ],
  providers: [
    AnalyticsProvider,
    ScreenOrientation,
    Insomnia,
  ],
})
export class TestReportPageModule {}
