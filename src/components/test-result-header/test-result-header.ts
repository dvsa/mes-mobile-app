import { Component, Input } from '@angular/core';
import { upperFirst } from 'lodash';

@Component({
  selector: 'test-result-header',
  templateUrl: 'test-result-header.html'
})
export class TestResultHeaderComponent {
  @Input()
  summaryMetadata: any;

  etas: string[];

  constructor() {}

  ngOnInit() {
    this.formatEtas();
    this.formatEcoSelections();
  }

  formatEtas() {
    this.etas = Object.keys(this.summaryMetadata.eta)
      .filter((action: string) => this.summaryMetadata.eta[action])
      .map((action: string) => upperFirst(action));
  }

  formatEcoSelections() {
    this.summaryMetadata.eco.selections.forEach(
      (selection: string, index: number) =>
        (this.summaryMetadata.eco.selections[index] = upperFirst(selection))
    );
  }

  isNotLastEtaAction(index: number) {
    return this.etas.length > 1 && index !== this.etas.length - 1;
  }
}
