import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { RekeySearchViewDidEnter, SearchBookedTest } from './rekey-search.actions';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { getIsLoading, getHasSearched } from './rekey-search.selector';
import { getRekeySearchState } from './rekey-search.reducer';

interface RekeySearchPageState {
  isLoading$: Observable<boolean>;
  hasSearched$: Observable<boolean>;
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
  searchResults: any[] = [];
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
    this.pageState = {
      isLoading$: this.store$.pipe(
        select(getRekeySearchState),
        map(getIsLoading),
      ),
      hasSearched$: this.store$.pipe(
        select(getRekeySearchState),
        map(getHasSearched),
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

}
