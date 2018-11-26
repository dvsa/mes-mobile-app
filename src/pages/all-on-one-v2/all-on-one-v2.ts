import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { JournalPage } from './../journal/journal';
import { TestSummaryMetadataProvider } from './../../providers/test-summary-metadata/test-summary-metadata';
import { FaultStoreProvider } from '../../providers/fault-store/fault-store';
import { VehicleCheckProvider } from './../../providers/vehicle-check/vehicle-check';
import { IJournal } from '../../providers/journal/journal-model';
import { getFormattedCandidateName } from '../../shared/utils/formatters';
import { HelpTestReportPage } from '../../help/pages/help-test-report/help-test-report';
import { Page } from 'ionic-angular/navigation/nav-util';
import { AnalyticsProvider } from '../../providers/analytics/analytics';

export enum manoeuvre {
  PREFIX = 'manoeuvre',
  CONTROL = 'Ctrl',
  OBSERVATION = 'Obs'
}

@Component({
  selector: 'page-all-on-one-v2',
  templateUrl: 'all-on-one-v2.html'
})
export class AllOnOneV2Page implements AfterViewInit {
  isDButtonPressed = false;
  isSButtonPressed = false;
  isEcoCompleted = false;
  isControlledStopDone = false;
  isShowMeDone = false;
  selectedManoeuvre = '';
  manoeuvreBtns = {
    RR: 'Reverse / Right',
    RPR: 'Reverse Park (Road)',
    RPC: 'Reverse Park (Carpark)',
    FP: 'Forward Park'
  };
  reportHeaderOptions: any;
  trainingMode: boolean = false;

  manoeuvreKeys = [];

  slotDetail: IJournal;

  helpPage: Page = HelpTestReportPage;

  @ViewChild('manoeuvresButton')
  manoeuvresButton;
  @ViewChild('ecoButton')
  ecoButton;
  @ViewChild('etaPhysicalOption')
  etaPhysicalOption;
  @ViewChild('etaVerbalOption')
  etaVerbalOption;
  @ViewChild('ecoControlOption')
  ecoControlOption;
  @ViewChild('ecoPlanningOption')
  ecoPlanningOption;
  @ViewChild('ecoCompletionInput')
  ecoCompletionInput;
  @ViewChild('controlledStopEl')
  controlledStopEl;
  @ViewChild('showMeEl')
  showMeEl;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private faultStore: FaultStoreProvider,
    private menuCtrl: MenuController,
    private summaryMetaDataService: TestSummaryMetadataProvider,
    private vehicleCheckProvider: VehicleCheckProvider,
    public logging: AnalyticsProvider
  ) {
    this.manoeuvreKeys = Object.keys(this.manoeuvreBtns);
    if (this.navParams.get('trainingMode')) {
      this.trainingMode = true;
      this.reportHeaderOptions = {
        nextPage: JournalPage,
        undo: true,
        trainingMode: this.trainingMode
      };
    }
    this.slotDetail = this.navParams.get('slotDetail');
  }

  ngAfterViewInit(): void {
    this.setUpShowMeButton(this.vehicleCheckProvider.getTellMe().faultType);
  }

  ionViewDidEnter() {
    this.menuCtrl.swipeEnable(false);
  }

  ionViewDidLoad() {
    this.logging.setCurrentPage('test page');
  }

  ionViewDidLeave() {
    this.menuCtrl.swipeEnable(true);
  }

  setEco($event: any) {
    this.isEcoCompleted = $event.target.checked;
    if (!this.isEcoCompleted) this.summaryMetaDataService.clearEcoSelections();
    this.summaryMetaDataService.setEcoCompletion(this.isEcoCompleted);
  }

  ecoSelection() {
    // Set eco completion if it is checked
    if (this.ecoCompletionInput.nativeElement.checked) {
      this.isEcoCompleted = true;
      this.summaryMetaDataService.setEcoCompletion(this.isEcoCompleted);
    }
    const arr = [];
    if (this.ecoControlOption.isEnabled) arr.push('Control');
    if (this.ecoPlanningOption.isEnabled) arr.push('Planning');
    arr.forEach((ecoSelection) => this.summaryMetaDataService.setEcoSelection(ecoSelection));
  }

  isEcoComplete() {
    return this.isEcoCompleted;
  }

  createSection(key: string, type: string) {
    return `${manoeuvre.PREFIX}${key}${type}`;
  }

  setPixelVal(setValue, val) {
    return setValue ? `${val}px` : 0;
  }

  isManoeuvreSelected(key) {
    return this.selectedManoeuvre === key;
  }

  // Show me button actions

  setUpShowMeButton(tellMeFault: string) {
    const drivingFaultActions = {
      fault: (el) => el.addDrivingFault(),
      serious: (el) => el.addSeriousFault(),
      dangerous: (el) => el.addDangerousFault()
    };

    if (typeof drivingFaultActions[tellMeFault] === 'function') {
      drivingFaultActions[tellMeFault](this.showMeEl);
    }
  }

  showMePress() {
    if (this.isShowMeDone) return;
    if (this.showMeEl.faultCounter > 0) return;

    const { serious, dangerous } = this.showMeEl;

    if ((serious || dangerous) && this.isShowMeDone) return;

    this.isShowMeDone = !this.isShowMeDone;
    this.summaryMetaDataService.toggleShowMeComplete();
  }

  showMeTap() {
    if (this.isShowMeDone && this.showMeEl.faultCounter > 0) return;

    const { serious, dangerous } = this.showMeEl;

    if ((serious || dangerous) && this.isShowMeDone) return;

    this.isShowMeDone = !this.isShowMeDone;
    this.summaryMetaDataService.toggleShowMeComplete();
  }

  // Controlled stop button actions

  controlledStopPress() {
    if (this.isControlledStopDone) return;
    if (this.controlledStopEl.faultCounter > 0) return;

    const { serious, dangerous } = this.controlledStopEl;

    if ((serious || dangerous) && this.isControlledStopDone) return;

    this.isControlledStopDone = !this.isControlledStopDone;
    this.summaryMetaDataService.toggleControlledStopComplete();
  }

  controlledStopTap() {
    if (this.controlledStopEl.faultCounter > 0) return;

    const { serious, dangerous } = this.controlledStopEl;

    if ((serious || dangerous) && this.isControlledStopDone) return;

    this.isControlledStopDone = !this.isControlledStopDone;
    this.summaryMetaDataService.toggleControlledStopComplete();
  }

  etaClick() {
    this.summaryMetaDataService.updateETA('physical', this.etaPhysicalOption.isEnabled);
    this.summaryMetaDataService.updateETA('verbal', this.etaVerbalOption.isEnabled);
  }

  selectManoeuvre(manoeuvreName: string, $event: any) {
    this.selectedManoeuvre = $event.target.checked ? manoeuvreName : '';
    this.summaryMetaDataService.updateManoeuvre(this.manoeuvreBtns[this.selectedManoeuvre]);

    const filteredManoeuvres =
      this.selectedManoeuvre === ''
        ? this.manoeuvreKeys
        : this.manoeuvreKeys.filter((man) => man !== manoeuvreName);

    filteredManoeuvres.forEach((manName) => {
      this.faultStore.resetFault(`${manoeuvre.PREFIX}${manName}${manoeuvre.CONTROL}`);
      this.faultStore.resetFault(`${manoeuvre.PREFIX}${manName}${manoeuvre.OBSERVATION}`);
    }, this);
  }

  /**
   * Returns concatenated Candidate name for this slot
   */
  getTitle(): string {
    if (this.slotDetail) {
      return `${getFormattedCandidateName(this.slotDetail.candidateName)} - Test Report`;
    }
    return 'Practice Mode - Test Report';
  }
}
