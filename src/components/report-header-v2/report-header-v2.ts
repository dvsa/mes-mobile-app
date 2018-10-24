import { Component, Input } from '@angular/core';
import { TestResultPage } from '../../pages/test-result/test-result';
import { NavController } from 'ionic-angular';

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

  defaultOptions: any = {
    undo: true,
    nextPage: TestResultPage,
    trainingMode: false
  };

  constructor(private navCtrl: NavController) {
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
}
