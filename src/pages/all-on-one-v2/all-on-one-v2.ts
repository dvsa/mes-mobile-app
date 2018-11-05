import { JournalPage } from './../journal/journal';
import { TestSummaryMetadataProvider } from './../../providers/test-summary-metadata/test-summary-metadata';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { FaultStoreProvider } from '../../providers/fault-store/fault-store';

/**
 * Generated class for the AllOnOneV2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export enum manoeuvre {
  PREFIX = 'manoeuvre',
  CONTROL = 'Ctrl',
  OBSERVATION = 'Obs'
}

@Component({
  selector: 'page-all-on-one-v2',
  templateUrl: 'all-on-one-v2.html'
})
export class AllOnOneV2Page {
  isDButtonPressed = false;
  isSButtonPressed = false;
  isEcoCompleted = false;
  isControlledStopDone = false;
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

  @ViewChild('manoeuvresButton') manoeuvresButton;
  @ViewChild('ecoButton') ecoButton;
  @ViewChild('etaPhysicalOption') etaPhysicalOption;
  @ViewChild('etaVerbalOption') etaVerbalOption;
  @ViewChild('ecoControlOption') ecoControlOption;
  @ViewChild('ecoPlanningOption') ecoPlanningOption;
  @ViewChild('ecoCompletionInput') ecoCompletionInput;
  @ViewChild('controlledStopEl') controlledStopEl;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private faultStore: FaultStoreProvider,
    private menuCtrl: MenuController,
    private summaryMetaDataService: TestSummaryMetadataProvider
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
  }

  ionViewDidEnter() {
    this.menuCtrl.swipeEnable(false);
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

  controlledStopTap() {
    if (this.controlledStopEl.faultCounter > 0) return;
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
}
