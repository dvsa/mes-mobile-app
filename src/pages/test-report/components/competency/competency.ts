import { Component, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { HammerProvider } from '../../../../providers/hammer/hammer';

enum CssClassesEnum {
  DRIVING_FAULT = 'driving-fault',
  RIPPLE_EFFECT = 'ripple-effect',
}

@Component({
  selector: 'competency',
  templateUrl: 'competency.html',
  providers: [HammerProvider],
})
export class CompetencyComponent {

  @Input() label: string;
  rippleEffectAnimationDuration: number = 300;
  // TODO - This needs to be gotten from the store
  faultCount: number = 0;

  @ViewChild('competencyButton')
  button: ElementRef;

  constructor(public hammerProvider : HammerProvider, private renderer: Renderer2) {}

  ngOnInit() : void {
    this.hammerProvider.init(this.button);
    this.hammerProvider.addPressAndHoldEvent(this.recordFault);
  }
  /**
   * Increments the fault count of the competency
   * @returns void
   */
  recordFault = (): void => {
    // TODO - Dispatch ADD_FAULT Action Here
    this.faultCount = this.faultCount + 1;
    this.manageClasses();
  }
  /**
   * Manages the addition and removal of the ripple effect animation css class
   * @returns any
   */
  manageClasses = (): any => {
    if (this.faultCount > 0) {
      this.renderer.addClass(this.button.nativeElement, CssClassesEnum.DRIVING_FAULT);
      this.renderer.addClass(this.button.nativeElement, CssClassesEnum.RIPPLE_EFFECT);
      setTimeout(() => this.renderer.removeClass(this.button.nativeElement, CssClassesEnum.RIPPLE_EFFECT),
                 this.rippleEffectAnimationDuration,
      );
    }
  }
}
