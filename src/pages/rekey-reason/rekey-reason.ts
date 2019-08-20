import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, Modal, ModalController } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { PracticeableBasePageComponent } from '../../shared/classes/practiceable-base-page';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { RekeyReasonViewDidEnter } from './rekey-reason.actions';
import { ModalEvent } from './components/upload-rekey-modal/upload-rekey-modal.constants';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

interface RekeyReasonPageState {
  isUploading$: Observable<boolean>;
}

@IonicPage()
@Component({
  selector: 'page-rekey-reason',
  templateUrl: 'rekey-reason.html',
})
export class RekeyReasonPage extends PracticeableBasePageComponent {

  pageState: RekeyReasonPageState;
  subscription: Subscription = Subscription.EMPTY;

  modal: Modal;

  count: number = 0;

  constructor(
    public navController: NavController,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public store$: Store<StoreModel>,
    private modalController: ModalController,
  ) {
    super(platform, navController, authenticationProvider, store$);
  }

  ionViewDidEnter() {
    this.store$.dispatch(new RekeyReasonViewDidEnter());
  }

  onUploadPressed = (): void => {
    // TODO - if form valid
    this.count = this.count + 1;

    const options = { cssClass: 'mes-modal-alert text-zoom-regular' };
    this.modal = this.modalController.create('UploadRekeyModal', { success: this.count > 1 }, options);
    this.modal.onDidDismiss(this.onModalDismiss);
    this.modal.present();
  }

  onModalDismiss = (event: ModalEvent): void => {
    switch (event) {
      case ModalEvent.CANCEL:
        console.log('CANCEL PRESSED');
        break;
      case ModalEvent.CONTINUE:
        console.log('CONTINUE PRESSED');
        this.navController.popToRoot();
        break;
    }
  }

}
