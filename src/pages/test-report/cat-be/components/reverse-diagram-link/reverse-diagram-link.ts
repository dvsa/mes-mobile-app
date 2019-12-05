import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { App } from '../../../../../app/app.component';
import { CAT_BE } from '../../../../page-names.constants';

@Component({
  selector: 'reverse-diagram-link',
  templateUrl: 'reverse-diagram-link.html',
})
export class ReverseDiagramLinkComponent {

  constructor(public modalController: ModalController, private app: App) {
  }

  openReverseDiagramModal() {
    const pageToOpen = CAT_BE.REVERSE_DIAGRAM_PAGE;

    // Modals are at the same level as the ion-nav so are not getting the zoom level class,
    // this needs to be passed in the create options.
    const zoomClass = `modal-fullscreen ${this.app.getTextZoomClass()}`;
    const distancesModal = this.modalController.create(
      pageToOpen,
      {},
      { cssClass: zoomClass });
    distancesModal.present();
  }
}
