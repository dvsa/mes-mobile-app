import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../../../shared/models/store.model';
import { App } from '../../../../../app/app.component';
import { CAT_BE } from '../../../../page-names.constants';
import {
  ReverseDiagramOpened,
  ReverseDiagramClosed,
} from '../../../components/reverse-diagram-modal/reverse-diagram-modal.actions';

@Component({
  selector: 'reverse-diagram-link',
  templateUrl: 'reverse-diagram-link.html',
})
export class ReverseDiagramLinkComponent {

  constructor(
    public modalController: ModalController,
    private app: App,
    private store$: Store<StoreModel>,
  ) {}

  openReverseDiagramModal() {
    const pageToOpen = CAT_BE.REVERSE_DIAGRAM_PAGE;
    this.store$.dispatch(new ReverseDiagramOpened());
    // Modals are at the same level as the ion-nav so are not getting the zoom level class,
    // this needs to be passed in the create options.
    const zoomClass = `modal-fullscreen ${this.app.getTextZoomClass()}`;
    const reverseDiagramModal = this.modalController.create(
      pageToOpen,
      { onClose: this.closeReverseDiagramModal },
      { cssClass: zoomClass });
    reverseDiagramModal.present();
  }

  closeReverseDiagramModal() {
    this.store$.dispatch(new ReverseDiagramClosed());
  }
}
