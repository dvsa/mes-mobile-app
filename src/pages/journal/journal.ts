import { VehicleCheckProvider, vCheckType } from './../../providers/vehicle-check/vehicle-check';
import { AllOnOneV2Page } from './../all-on-one-v2/all-on-one-v2';
import { TestSummaryMetadataProvider } from './../../providers/test-summary-metadata/test-summary-metadata';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CandidateInfoPage } from '../candidate-info/candidate-info';
import { Page } from 'ionic-angular/navigation/nav-util';
import { JournalProvider } from '../../providers/journal/journal';
import { IJournal } from '../../providers/journal/journal-model';
import { FaultStoreProvider } from '../../providers/fault-store/fault-store';
import { DeclarationConsentPage } from '../declaration-consent/declaration-consent';

@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html'
})
export class JournalPage {
  journalSlots: IJournal[];
  candidateInfoPage: Page = CandidateInfoPage;
  declarationConsentPage: Page = DeclarationConsentPage;
  allonOneV2Page: Page = AllOnOneV2Page;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private journalProvider: JournalProvider,
    private faultStore: FaultStoreProvider,
    private summaryMetadata: TestSummaryMetadataProvider,
    private vcProvider: VehicleCheckProvider
  ) {}

  ionViewDidLoad() {
    this.journalProvider.getData('test@test.com').subscribe((data) => {
      this.journalSlots = data;
    });

    this.faultStore.reset();
  }

  ionViewDidEnter() {
    this.faultStore.reset();
    this.summaryMetadata.reset();
  }

  extractCategoryCode(slotType: string) {
    // slotType comes from the vehicleSlotType key in the journal data
    // Examples of slotType parameter: 'B57mins' / 'Voc90mins'
    if (slotType === null) return 'N/A';
    const re = /^[a-zA-Z]*/;
    return slotType.match(re);
  }

  hasFailed(slot) {
    return slot.details && !slot.details.success;
  }

  hasPassed(slot) {
    return slot.details && slot.details.success;
  }

  requiresCheck(slot) {
    return slot.checkMarker;
  }

  goToCandidateInfo() {
    return this.navCtrl.push(CandidateInfoPage);
  }

  skipToDL25() {
    this.vcProvider.markAsComplete({ id: 'foo' }, vCheckType.TELLME);
    return this.navCtrl.push(this.allonOneV2Page, {
      trainingMode: true
    });
  }
}
