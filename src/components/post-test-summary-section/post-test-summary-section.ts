import { IManualSummary } from './../test-summary/interfaces/IManualSummary';
import { Component, Input } from '@angular/core';
import { IFaultSummary } from '../test-summary/interfaces/IFaultSummary';
import { FaultTitle } from '../test-summary/enums/FaultTitle';
import { find } from 'lodash';
import { ModalController } from 'ionic-angular';
import { TextboxModalComponent } from '../textbox-modal/textbox-modal';

@Component({
  selector: 'post-test-summary-section',
  templateUrl: 'post-test-summary-section.html'
})
export class PostTestSummarySectionComponent {
  @Input() summary: IFaultSummary;
  @Input() manualSummary: IManualSummary;
  drivingFaultsTitle: string = FaultTitle.DrivingFaults;
  // Map of fault name to the note
  private faultNotes = new Map<string, string>();

  faultTitleColourMap = [
    { title: FaultTitle.Dangerous, colour: 'failRed' },
    { title: FaultTitle.Serious, colour: 'seriousYellow' },
    { title: FaultTitle.DrivingFaults, colour: 'dark' }
  ];

  constructor(private modalCtrl: ModalController) {}

  getFaultTitleColour(title: FaultTitle) {
    return find(this.faultTitleColourMap, { title }).colour;
  }

  openTextboxModal(faultName: string) {
    const textboxModal = this.modalCtrl.create(TextboxModalComponent, {
      title: faultName,
      notes: this.faultNotes[faultName] || ''
    });
    textboxModal.onDidDismiss((notes?: string) => (this.faultNotes[faultName] = notes));
    textboxModal.present();
  }
}
