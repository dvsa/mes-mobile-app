import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  Platform,
  Modal,
  ModalController,
  LoadingController,
  Loading,
} from 'ionic-angular';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import {
  RekeyReasonViewDidEnter,
  ValidateTransferRekey,
  ResetStaffNumberValidationError,
} from '../rekey-reason.actions';
import { UploadRekeyModalEvent } from '../components/upload-rekey-modal/upload-rekey-modal.constants';
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
} from '../../../modules/tests/rekey-reason/rekey-reason.actions';
import { Subscription } from 'rxjs/Subscription';
import { REKEY_SEARCH_PAGE, JOURNAL_PAGE, CAT_C } from '../../page-names.constants';
import { getRekeyReasonState } from '../rekey-reason.reducer';
import { map } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { SendCurrentTest } from '../../../modules/tests/tests.actions';
import { RekeyReasonUploadModel } from '../rekey-reason.model';
import { getUploadStatus } from '../rekey-reason.selector';
import { FormGroup } from '@angular/forms';
import {
  getReasonForRekey,
  getRekeyIpadIssue,
  getRekeyTransfer,
  getRekeyOther,
} from '../../../modules/tests/rekey-reason/rekey-reason.selector';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../modules/tests/tests.selector';
import { IpadIssue, Transfer, Other } from '@dvsa/mes-test-schema/categories/Common';
import { EndRekey } from '../../../modules/tests/rekey/rekey.actions';
import { ExitRekeyModalEvent } from '../components/exit-rekey-modal/exit-rekey-modal.constants';
import { SetExaminerConducted } from '../../../modules/tests/examiner-conducted/examiner-conducted.actions';
import { SetRekeyDate } from '../../../modules/tests/rekey-date/rekey-date.actions';
import { getExaminerKeyed } from '../../../modules/tests/examiner-keyed/examiner-keyed.reducer';
import { getExaminerConducted } from '../../../modules/tests/examiner-conducted/examiner-conducted.reducer';

interface RekeyReasonPageState {
  uploadStatus$: Observable<RekeyReasonUploadModel>;
  ipadIssue$: Observable<IpadIssue>;
  transfer$: Observable<Transfer>;
  other$: Observable<Other>;
  examinerConducted$: Observable<number>;
  examinerKeyed$: Observable<number>;
}

@IonicPage()
@Component({
  selector: '.rekey-reason-cat-c-page',
  templateUrl: 'rekey-reason.cat-c.page.html',
})
export class RekeyReasonCatCPage extends BasePageComponent {

  formGroup: FormGroup;

  pageState: RekeyReasonPageState;
  subscription: Subscription = Subscription.EMPTY;

  isUploading: boolean = false;
  hasUploaded: boolean = false;
  hasTriedUploading: boolean = false;
  isStaffNumberInvalid: boolean = false;
  isTransferSelected: boolean = false;

  modal: Modal;
  loadingSpinner: Loading;

  reasonCharsRemaining: number = null;

  examinerConducted: number = null;
  examinerKeyed: number = null;

  constructor(
    public navController: NavController,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public store$: Store<StoreModel>,
    private modalController: ModalController,
    public loadingController: LoadingController,
  ) {
    super(platform, navController, authenticationProvider);
    this.formGroup = new FormGroup({});
  }

  ngOnInit(): void {
    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );

    this.pageState = {
      uploadStatus$: this.store$.pipe(
        select(getRekeyReasonState),
        select(getUploadStatus),
      ),
      ipadIssue$: currentTest$.pipe(
        select(getReasonForRekey),
        select(getRekeyIpadIssue),
      ),
      transfer$: currentTest$.pipe(
        select(getReasonForRekey),
        select(getRekeyTransfer),
      ),
      other$: currentTest$.pipe(
        select(getReasonForRekey),
        select(getRekeyOther),
      ),
      examinerConducted$: currentTest$.pipe(
        select(getExaminerConducted),
      ),
      examinerKeyed$: currentTest$.pipe(
        select(getExaminerKeyed),
      ),
    };

    const { uploadStatus$, examinerConducted$, examinerKeyed$, transfer$ } = this.pageState;

    this.subscription = merge(
      uploadStatus$.pipe(map(this.handleUploadOutcome)),
      examinerConducted$.pipe(map(val => this.examinerConducted = val)),
      examinerKeyed$.pipe(map(val => this.examinerKeyed = val)),
      transfer$.pipe(map(transfer => this.isTransferSelected = transfer.selected)),
    ).subscribe();
  }

  ionViewDidEnter() {
    this.store$.dispatch(new RekeyReasonViewDidEnter());
  }

  ionViewDidLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onUploadPressed = (): void => {
    if (this.isFormValid()) {
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
        if (this.isTransferSelected) {
          this.store$.dispatch(new ValidateTransferRekey());
        } else {
          this.store$.dispatch(new SendCurrentTest());
        }
        break;
    }
  }

  handleUploadOutcome = (uploadStatus: RekeyReasonUploadModel): void => {

    this.handleLoadingUI(uploadStatus.isUploading);
    this.isStaffNumberInvalid = uploadStatus.hasStaffNumberFailedValidation;

    if (uploadStatus.hasUploadSucceeded || uploadStatus.isDuplicate) {
      this.navController.push(CAT_C.REKEY_UPLOAD_OUTCOME_PAGE);
      return;
    }
    if (uploadStatus.hasUploadFailed) {
      this.onShowUploadRekeyModal(true);
    }
  }

  handleLoadingUI = (isLoading: boolean): void => {
    if (isLoading) {
      if (!this.loadingSpinner) {
        this.loadingSpinner = this.loadingController.create({
          spinner: 'circles',
          content: 'Uploading...',
        });
        this.loadingSpinner.present();
      }
      return;
    }
    if (this.loadingSpinner) {
      this.loadingSpinner.dismiss();
      this.loadingSpinner = null;
    }
  }

  isFormValid() {
    if (this.formGroup.valid) {
      return true;
    }
    Object.keys(this.formGroup.controls).forEach((controlName) => {
      if (this.formGroup.controls[controlName].invalid) {
        this.formGroup.controls[controlName].markAsDirty();
      }
    });
    return false;
  }

  ipadIssueSelected(checked: boolean) {
    this.store$.dispatch(new IpadIssueSelected(checked));
  }

  ipadIssueTechnicalFaultChanged(selected: boolean) {
    this.store$.dispatch(new IpadIssueTechFaultSelected());
  }

  ipadIssueLostChanged(selected: boolean) {
    this.store$.dispatch(new IpadIssueLostSelected());
  }

  ipadIssueStolenChanged(selected: boolean) {
    this.store$.dispatch(new IpadIssueStolenSelected());
  }

  ipadIssueBrokenChanged(selected: boolean) {
    this.store$.dispatch(new IpadIssueBrokenSelected());
  }

  otherSelected(checked: boolean) {
    this.store$.dispatch(new OtherSelected(checked));
  }

  otherReasonChanged(reason: string) {
    this.store$.dispatch(new OtherReasonUpdated(reason));
  }

  transferSelected(isChecked: boolean) {
    this.store$.dispatch(new TransferSelected(isChecked));
    if (isChecked) {
      this.store$.dispatch(new SetExaminerConducted(null));
    } else {
      this.store$.dispatch(new SetExaminerConducted(this.examinerKeyed)); // reset to current user
      this.store$.dispatch(new ResetStaffNumberValidationError());
    }
  }

  staffNumberChanged(staffNumber: number) {
    if (this.isStaffNumberInvalid) {
      this.store$.dispatch(new ResetStaffNumberValidationError());
    }
    this.store$.dispatch(new SetExaminerConducted(staffNumber));
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

}
