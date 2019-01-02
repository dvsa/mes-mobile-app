import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { BasePageComponent } from '../../classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import * as journalActions from './journal.actions';
import { StoreModel } from '../../common/store.model';
import { getTestSlots, getError, getIsLoading } from './journal.selector';
import { getJournalState } from './journal.reducer';
import { TestSlot } from './journal.model';
import { MesError } from '../../common/mes-error.model';

interface JournalPageState {
  testSlots$: Observable<TestSlot[]>,
  error$: Observable<MesError>,
  isLoading$: Observable<boolean>,
}

@IonicPage()
@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html'
})

export class JournalPage extends BasePageComponent implements OnInit, OnDestroy {

  pageState: JournalPageState;

  loadingSpinner: any;
  toast: any;
  subscription: Subscription;

  // TODO: Figure out what is the difference between the constructor and the ngOnInit. Also when to use what.

  constructor(
    public navController: NavController,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public navParams: NavParams,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private store: Store<StoreModel>
  ) {
    super(platform, navController, authenticationProvider);

    this.createLoadingSpinner();
  }

  ngOnInit(): void {
    this.store.dispatch(new journalActions.LoadJournal());

    this.pageState = {
      testSlots$: this.store.select(getJournalState).map(getTestSlots),
      error$: this.store.select(getJournalState).map(getError),
      isLoading$: this.store.select(getJournalState).map(getIsLoading),
    };

    const { testSlots$, error$, isLoading$ } = this.pageState;
    // Merge observables into one
    const merged = Observable.merge(
      testSlots$,
      // Run any transformations necessary here
      error$.map(this.showError),
      isLoading$.map(this.handleLoadingSpinner)
    );

    this.subscription = merged.subscribe();
  }

  ngOnDestroy(): void {
    // Using .merge helps with unsubscribing
    this.subscription.unsubscribe();
  }

  handleLoadingSpinner = (isLoading: boolean): void => {
    isLoading ? this.loadingSpinner.present() : this.loadingSpinner.dismiss();
  }

  showError = (error: MesError): void => {
    if (error === undefined || error.message === '') return;
    this.createToast(error.message);
    this.toast.present();
  }

  private createLoadingSpinner = () => {
    this.loadingSpinner = this.loadingController.create({
      spinner: 'circles'
    });
  }

  private createToast = (errorMessage: string) => {
    // This is just a temporary way to display the error

    this.toast = this.toastController.create({
      message: errorMessage,
      position: 'middle',
      dismissOnPageChange: true,
      cssClass: 'toast-message-error',
      duration: 5000
    });
  }
}
