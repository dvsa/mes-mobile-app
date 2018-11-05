import { Component, Input } from '@angular/core';
import { TestResultPage } from '../../pages/test-result/test-result';
import { NavController } from 'ionic-angular';
import { HazardRecorderProvider } from './../../providers/hazard-recorder/hazard-recorder';

/**
 * Generated class for the ReportHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'report-header-v2',
  templateUrl: 'report-header-v2.html'
})
export class ReportHeaderV2Component {
  @Input() options;
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
    if (this.options.trainingMode) {
      return this.navCtrl.popToRoot();
    }
    this.navCtrl.push(this.options.nextPage);
  }

  dButtonClicked() {
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
