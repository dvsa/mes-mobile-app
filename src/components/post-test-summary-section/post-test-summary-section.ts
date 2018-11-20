import { IManualSummary } from './../test-summary/interfaces/IManualSummary';
import { Component, Input } from '@angular/core';
import { IFaultSummary } from '../test-summary/interfaces/IFaultSummary';
import { FaultTitle } from '../test-summary/enums/FaultTitle';
import { isNil } from 'lodash';
import { ModalController } from 'ionic-angular';
import { TextboxModalComponent } from '../textbox-modal/textbox-modal';
import { isNonBlankString } from '../../shared/utils/string-utils';

@Component({
  selector: 'post-test-summary-section',
  templateUrl: 'post-test-summary-section.html'
})
export class PostTestSummarySectionComponent {
  @Input()
  summary: IFaultSummary;
  @Input()
  manualSummary: IManualSummary;
  @Input()
  canComplete: boolean = false;
  drivingFaultsTitle: string = FaultTitle.DrivingFaults;
  // Map of fault name to the note
  faultNotes = new Map<string, string>();
  // Validation
  hasFailedValidation: boolean = false;

  constructor(private modalCtrl: ModalController) {}

  openTextboxModal(faultName: string) {
    const textboxModal = this.modalCtrl.create(TextboxModalComponent, {
      title: faultName,
      notes: this.faultNotes[faultName] || ''
    });
    textboxModal.onDidDismiss((notes?: string) => (this.faultNotes[faultName] = notes));
    textboxModal.present();
  }

  isComplete(): boolean {
    if (!this.canComplete) {
      return true;
    }
    const notes = Object.values(this.faultNotes).filter((n) => !isNil(n));
    const noteForEachFault: boolean = notes.length === this.summary.total;
    const allNotesValid: boolean = notes.every((v) => isNonBlankString(v));

    if (noteForEachFault && allNotesValid) {
      return true;
    }
    this.hasFailedValidation = true;
    return false;
  }

  showAddButton(faultName: string): boolean {
    return !this.isDrivingFaults() && !this.faultNotes[faultName];
  }

  showEditButton(faultName: string): boolean {
    return !this.isDrivingFaults() && this.faultNotes[faultName];
  }

  isDrivingFaults(): boolean {
    return this.summary.title === this.drivingFaultsTitle;
  }
}
