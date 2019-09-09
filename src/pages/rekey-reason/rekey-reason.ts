import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  Platform,
  Modal,
  ModalController,
  LoadingController,
  Loading,
  ToastController,
  Toast,
} from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { BasePageComponent } from '../../shared/classes/base-page';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { RekeyReasonViewDidEnter, RekeyReasonFindUser, RekeyReasonFindUserFailure } from './rekey-reason.actions';
import { UploadRekeyModalEvent } from './components/upload-rekey-modal/upload-rekey-modal.constants';
import { Observable } from 'rxjs/Observable';
import {
  IpadIssueSelected,
  IpadIssueTechFaultSelected,
  IpadIssueLostSelected,
  IpadIssueStolenSelected,
  IpadIssueBrokenSelected,
  OtherSelected,
  OtherReasonUpdated,
  TransferSelected,
} from '../../modules/tests/rekey-reason/rekey-reason.actions';
import { Subscription } from 'rxjs/Subscription';
import { REKEY_UPLOAD_OUTCOME_PAGE, REKEY_SEARCH_PAGE, JOURNAL_PAGE } from '../page-names.constants';
import { getRekeyReasonState } from './rekey-reason.reducer';
import { map } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { SendCurrentTest } from '../../modules/tests/tests.actions';
import { RekeyReasonUploadModel, RekeyReasonFindUserModel } from './rekey-reason.model';
import { getUploadStatus, getFindUserStatus } from './rekey-reason.selector';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  getReasonForRekey,
  getRekeyIpadIssue,
  getRekeyTransfer,
  getRekeyOther,
} from '../../modules/tests/rekey-reason/rekey-reason.selector';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../modules/tests/tests.selector';
import { IpadIssue, Transfer, Other } from '@dvsa/mes-test-schema/categories/B';
import { EndRekey } from '../../modules/tests/rekey/rekey.actions';
import { ExitRekeyModalEvent } from './components/exit-rekey-modal/exit-rekey-modal.constants';

import { SetExaminerConducted } from '../../modules/tests/examiner-conducted/examiner-conducted.actions';

import { getExaminerConducted } from '../../modules/tests/examiner-conducted/examiner-conducted.reducer';
import { SetRekeyDate } from '../../modules/tests/rekey-date/rekey-date.actions';

interface RekeyReasonPageState {
  uploadStatus$: Observable<RekeyReasonUploadModel>;
  ipadIssue$: Observable<IpadIssue>;
  transfer$: Observable<Transfer>;
  other$: Observable<Other>;
  findUser$: Observable<RekeyReasonFindUserModel>;
  examinerConducted$: Observable<number>;
  findUserObservable$: Observable<RekeyReasonFindUserModel>;
  initialExaminerConducted$: Observable<number>;
}

@IonicPage()
@Component({
  selector: 'page-rekey-reason',
  templateUrl: 'rekey-reason.html',
})
export class RekeyReasonPage extends BasePageComponent {

  formGroup: FormGroup;

  ipadIssueBoolean: boolean;

  pageState: RekeyReasonPageState;
  subscription: Subscription = Subscription.EMPTY;

  toast: Toast;

  isUploading: boolean = false;
  hasUploaded: boolean = false;
  hasTriedUploading: boolean = false;

  modal: Modal;
  loadingSpinner: Loading;

  reasonCharsRemaining: number = null;

  transferStaffExists: boolean = false;

  initialExaminerConducted: number = null;

  ipadIssueUpdate;

  initialIpadIssue = true;
  initialTransfer = true;
  initialOther = true;

  constructor(
    public navController: NavController,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public store$: Store<StoreModel>,
    private modalController: ModalController,
    public loadingController: LoadingController,
    public toastController: ToastController,
  ) {
    super(platform, navController, authenticationProvider);
    this.formGroup = new FormGroup({
      ipadIssue: new FormControl(false),
      ipadIssueTechFault: new FormControl(false),
      ipadIssueLost: new FormControl(false),
      ipadIssueStolen: new FormControl(false),
      ipadIssueBroken: new FormControl(false),
      transferSelected: new FormControl(false),
      transferStaffNumber: new FormControl('', [Validators.minLength(1), Validators.required]),
      otherSelected: new FormControl(false),
      otherReasonUpdated: new FormControl('', [Validators.minLength(1), Validators.required]),
    });
  }

  ngOnInit(): void {
    const currentReasonForRekey$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
      select(getReasonForRekey),
    );

    this.pageState = {
      uploadStatus$: this.store$.pipe(
        select(getRekeyReasonState),
        select(getUploadStatus),
      ),
      ipadIssue$: currentReasonForRekey$.pipe(
        select(getRekeyIpadIssue),
      ),
      transfer$: currentReasonForRekey$.pipe(
        select(getRekeyTransfer),
      ),
      other$: currentReasonForRekey$.pipe(
        select(getRekeyOther),
      ),
      findUser$: this.store$.pipe(
        select(getRekeyReasonState),
        select(getFindUserStatus),
      ),
      examinerConducted$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getExaminerConducted),
      ),
      findUserObservable$: this.store$.pipe(
        select(getRekeyReasonState),
        select(getFindUserStatus),
      ),
      initialExaminerConducted$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getExaminerConducted),
      ),
    };

    this.ipadIssueUpdate = this.pageState.ipadIssue$.subscribe(
      (ipadIssue: IpadIssue) => {
        this.formGroup.get('ipadIssue').setValue(ipadIssue.selected);
        if (ipadIssue.selected) {
          this.formGroup.get('ipadIssueTechFault').setValue(ipadIssue.technicalFault);
          this.formGroup.get('ipadIssueLost').setValue(ipadIssue.lost);
          this.formGroup.get('ipadIssueStolen').setValue(ipadIssue.stolen);
          this.formGroup.get('ipadIssueBroken').setValue(ipadIssue.broken);
        }
      },
    );

    this.pageState.transfer$.subscribe(
      (transfer: Transfer) => {
        this.formGroup.get('transferSelected').setValue(transfer.selected);
      },
    );

    this.pageState.other$.subscribe(
      (other: Other) => {
        this.formGroup.get('otherSelected').setValue(other.selected);
        if (other.selected) {
          this.formGroup.get('otherReasonUpdated').setValue(other.reason);
        }
      },
    );

    const { uploadStatus$, findUserObservable$, initialExaminerConducted$ } = this.pageState;

    this.subscription = merge(
      uploadStatus$.pipe(map(this.handleUploadOutcome)),
      findUserObservable$.pipe(map(this.handleFindUserResponse)),
      initialExaminerConducted$.pipe(map(this.handleExistingExaminerConducted)),
    ).subscribe();
  }

  ionViewDidEnter() {
    this.store$.dispatch(new RekeyReasonViewDidEnter());
  }

  ionViewDidLeave(): void {
    this.store$.dispatch(new TransferSelected(false));
    this.store$.dispatch(new SetExaminerConducted(this.initialExaminerConducted));
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onUploadPressed = (): void => {
    if (this.formIsValid()) {
      this.onShowUploadRekeyModal();
    }
  }

  onShowUploadRekeyModal = (retryMode: boolean = false): void => {
    const options = { cssClass: 'mes-modal-alert text-zoom-regular' };
    this.modal = this.modalController.create('UploadRekeyModal', { retryMode }, options);
    this.modal.onDidDismiss(this.onUploadRekeyModalDismiss);
    this.modal.present();
  }

  onUploadRekeyModalDismiss = (event: UploadRekeyModalEvent): void => {
    switch (event) {
      case UploadRekeyModalEvent.UPLOAD:
        this.store$.dispatch(new SetRekeyDate());
        this.store$.dispatch(new SendCurrentTest());
        break;
    }
  }

  handleUploadOutcome = (uploadStatus: RekeyReasonUploadModel): void => {

    this.handleLoadingUI(uploadStatus.isUploading);

    if (uploadStatus.hasUploadSucceeded || uploadStatus.isDuplicate) {
      this.navController.push(REKEY_UPLOAD_OUTCOME_PAGE);
      return;
    }
    if (uploadStatus.hasUploadFailed) {
      this.onShowUploadRekeyModal(true);
    }
  }

  handleFindUserResponse = (findUser: RekeyReasonFindUserModel): void => {
    this.transferStaffExists = findUser.isValid;
  }

  handleExistingExaminerConducted = (existingExaminerConducted: number): void => {
    if (this.initialExaminerConducted === null) {
      this.initialExaminerConducted = existingExaminerConducted;
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

  formIsValid() {
    const rekeyReasonProvided = this.formGroup.get('ipadIssue').value ||
      (this.formGroup.get('otherSelected').value || this.formGroup.get('transferStaffNumber').value);

    const reasonForRekeyIsValid = !this.formGroup.get('otherSelected').value ||
      (this.formGroup.get('otherSelected').value
        && this.formGroup.get('otherReasonUpdated').valid);

    const transferStaffValid = (!this.isTransferSelected() || this.isTransferSelected() && this.transferStaffExists);

    const otherReasonForRekeyValid =
      (!this.isOtherReasonSelected() || this.isOtherReasonSelected() && this.reasonValue().length);

    if (rekeyReasonProvided && reasonForRekeyIsValid
      && transferStaffValid) {
      return true;
    }

    if (!rekeyReasonProvided) {
      this.createToast('Provide at least one reason for rekey');
    }
    if (!transferStaffValid) {
      this.createToast('Transfer staff number is invalid');
    }
    if (!otherReasonForRekeyValid) {
      this.createToast('Other reason for rekey must be entered');
    }
    this.toast.present();
  }

  private createToast = (errorMessage: string) => {
    this.toast = this.toastController.create({
      message: errorMessage,
      position: 'top',
      dismissOnPageChange: true,
      cssClass: 'mes-toast-message-error',
      duration: 5000,
      showCloseButton: true,
      closeButtonText: 'X',
    });
  }

  ipadIssueSelected(checked: boolean) {
    this.store$.dispatch(new IpadIssueSelected(checked));
  }

  ipadIssueTechFaultChanged() {
    this.store$.dispatch(new IpadIssueTechFaultSelected());
  }

  ipadIssueLostChanged() {
    this.store$.dispatch(new IpadIssueLostSelected());
  }

  ipadIssueStolenChanged() {
    this.store$.dispatch(new IpadIssueStolenSelected());
  }

  ipadIssueBrokenChanged() {
    this.store$.dispatch(new IpadIssueBrokenSelected());
  }

  otherSelected(checked: boolean) {
    this.formGroup.controls['otherReasonUpdated'].setValue('');
    this.store$.dispatch(new OtherSelected(checked));
  }

  otherReasonUpdatedChanged() {
    this.store$.dispatch(new OtherReasonUpdated(this.reasonValue()));
  }

  transferSelected(checked: boolean) {
    this.formGroup.controls['transferStaffNumber'].setValue('');
    // To invalidate the input
    this.store$.dispatch(new RekeyReasonFindUserFailure());
    this.store$.dispatch(new TransferSelected(checked));

    if (!checked) {
      this.store$.dispatch(new SetExaminerConducted(this.initialExaminerConducted));
    } else {
      this.store$.dispatch(new SetExaminerConducted(null));
      this.formGroup.controls['transferStaffNumber'].setValue('');
    }
  }

  transferStaffNumberChanged() {
    // To invalidate the input
    this.store$.dispatch(new RekeyReasonFindUserFailure());
    this.store$.dispatch(new SetExaminerConducted(this.transferValue()));
  }

  reasonValue(): string {
    return this.formGroup.controls['otherReasonUpdated'].value;
  }

  transferValue(): number {
    return parseInt(this.formGroup.controls['transferStaffNumber'].value, 10);
  }

  isTransferSelected(): boolean {
    return this.formGroup.get('transferSelected').value;
  }

  isOtherReasonSelected(): boolean {
    return this.formGroup.get('otherSelected').value;
  }

  characterCountChanged(charactersRemaining: number) {
    this.reasonCharsRemaining = charactersRemaining;
  }

  getCharacterCountText() {
    const characterString = Math.abs(this.reasonCharsRemaining) === 1 ? 'character' : 'characters';
    const endString = this.reasonCharsRemaining < 0 ? 'too many' : 'remaining';
    return `You have ${Math.abs(this.reasonCharsRemaining)} ${characterString} ${endString}`;
  }

  charactersExceeded(): boolean {
    return this.reasonCharsRemaining < 0;
  }

  invalidReason(): boolean {
    return !this.formGroup.controls['otherReasonUpdated'].valid;
  }

  exitRekey = (): void => {
    const rekeySearchPage = this.navController.getViews().find(view => view.id === REKEY_SEARCH_PAGE);
    const journalPage = this.navController.getViews().find(view => view.id === JOURNAL_PAGE);
    if (rekeySearchPage) {
      this.navController.popTo(rekeySearchPage);
    } else {
      this.navController.popTo(journalPage);
    }
    this.store$.dispatch(new EndRekey());
  }

  onExitRekeyPressed(): void {
    this.showExitRekeyModal();
  }

  showExitRekeyModal(): void {
    const options = { cssClass: 'mes-modal-alert text-zoom-regular' };
    this.modal = this.modalController.create('ExitRekeyModal', {}, options);
    this.modal.onDidDismiss(this.onExitRekeyModalDismiss);
    this.modal.present();
  }

  onExitRekeyModalDismiss = (event: ExitRekeyModalEvent): void => {
    switch (event) {
      case ExitRekeyModalEvent.EXIT_REKEY:
        this.exitRekey();
        break;
    }
  }

  checkUserExists() {
    this.store$.dispatch(new RekeyReasonFindUser(this.transferValue().toString()));
  }

}
