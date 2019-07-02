import { Component, Input } from '@angular/core';
import { Name } from '@dvsa/mes-journal-schema';
import { ModalController } from 'ionic-angular';
import { App } from '../../../../app/app.component';
import { startsWith } from 'lodash';
import { end2endPracticeSlotId } from '../../../../shared/mocks/test-slot-ids.mock';
import { CANDIDATE_DETAILS_PAGE, FAKE_CANDIDATE_DETAILS_PAGE } from '../../../page-names.constants';

@Component({
  selector: 'candidate-link',
  templateUrl: 'candidate-link.html',
})
export class CandidateLinkComponent {
  @Input()
  slotId: number | string;

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
    let pageToOpen = CANDIDATE_DETAILS_PAGE;

    if (startsWith(this.slotId.toString(), end2endPracticeSlotId)) {
      pageToOpen = FAKE_CANDIDATE_DETAILS_PAGE;
    }

    // Modals are at the same level as the ion-nav so are not getting the zoom level class,
    // this needs to be passed in the create options.
    const zoomClass = `modal-fullscreen ${this.app.getTextZoomClass()}`;
    const profileModal = this.modalController.create(
      pageToOpen,
      { slotId: this.slotId, slotChanged: this.slotChanged },
      { cssClass: zoomClass });
    profileModal.present();
  }
}
