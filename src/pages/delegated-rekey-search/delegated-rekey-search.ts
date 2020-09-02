import { Subscription, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, ModalController } from 'ionic-angular';
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
  }
  ionViewDidEnter() {
    this.store$.dispatch(new DelegatedRekeySearchViewDidEnter());
    this.setUpSubscription();
  }

  setUpSubscription() {
    this.subscription = this.pageState.rekeySearchErr$.subscribe((error) => {
      if (!this.hasBookingAlreadyBeenCompleted(error) && this.pageState.hasSearched$) {
        this.showError(error);
      }
    });
  }

  ionViewDidLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  applicationReferenceChanged(val: string) {
    this.applicationReference = val;
  }

  invalid(): boolean {
    const returnValue =  this.applicationReference.length < 11 ? true : false;
    console.log(returnValue);
    return returnValue;
  }

  searchTests() {
    this.store$.dispatch(new SearchBookedDelegatedTest(this.applicationReference));
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

}
