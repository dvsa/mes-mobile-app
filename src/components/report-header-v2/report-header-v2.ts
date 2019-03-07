import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TestResultPage } from '../../pages/test-result/test-result';
import { HazardRecorderProvider } from './../../providers/hazard-recorder/hazard-recorder';
import { IJournal } from '../../providers/journal/journal-model';

/**
 * Generated class for the ReportHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

declare let window: any;

@Component({
  selector: 'report-header-v2',
  templateUrl: 'report-header-v2.html'
})
export class ReportHeaderV2Component {
  @Input()
  options;
  @Input()
  slotDetail: IJournal;

  isDButtonPressed = false;
  isSButtonPressed = false;

  defaultOptions: any = {
    undo: true,
    nextPage: TestResultPage,
    trainingMode: false
  };

  constructor(
    private navCtrl: NavController,
    private hazardRecorderProvider: HazardRecorderProvider
  ) {
    this.setDefaultOptions();
  }

  ngAfterViewInit() {
    this.setDefaultOptions();
  }

  setDefaultOptions() {
    if (typeof this.options === 'undefined' || this.options === null) {
      this.options = this.defaultOptions;
    }
  }

  goToTestResultPage() {
    window.UXCam.stopSessionAndUploadData();
    if (this.options.trainingMode) {
      return this.navCtrl.popToRoot();
    }
    this.navCtrl.push(this.options.nextPage, { slotDetail: this.slotDetail });
  }

  dButtonClicked() {
    if (window && window.UXCam) {
      window.UXCam.logEvent('Clicked Danagerous Fault Button');
    }
    this.hazardRecorderProvider.resetHazardRecording();
    if (this.isDButtonPressed) {
      this.isDButtonPressed = false;
      return;
    }

    this.isDButtonPressed = true;
    this.isSButtonPressed = false;

    if (this.hazardRecorderProvider.isRemovingFaultsEnabled) {
      this.hazardRecorderProvider.enableDangerousRemoving(() => (this.isDButtonPressed = false));
    } else {
      this.hazardRecorderProvider.enableDangerousRecording(() => (this.isDButtonPressed = false));
    }
  }

  sButtonClicked() {
    if (window && window.UXCam) {
      window.UXCam.logEvent('Clicked Serious Fault Button');
    }
    this.hazardRecorderProvider.resetHazardRecording();
    if (this.isSButtonPressed) {
      this.isSButtonPressed = false;
      return;
    }

    this.isDButtonPressed = false;
    this.isSButtonPressed = true;

    if (this.hazardRecorderProvider.isRemovingFaultsEnabled) {
      this.hazardRecorderProvider.enableSeriousRemoving(() => (this.isSButtonPressed = false));
    } else {
      this.hazardRecorderProvider.enableSeriousRecording(() => (this.isSButtonPressed = false));
    }
  }
}
