import { Component, Input } from '@angular/core';
import { Name } from '../../../../shared/models/DJournal';
import { ModalController } from 'ionic-angular';
import { App } from '../../../../app/app.component';
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

  constructor(public modalController: ModalController, private app: App) {
  }

  openCandidateDetailsModal() {
    // Modals are at the same level as the ion-nav so are not getting the zoom level class,
    // this needs to be passed in the create options.
    const zoomClass = `modal-fullscreen ${this.app.getTextZoomClass()}`;
    const profileModal = this.modalController.create(
      'CandidateDetailsPage',
      { slotId: this.slotId, slotChanged: this.slotChanged },
      { cssClass: zoomClass });
    profileModal.present();
  }
}
