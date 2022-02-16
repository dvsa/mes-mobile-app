import { Subscription, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { RekeySearchViewDidEnter, SearchBookedTest, RekeySearchClearState } from './rekey-search.actions';
import { map } from 'rxjs/operators';
import {
  getIsLoading,
  getHasSearched,
  getBookedTestSlot,
  getRekeySearchError,
  getSlotAccessed,
} from './rekey-search.selector';
import { getRekeySearchState } from './rekey-search.reducer';
import { TestSlot } from '@dvsa/mes-journal-schema';
import { isEmpty } from 'lodash';
import { RekeySearchError, RekeySearchErrorMessages } from './rekey-search-error-model';
import { HttpErrorResponse } from '@angular/common/http';

interface RekeySearchPageState {
  isLoading$: Observable<boolean>;
  hasSearched$: Observable<boolean>;
  bookedTestSlot$: Observable<TestSlot>;
  accessedSlot$: Observable<boolean>;
  rekeySearchErr$: Observable<RekeySearchError | HttpErrorResponse>;
}

@IonicPage()
@Component({
  selector: 'page-rekey-search',
  templateUrl: 'rekey-search.html',
})
export class RekeySearchPage extends BasePageComponent implements OnInit {

  pageState: RekeySearchPageState;

  staffNumber: string = '';
  applicationReference: string = '';
  searchResults: TestSlot[] = [];
  subscription: Subscription = Subscription.EMPTY;

  constructor(
    public viewController: ViewController,
    public navController: NavController,
    public platform: Platform,
    public navParams: NavParams,
    public authenticationProvider: AuthenticationProvider,
    private store$: Store<StoreModel>,
  ) {
    super(platform, navController, authenticationProvider);
  }

  ngOnInit(): void {
    this.store$.dispatch(new RekeySearchClearState());
    const rekeySearch$ = this.store$.pipe(
      select(getRekeySearchState),
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
      accessedSlot$: rekeySearch$.pipe(
        select(getSlotAccessed),
      ),
      rekeySearchErr$: rekeySearch$.pipe(
        map(getRekeySearchError),
      ),
    };
  }

  ionViewDidEnter() {
    this.store$.dispatch(new RekeySearchViewDidEnter());
  }

  ionViewDidLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  staffNumberChanged(val: string) {
    this.staffNumber = val;
  }

  applicationReferenceChanged(val: string) {
    this.applicationReference = val;
  }

  searchTests() {
    this.store$.dispatch(new SearchBookedTest(this.applicationReference, this.staffNumber));
  }

  isBookedTestSlotEmpty(bookedTestsSlot: TestSlot) {
    return isEmpty(bookedTestsSlot);
  }

  hasBookingAlreadyBeenCompleted(rekeySearchErr: HttpErrorResponse | RekeySearchError) {
    return rekeySearchErr.message === RekeySearchErrorMessages.BookingAlreadyCompleted;
  }

}
