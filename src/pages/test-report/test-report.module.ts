import { ManoeuvresPopoverComponent } from './components/manoeuvres-popover/manoeuvres-popover';
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

@NgModule({
  declarations: [
    TestReportPage,
    CompetencyComponent,
    FaultCounterComponent,
    ManoeuvresPopoverComponent,
    TickIndicatorComponent,
    DrivingFaultSummaryComponent,
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
