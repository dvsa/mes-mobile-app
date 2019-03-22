import { Component, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
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

  constructor(public hammerProvider : HammerProvider, private renderer: Renderer2) {}

  ngOnInit() : void {
    this.hammerProvider.init(this.button);
    this.hammerProvider.addPressAndHoldEvent(this.recordFault);
  }

  recordFault = (): void => {
    // TODO - Dispatch ADD_FAULT Action Here
    this.faultCount = this.faultCount + 1;
    this.manageClasses();
  }

  manageClasses = (): any => {
    if (this.faultCount > 0) {
      this.renderer.addClass(this.button.nativeElement, 'driving-fault');
      this.renderer.addClass(this.button.nativeElement, 'ripple-effect');
      setTimeout(() => {
        this.renderer.removeClass(this.button.nativeElement, 'ripple-effect');
      },         300);
    }
  }
}
