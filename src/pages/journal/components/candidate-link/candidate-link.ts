import { Component, Input } from '@angular/core';
import { Name } from '../../../../shared/models/DJournal';
import { ModalController } from 'ionic-angular';
@Component({
  selector: 'candidate-link',
  templateUrl: 'candidate-link.html',
})
export class CandidateLinkComponent {
  @Input()
  slotId: number;

  @Input()
  slotChanged: boolean;

  @Input()
  name: Name;

  @Input()
  testComplete: boolean;

  @Input()
  isPortrait: boolean;

  constructor(public modalController: ModalController) {
  }

  openCandidateDetailsModal() {
    const profileModal = this.modalController.create(
      'CandidateDetailsPage',
      { slotId: this.slotId, slotChanged: this.slotChanged },
      { cssClass: 'modal-fullscreen' });
    profileModal.present();
  }
}
