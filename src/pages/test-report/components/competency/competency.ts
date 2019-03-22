import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { HammerProvider } from '../../../../providers/hammer/hammer';

@Component({
  selector: 'competency',
  templateUrl: 'competency.html',
  providers: [HammerProvider],
})
export class CompetencyComponent {

  @Input()
  label: string;

  // TODO - This needs to be gotten from the store
  faultCount: number = 0;

  @ViewChild('competencyButton')
  button: ElementRef;

  constructor(public hammerProvider : HammerProvider) {}

  ngOnInit() : void {
    this.hammerProvider.init(this.button);
    this.hammerProvider.addPressAndHoldEvent(this.recordFault);
  }

  recordFault = (): void => {
    // TODO - Dispatch ADD_FAULT Action Here
    this.faultCount = this.faultCount + 1;
  }

  caculateClass = () : any => {
    if (this.faultCount > 0) {
      return {
        driving_fault : true,
        'cbutton--click': true,
      };
    }

    return {};
  }
}
