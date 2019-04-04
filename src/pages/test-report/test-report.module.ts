import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestReportPage } from './test-report';
import { EffectsModule } from '@ngrx/effects';
import { Insomnia } from '@ionic-native/insomnia';
import { StoreModule } from '@ngrx/store';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { EtaComponent } from './components/examiner-takes-action/eta';
import { ManoeuvresPopoverComponent } from './components/manoeuvres-popover/manoeuvres-popover';
import { CompetencyWithModalComponent } from './components/competency-with-modal/competency-with-modal';
import { TestReportAnalyticsEffects } from './test-report.analytics.effects';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { CompetencyComponent } from './components/competency/competency';
import { FaultCounterComponent } from './components/fault-counter/fault-counter';
import { TickIndicatorComponent } from './components/tick-indicator/tick-indicator';
import { DrivingFaultSummaryComponent } from './components/driving-fault-summary/driving-fault-summary';
import { ToolbarComponent } from './components/toolbar/toolbar';
import { testReportReducer } from './test-report.reducer';
import { SeriousFaultBadgeComponent } from './components/serious-fault-badge/serious-fault-badge';
import { SeriousTooltipComponent } from './components/serious-tooltip/serious-tooltip';
import { DangerousTooltipComponent } from './components/dangerous-tooltip/dangerous-tooltip';
import { LegalRequirementsComponent } from './components/legal-requirements/legal-requirements';
import { DangerousFaultBadgeComponent } from './components/dangerous-fault-badge/dangerous-fault-badge';

@NgModule({
  declarations: [
    TestReportPage,
    CompetencyComponent,
    FaultCounterComponent,
    TickIndicatorComponent,
    DrivingFaultSummaryComponent,
    CompetencyWithModalComponent,
    ManoeuvresPopoverComponent,
    EtaComponent,
    ToolbarComponent,
    SeriousFaultBadgeComponent,
    SeriousTooltipComponent,
    DangerousFaultBadgeComponent,
    DangerousTooltipComponent,
    LegalRequirementsComponent,
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
