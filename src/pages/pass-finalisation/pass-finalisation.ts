import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import {
  PassFinalisationViewDidEnter,
  PassCertificateNumberChanged,
} from './pass-finalisation.actions';
import { getPassCompletion } from './pass-finalisation.reducer';
import {
  getPassCertificateNumber,
} from './pass-finalisation.selector';
import { Observable } from 'rxjs/Observable';
import { getCandidate } from '../../modules/tests/candidate/candidate.reducer';
import {
  getCandidateName, getCandidateDriverNumber, formatDriverNumber, getUntitledCandidateName,
} from '../../modules/tests/candidate/candidate.selector';
import { getApplicationReference } from '../../modules/tests/application-reference/application-reference.reducer';
import {
  getApplicationNumber,
} from '../../modules/tests/application-reference/application-reference.selector';
import { getCurrentTest } from '../../modules/tests/tests.selector';
import { map, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { fromEvent } from 'rxjs/Observable/fromEvent';

interface PassFinalisationPageState {
  candidateName$: Observable<string>;
  candidateUntitledName$: Observable<string>;
  candidateDriverNumber$: Observable<string>;
  applicationNumber$: Observable<string>;
  passCertificateNumber$: Observable<string>;
}

@IonicPage()
@Component({
  selector: 'page-pass-finalisation',
  templateUrl: 'pass-finalisation.html',
})
export class PassFinalisationPage extends BasePageComponent {
  pageState: PassFinalisationPageState;

  @ViewChild('passCertificateNumberInput')
  passCertificateNumberInput: ElementRef;

  inputSubscriptions: Subscription[] = [];

  constructor(
    private store$: Store<StoreModel>,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
  ) {
    super(platform, navCtrl, authenticationProvider);
  }

  ngOnInit(): void {
    this.pageState = {
      candidateName$: this.store$.pipe(
        select(getCurrentTest),
        select(getCandidate),
        select(getCandidateName),
      ),
      candidateUntitledName$: this.store$.pipe(
        select(getCurrentTest),
        select(getCandidate),
        select(getUntitledCandidateName),
      ),
      candidateDriverNumber$: this.store$.pipe(
        select(getCurrentTest),
        select(getCandidate),
        select(getCandidateDriverNumber),
        map(formatDriverNumber),
      ),
      applicationNumber$: this.store$.pipe(
        select(getCurrentTest),
        select(getApplicationReference),
        select(getApplicationNumber),
      ),
      passCertificateNumber$: this.store$.pipe(
        select(getCurrentTest),
        select(getPassCompletion),
        select(getPassCertificateNumber),
      ),
    };
    this.inputSubscriptions = [
      fromEvent(this.passCertificateNumberInput.nativeElement, 'keyup').pipe(
        map((event: any) => event.target.value),
        debounceTime(1000),
        distinctUntilChanged(),
      ).subscribe((certNumber: string) => this.store$.dispatch(new PassCertificateNumberChanged(certNumber))),
    ];
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new PassFinalisationViewDidEnter());
  }

}
