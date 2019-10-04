import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { App } from '../../../app/app.component';
import { HELP_PAGE } from '../../../pages/page-names.constants';

@Component({
  selector: 'help-link',
  templateUrl: 'help-link.html',
})
export class HelpLinkComponent {

  constructor(public modalController: ModalController, private app: App) {}

  openHelpPageModal() {
    // Modals are at the same level as the ion-nav so are not getting the zoom level class,
    // this needs to be passed in the create options.
    const zoomClass = `modal-fullscreen ${this.app.getTextZoomClass()}`;
    const modal = this.modalController.create(
      HELP_PAGE,
      { },
      { cssClass: zoomClass });
    modal.present();
  }
}
