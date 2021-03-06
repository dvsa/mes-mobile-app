import { Component, Input } from '@angular/core';
import { TestStatus } from '../../../modules/tests/test-status/test-status.model';

@Component({
  selector: 'indicators',
  templateUrl: 'indicators.html',
})
export class IndicatorsComponent {

  @Input()
  showExclamationIndicator: boolean;

  @Input()
  testStatus: TestStatus;

  shouldShowExclamationIndicator = (): boolean => {
    return !this.shouldShowGreenTickIndicator() && this.showExclamationIndicator;
  }

  shouldShowGreenTickIndicator = (): boolean => {
    return this.testStatus === TestStatus.Submitted;
  }
}
