import { Component, OnInit } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { BasePageComponent } from '../../classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import * as journalActions from '../../store/journal/journal.actions';
import { StoreModel } from '../../store/store.model';
import { getTestSlots, getError, getIsLoading } from '../../store/journal/journal.selector';
import { getJournalState } from '../../store/journal/journal.reducer';
import { TestSlot, MesError } from '../../store/journal/journal.model';

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

export class JournalPage extends BasePageComponent implements OnInit {

  pageState: JournalPageState;

  loadingSpinner: any;
  toast: any;

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
    this.createToast('just a text');
  }

  ngOnInit() {
    this.store.dispatch(new journalActions.LoadJournal());
    this.pageState = {
      testSlots$: this.store.select(getJournalState).map(getTestSlots),
      error$: this.store.select(getJournalState).map(getError),
      isLoading$: this.store.select(getJournalState).map(getIsLoading),
    };
    this.pageState.isLoading$.subscribe(isLoading => isLoading ? this.loadingSpinner.present() : this.loadingSpinner.dismiss());
    this.pageState.error$.subscribe(error => this.showError(error));
  }

  showError(error): void {
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
    this.toast = this.toastController.create({
      message: errorMessage,
      position: 'middle',
      dismissOnPageChange: true,
      cssClass: 'toast-message-error',
      duration: 5000
    });
  }
}
