import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, Modal, ModalController, LoadingController, Loading } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { PracticeableBasePageComponent } from '../../shared/classes/practiceable-base-page';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { RekeyReasonViewDidEnter, RekeyReasonViewDidLeave } from './rekey-reason.actions';
import { ModalEvent } from './components/upload-rekey-modal/upload-rekey-modal.constants';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { REKEY_UPLOADED_PAGE } from '../page-names.constants';
import { getRekeyReasonState } from './rekey-reason.reducer';
import { map } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { SendCurrentTest } from '../../modules/tests/tests.actions';
import { RekeyReasonUploadModel } from './rekey-reason.model';
import { getUploadStatus } from './rekey-reason.selector';

interface RekeyReasonPageState {
  uploadStatus$: Observable<RekeyReasonUploadModel>;
}

@IonicPage()
@Component({
  selector: 'page-rekey-reason',
  templateUrl: 'rekey-reason.html',
})
export class RekeyReasonPage extends PracticeableBasePageComponent {

  pageState: RekeyReasonPageState;
  subscription: Subscription = Subscription.EMPTY;

  isUploading: boolean = false;
  hasUploaded: boolean = false;
  hasTriedUploading: boolean = false;

  modal: Modal;
  loadingSpinner: Loading;

  constructor(
    public navController: NavController,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public store$: Store<StoreModel>,
    private modalController: ModalController,
    public loadingController: LoadingController,
  ) {
    super(platform, navController, authenticationProvider, store$);
  }

  ngOnInit(): void {
    this.pageState = {
      uploadStatus$: this.store$.pipe(
        select(getRekeyReasonState),
        select(getUploadStatus),
      ),
    };

    const { uploadStatus$ } = this.pageState;

    this.subscription = merge(
      uploadStatus$.pipe(map(this.handleUploadOutcome)),
    ).subscribe();
  }

  ionViewDidEnter() {
    this.store$.dispatch(new RekeyReasonViewDidEnter());
  }

  ionViewDidLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.store$.dispatch(new RekeyReasonViewDidLeave());
  }

  onUploadPressed = (): void => {
    // TODO - if form valid
    this.onShowModal();
  }

  onShowModal = (retryMode: boolean = false): void => {
    const options = { cssClass: 'mes-modal-alert text-zoom-regular' };
    this.modal = this.modalController.create('UploadRekeyModal', { retryMode }, options);
    this.modal.onDidDismiss(this.onModalDismiss);
    this.modal.present();
  }

  onModalDismiss = (event: ModalEvent): void => {
    switch (event) {
      case ModalEvent.UPLOAD:
        this.store$.dispatch(new SendCurrentTest());
        break;
    }
  }

  handleUploadOutcome = (uploadStatus: RekeyReasonUploadModel): void => {

    this.handleLoadingUI(uploadStatus.isUploading);

    if (uploadStatus.hasUploadSucceeded) {
      this.navController.push(REKEY_UPLOADED_PAGE);
      return;
    }
    if (uploadStatus.hasUploadFailed) {
      this.onShowModal(true);
    }
  }

  handleLoadingUI = (isLoading: boolean): void => {
    if (isLoading) {
      this.loadingSpinner = this.loadingController.create({
        spinner: 'circles',
        content: 'Uploading...',
      });
      this.loadingSpinner.present();
      return;
    }
    if (this.loadingSpinner) {
      this.loadingSpinner.dismiss();
      this.loadingSpinner = null;
    }
  }

}
