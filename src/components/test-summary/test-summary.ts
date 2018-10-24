import { Component, Input } from '@angular/core';
import { IFaultSummary } from './interfaces/IFaultSummary';
import { upperFirst } from 'lodash';

@Component({
  selector: 'test-summary',
  templateUrl: 'test-summary.html'
})
export class TestSummaryComponent {
  @Input() faultSummaries: { [key: string]: IFaultSummary };
  @Input() testResult: string;
  @Input() summaryMetadata: any;
  drivingFaultSummary: IFaultSummary;
  seriousFaultSummary: IFaultSummary;
  dangerousFaultSummary: IFaultSummary;
  etas: string[];

  constructor() {}

  ngOnInit() {
    this.drivingFaultSummary = this.faultSummaries.drivingFaultSummary;
    this.seriousFaultSummary = this.faultSummaries.seriousFaultSummary;
    this.dangerousFaultSummary = this.faultSummaries.dangerousFaultSummary;
    // Format ETAs
    this.etas = Object.keys(this.summaryMetadata.eta).filter(
      (action: string) => (this.summaryMetadata.eta[action] ? action : '')
    );
    this.etas.forEach(
      (action: string, index: number) => (this.etas[index] = action.charAt(0).toUpperCase())
    );
    // Format ECO selections
    this.summaryMetadata.eco.selections.forEach(
      (selection: string, index: number) =>
        (this.summaryMetadata.eco.selections[index] = upperFirst(selection))
    );
  }
}
