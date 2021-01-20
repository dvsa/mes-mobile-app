import { Subscription, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
  IonicPage, NavController, NavParams, Platform, ViewController, ModalController, AlertController,
} from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import {
  DelegatedRekeySearchViewDidEnter,
  SearchBookedDelegatedTest,
  DelegatedRekeySearchClearState,
} from './delegated-rekey-search.actions';

import { distinctUntilChanged, map } from 'rxjs/operators';
import
{
  getIsLoading,
  getHasSearched,
  getBookedTestSlot,
  getDelegatedRekeySearchError,
} from './delegated-rekey-search.selector';
import { getDelegatedRekeySearchState } from './delegated-rekey-search.reducer';
import { TestSlot } from '@dvsa/mes-journal-schema';
import { isEmpty } from 'lodash';
import { DelegatedRekeySearchError, DelegatedRekeySearchErrorMessages } from './delegated-rekey-search-error-model';
import { HttpErrorResponse } from '@angular/common/http';
import { ERROR_PAGE } from '../page-names.constants';
import { ErrorTypes } from '../../shared/models/error-message';
import { App } from './../../app/app.component';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppConfigProvider } from '../../providers/app-config/app-config';

interface DelegatedRekeySearchPageState {
  isLoading$: Observable<boolean>;
  hasSearched$: Observable<boolean>;
  bookedTestSlot$: Observable<TestSlot>;
  rekeySearchErr$: Observable<DelegatedRekeySearchError | HttpErrorResponse>;
}

@IonicPage()
@Component({
  selector: 'page-delegated-rekey-search',
  templateUrl: 'delegated-rekey-search.html',
})
export class DelegatedRekeySearchPage extends BasePageComponent implements OnInit {

  pageState: DelegatedRekeySearchPageState;
  delegatedRekeyForm: FormGroup;
  hasClickedSearch: boolean = false;

  applicationReference: string = '';
  subscription: Subscription = Subscription.EMPTY;

  constructor(
    public viewController: ViewController,
    public navController: NavController,
    public platform: Platform,
    public navParams: NavParams,
    public authenticationProvider: AuthenticationProvider,
    private store$: Store<StoreModel>,
    private modalController: ModalController,
    private app: App,
    private alertController: AlertController,
    private appConfigProvider: AppConfigProvider,
  ) {
    super(platform, navController, authenticationProvider);
  }

  async ngOnInit(): Promise<void> {
    this.store$.dispatch(new DelegatedRekeySearchClearState());
    const rekeySearch$ = this.store$.pipe(
      select(getDelegatedRekeySearchState),
    );
    this.pageState = {
      isLoading$: rekeySearch$.pipe(
        map(getIsLoading),
      ),
      hasSearched$: rekeySearch$.pipe(
        map(getHasSearched),
      ),
      bookedTestSlot$: rekeySearch$.pipe(
        map(getBookedTestSlot),
      ),
      rekeySearchErr$: rekeySearch$.pipe(
        map(getDelegatedRekeySearchError),
        distinctUntilChanged(),
      ),
    };
    this.delegatedRekeyForm = new FormGroup({});
    this.delegatedRekeyForm
      .addControl('applicationReferenceInput', new FormControl({}, [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
      ]));
  }

  get applicationReferenceInvalid(): boolean {
    const applicationReferenceControl: AbstractControl = this.delegatedRekeyForm.get('applicationReferenceInput');
    return !applicationReferenceControl.valid && applicationReferenceControl.dirty;
  }

  ionViewDidEnter() {
    this.store$.dispatch(new DelegatedRekeySearchViewDidEnter());
    this.setUpSubscription();
  }

  setUpSubscription() {
    this.subscription = this.pageState.rekeySearchErr$.subscribe((error) => {
      // tslint:disable-next-line:max-line-length
      console.log(`🚀 ~ file: delegated-rekey-search.ts ~ line 110 ~ this.subscription=this.pageState.rekeySearchErr$.subscribe ~ error`, JSON.stringify(error));
      if (!this.hasBookingAlreadyBeenCompleted(error) && this.hasClickedSearch) {
        this.showAlert(error);
      }
    });
  }

  ionViewDidLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.store$.dispatch(new DelegatedRekeySearchClearState());
    this.applicationReference = '';
    this.hasClickedSearch = false;
  }

  applicationReferenceChanged(val: string) {
    this.applicationReference = val;
  }

  searchTests() {
    this.hasClickedSearch = true;
    const applicationReferenceInputValue: AbstractControl = this.delegatedRekeyForm.get('applicationReferenceInput');
    this.showAlert({
      appRefInputValid: applicationReferenceInputValue.valid.toString(),
      applicationReference: this.applicationReference,
      delexBookingSearchUrl: this.appConfigProvider.getAppConfig().journal.delegatedExaminerSearchBookingUrl,
    });
    if (applicationReferenceInputValue.valid) {
      this.store$.dispatch(new SearchBookedDelegatedTest(this.applicationReference));
    }
  }

  isBookedTestSlotEmpty(bookedTestsSlot: TestSlot) {
    return isEmpty(bookedTestsSlot);
  }

  hasBookingAlreadyBeenCompleted(rekeySearchErr: HttpErrorResponse | DelegatedRekeySearchError) {
    return rekeySearchErr.message === DelegatedRekeySearchErrorMessages.BookingAlreadyCompleted;
  }

  async showError(error): Promise<void> {
    if (error === undefined || error.message === '') return;

    // Modals are at the same level as the ion-nav so are not getting the zoom level class,
    // this needs to be passed in the create options.
    const zoomClass = `modal-fullscreen ${this.app.getTextZoomClass()}`;
    const errorModal = this.modalController.create(
      ERROR_PAGE,
      { type: ErrorTypes.SEARCH },
      { cssClass: zoomClass });
    await errorModal.present();
  }

  async showAlert(error: any) {
    const alert = this.alertController.create({
      message: JSON.stringify(error),
      title: 'There was an error getting the delegated examiner booking',
      cssClass: 'confirm-declaration-modal',
      buttons: [
        {
          text: 'OK',
          handler: () => {},
        },
      ],
      enableBackdropDismiss: true,
    });
    await alert.present();
  }

}
