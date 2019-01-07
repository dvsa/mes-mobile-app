import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, Platform, ToastController, Loading, Toast, Refresher } from 'ionic-angular';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ExaminerWorkSchedule } from '../../common/domain/DJournal';
import { BasePageComponent } from '../../classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import * as journalActions from './journal.actions';
import { StoreModel } from '../../common/store.model';
import { getTestSlots, getError, getIsLoading } from './journal.selector';
import { getJournalState } from './journal.reducer';
import { MesError } from '../../common/mes-error.model';
import { map } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { SlotSelectorProvider } from '../../providers/slot-selector/slot-selector';
import { SlotComponent } from './components/slot/slot';

interface JournalPageState {
  testSlots$: Observable<ExaminerWorkSchedule[]>,
  error$: Observable<MesError>,
  isLoading$: Observable<boolean>,
}

@IonicPage()
@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html'
})

export class JournalPage extends BasePageComponent implements OnInit, OnDestroy {

  @ViewChild('slotContainer', { read: ViewContainerRef }) slotContainer;

  pageState: JournalPageState;

  loadingSpinner: Loading;
  pageRefresher: Refresher;

  toast: Toast;
  subscription: Subscription;
  start = '2018-12-10T08:10:00+00:00';

  constructor(
    public navController: NavController,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    public navParams: NavParams,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private store$: Store<StoreModel>,
    private slotSelector: SlotSelectorProvider,
    private resolver: ComponentFactoryResolver
  ) {
    super(platform, navController, authenticationProvider);
  }

  ngOnInit(): void {
    this.loadJournal();

    this.pageState = {
      testSlots$: this.store$.pipe(
        select(getJournalState),
        map(getTestSlots)
      ),
      error$: this.store$.pipe(
        select(getJournalState),
        map(getError)
      ),
      isLoading$: this.store$.pipe(
        select(getJournalState),
        map(getIsLoading)
      )
    };

    const { testSlots$, error$, isLoading$ } = this.pageState;
    // Merge observables into one
    const merged$ = merge(
      testSlots$,
      // Run any transformations necessary here
      error$.pipe(map(this.showError)),
      isLoading$.pipe(map(this.handleLoadingUI))
    );
    this.subscription = merged$.subscribe(this.createSlots);
  }

  ngOnDestroy(): void {
    // Using .merge helps with unsubscribing
    this.subscription.unsubscribe();
  }

  loadJournal() {
    this.store$.dispatch(new journalActions.LoadJournal());
    this.createLoadingSpinner();
  }

  handleLoadingUI = (isLoading: boolean): void => {
    if (!isLoading) {
      this.pageRefresher ? this.pageRefresher.complete() : null;
      if (this.loadingSpinner) {
        this.loadingSpinner.dismiss();
        this.loadingSpinner = null;
      }
    }
  };

  showError = (error: MesError): void => {
    if (error === undefined || error.message === '') return;
    this.createToast(error.message);
    this.toast.present();
  };

  private createSlots = (slotData: any) => {
    if (slotData) {
      // Clear any dynamically created slots before adding the latest
      this.slotContainer.clear();
      const slots = this.slotSelector.getSlotTypes(slotData);
      for (const slot of slots) {
        const factory = this.resolver.resolveComponentFactory(slot.component);
        const componentRef = this.slotContainer.createComponent(factory);
        (<SlotComponent>componentRef.instance).slot = slot.slotData;
      }
    }
  }

  private createLoadingSpinner = () => {
    this.loadingSpinner = this.loadingController.create({
      dismissOnPageChange: true,
      spinner: 'circles'
    });
    this.loadingSpinner.present();
  };

  private createToast = (errorMessage: string) => {
    // This is just a temporary way to display the error

    this.toast = this.toastController.create({
      message: errorMessage,
      position: 'middle',
      dismissOnPageChange: true,
      cssClass: 'mes-toast-message-error',
      duration: 5000
    });

  };

  public pullRefreshJournal = (refresher: Refresher) => {
    this.loadJournal();
    this.pageRefresher = refresher;
  };

  public refreshJournal = () => {
    this.loadJournal();
  };

  gotoWaitingRoom($event) {
    console.log('going to waiting room with ', $event);
  }

}
