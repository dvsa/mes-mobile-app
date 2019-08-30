import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { ActivitySlotComponent } from '../components/activity-slot/activity-slot';
import { EmptySlotComponent } from '../components/empty-slot/empty-slot';
import { JournalNavigationComponent } from '../components/journal-navigation/journal-navigation';
import { TestSlotComponentsModule } from '../../../components/test-slot/test-slot-components.module';
import { PersonalCommitmentSlotComponent } from '../personal-commitment/personal-commitment';

@NgModule({
  declarations: [
    ActivitySlotComponent,
    EmptySlotComponent,
    JournalNavigationComponent,
    PersonalCommitmentSlotComponent,
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
  ],
})
export class JournalComponentsModule { }
