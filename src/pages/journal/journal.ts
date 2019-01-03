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
import { ExaminerWorkSchedule } from '../../common/domain/Journal';
import { MesError } from '../../common/mes-error.model';

interface JournalPageState {
  testSlots$: Observable<ExaminerWorkSchedule[]>,
  error$: Observable<MesError>,
  isLoading$: Observable<boolean>,

  hasLoaded: boolean,
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
  }

  ngOnInit(): void {
    this.store.dispatch(new journalActions.LoadJournal());

    this.pageState = {
      testSlots$: this.store.select(getJournalState).map(getTestSlots),
      error$: this.store.select(getJournalState).map(getError),
      isLoading$: this.store.select(getJournalState).map(getIsLoading),
      hasLoaded: true,
    };

    const { testSlots$, error$, isLoading$ } = this.pageState;
    // Merge observables into one
    const merged = Observable.merge(
      testSlots$,
      // Run any transformations necessary here
      error$.map(this.showError),
      isLoading$
    );

    this.subscription = merged.subscribe();
  }

  ngOnDestroy(): void {
    // Using .merge helps with unsubscribing
    this.subscription.unsubscribe();
  }

  handleLoadingSpinner = (isLoading: boolean): void => {
    if (isLoading) {
      this.createLoadingSpinner();
      this.loadingSpinner.present().then(() => this.loadingSpinner.dismiss());
    }
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
      cssClass: 'mes-toast-message-error',
      duration: 5000
    });
  }
}
