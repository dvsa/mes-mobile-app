import { Component, Input } from '@angular/core';
import { Name } from '@dvsa/mes-journal-schema';
import { ModalController } from 'ionic-angular';
import { startsWith } from 'lodash';
import { end2endPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';
import { App } from '../../../app/app.component';
import { CANDIDATE_DETAILS_PAGE, FAKE_CANDIDATE_DETAILS_PAGE } from '../../../pages/page-names.constants';

@Component({
  selector: 'candidate-link',
  templateUrl: 'candidate-link.html',
})
export class CandidateLinkComponent {
  @Input()
  slot: any;

  @Input()
  slotChanged: boolean;

  @Input()
  name: Name;

  @Input()
  testComplete: boolean;

  @Input()
  isPortrait: boolean;

  @Input()
  catDisabled: boolean;

  constructor(public modalController: ModalController, private app: App) {
  }

  openCandidateDetailsModal() {
    let pageToOpen = CANDIDATE_DETAILS_PAGE;

    if (startsWith(this.slot.slotDetail.slotId.toString(), end2endPracticeSlotId)) {
      pageToOpen = FAKE_CANDIDATE_DETAILS_PAGE;
    }

    // Modals are at the same level as the ion-nav so are not getting the zoom level class,
    // this needs to be passed in the create options.
    const zoomClass = `modal-fullscreen ${this.app.getTextZoomClass()}`;
    const profileModal = this.modalController.create(
      pageToOpen,
      { slot: this.slot, slotChanged: this.slotChanged },
      { cssClass: zoomClass });
    profileModal.present();
  }
}
