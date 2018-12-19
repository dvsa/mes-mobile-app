import { Component, OnInit } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store } from '@ngrx/store';

import * as journalActions from '../../store/journal.actions';

interface StoreModel {
  journal: {
    isLoading: boolean,
    testSlot: any,
    error: any
  }
}

@IonicPage()
@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html'
})

export class JournalPage extends BasePageComponent implements OnInit {

  public journalSlot: any;

  errorText: string = '';

  loader: any = this.loadingController.create({
    spinner: 'circles'
  });

  constructor(
    public navController: NavController,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public navParams: NavParams,
    public loadingController: LoadingController,
    private store: Store<StoreModel>
  ) {
    super(platform, navController, authenticationProvider);

    store.select(state => state.journal).subscribe(journal => journal.isLoading ? this.loader.present() : this.loader.dismiss());
    store.select(state => state.journal.testSlot).subscribe(testSlot => this.journalSlot = testSlot);
    store.select(state => state.journal.error).subscribe(error => this.errorText = error.message);
  }

  ngOnInit() {
    this.store.dispatch(new journalActions.LoadJournal());
  }
}
