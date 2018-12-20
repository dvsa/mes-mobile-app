import { Component, OnInit } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { BasePageComponent } from '../../classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store } from '@ngrx/store';

import * as journalActions from '../../store/journal/journal.actions';
import { StoreModel } from '../../store/store.model';

@IonicPage()
@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html'
})

export class JournalPage extends BasePageComponent implements OnInit {

  public journalSlot: any;

  hasError: boolean = false;

  loader: any = this.loadingController.create({
    spinner: 'circles'
  });

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

    store.select(state => state.journal).subscribe(journal => journal.isLoading ? this.loader.present() : this.loader.dismiss());
    store.select(state => state.journal.testSlot).subscribe(testSlot => this.journalSlot = testSlot);
    store.select(state => state.journal.error).subscribe(error => error.message ? this.showError(error.message) : this.hasError = false);
  }

  ngOnInit() {
    this.store.dispatch(new journalActions.LoadJournal());
  }

  showError(errorMessage: string): void {
    this.hasError = true;
    const toast: any = this.toastController.create({
      message: errorMessage,
      position: 'middle',
      dismissOnPageChange: true,
      cssClass: 'toast-message-error',
      duration: 5000
    });
    toast.present();
  }
}
