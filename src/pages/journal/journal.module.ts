import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EffectsModule } from '@ngrx/effects';
import { JournalPage } from './journal';
import { SlotSelectorProvider } from '../../providers/slot-selector/slot-selector';
import { ActivitySlotComponent } from './components/activity-slot/activity-slot';
import { EmptySlotComponent } from './components/empty-slot/empty-slot';
import { JournalProvider } from '../../providers/journal/journal';
import { SlotProvider } from '../../providers/slot/slot';
import { DateTimeProvider } from '../../providers/date-time/date-time';
import { JournalComponentsModule } from './components/journal-components.module';
import { TestsEffects } from '../../modules/tests/tests.effects';
import { TestSlotComponentsModule } from '../../components/test-slot/test-slot-components.module';
import { ComponentsModule } from '../../components/common/common-components.module';
import { JournalAnalyticsEffects } from './journal.analytics.effects';
import {
  LoneWorkerIntegrationProvider,
} from '../../providers/lone-worker-integration/lone-worker-integration.provider';
import {
  LoneWorkerIonicModule,
} from '../../external-modules/lw-ionic-module/lone-worker.module';

@NgModule({
  declarations: [
    JournalPage,
  ],
  imports: [
    JournalComponentsModule,
    TestSlotComponentsModule,
    IonicPageModule.forChild(JournalPage),
    EffectsModule.forFeature([
      JournalAnalyticsEffects,
      TestsEffects,
    ]),
    ComponentsModule,
    LoneWorkerIonicModule,
  ],
  entryComponents: [
    ActivitySlotComponent,
    EmptySlotComponent,
  ],
  providers: [
    JournalProvider,
    SlotProvider,
    SlotSelectorProvider,
    DateTimeProvider,
    LoneWorkerIntegrationProvider,
  ],
})
export class JournalPageModule { }
