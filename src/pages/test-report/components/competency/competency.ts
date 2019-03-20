import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { HammerJsProvider } from '../../../../providers/hammer/hammer';

@Component({
  selector: 'competency',
  templateUrl: 'competency.html',
})
export class CompetencyComponent {

  @Input()
  label: string;

  @ViewChild('competencyButton')
  button: ElementRef;

  hammerManager : any;

  constructor(private hammerJsProvider: HammerJsProvider) {}

  ngOnInit() {
    this.hammerJsProvider.init(this.button, this.recordFault);
  }

  recordFault() {
    console.log('I AM RECORDING A FAULT');
  }

}
