import { ManoeuvresPopoverComponent } from './components/manoeuvres-popover/manoeuvres-popover';
import { CompetencyWithModalComponent } from './components/competency-with-modal/competency-with-modal';
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
import { TickIndicatorComponent } from './components/tick-indicator/tick-indicator';
import { DrivingFaultSummaryComponent } from './components/driving-fault-summary/driving-fault-summary';
import { ToolbarComponent } from './components/toolbar/toolbar';
import { StoreModule } from '@ngrx/store';
import { testReportReducer } from './test-report.reducer';

@NgModule({
  declarations: [
    TestReportPage,
    CompetencyComponent,
    FaultCounterComponent,
    TickIndicatorComponent,
    DrivingFaultSummaryComponent,
    CompetencyWithModalComponent,
    ManoeuvresPopoverComponent,
    ToolbarComponent,
  ],
  imports: [
    IonicPageModule.forChild(TestReportPage),
    StoreModule.forFeature('testReport', testReportReducer),
    EffectsModule.forFeature([TestReportAnalyticsEffects]),
  ],
  providers: [
    AnalyticsProvider,
    ScreenOrientation,
    Insomnia,
  ],
})
export class TestReportPageModule {}
