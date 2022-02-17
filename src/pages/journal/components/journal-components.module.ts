import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { ActivitySlotComponent } from '../components/activity-slot/activity-slot';
import { EmptySlotComponent } from '../components/empty-slot/empty-slot';
import { JournalNavigationComponent } from '../components/journal-navigation/journal-navigation';
import { TestSlotComponentsModule } from '../../../components/test-slot/test-slot-components.module';
import { PersonalCommitmentSlotComponent } from '../personal-commitment/personal-commitment';
import { JournalSlotComponent } from './journal-slot/journal-slot';

@NgModule({
  declarations: [
    ActivitySlotComponent,
    EmptySlotComponent,
    JournalNavigationComponent,
    PersonalCommitmentSlotComponent,
    JournalSlotComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    TestSlotComponentsModule,
  ],
  entryComponents: [
    PersonalCommitmentSlotComponent,
  ],
  exports: [
    ActivitySlotComponent,
    EmptySlotComponent,
    JournalNavigationComponent,
    PersonalCommitmentSlotComponent,
    JournalSlotComponent,
  ],
})
export class JournalComponentsModule { }
