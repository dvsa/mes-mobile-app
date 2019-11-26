import { Component, Input } from '@angular/core';

@Component({
  selector: 'competency-button',
  templateUrl: 'competency-button.html',
})
export class CompetencyButtonComponent {

  @Input()
  onPress?: Function;

  @Input()
  onTap?: Function;

  @Input()
  ripple?: boolean = true;

  touchState: boolean = false;
  touchStateDelay: number = 100;
  touchTimeout: any;

  rippleState: boolean = false;
  rippleEffectAnimationDuration: number = 300;
  rippleTimeout: any;

  constructor() { }

  onTapEvent(): void {
    if (this.onTap) {
      this.onTap();
    }
  }

  onPressEvent(): void {
    if (this.onPress) {
      this.onPress();
    }
    if (this.ripple) {
      this.applyRippleEffect();
    }
  }

  applyRippleEffect = (): any => {
    this.rippleState = true;
    this.rippleTimeout = setTimeout(() => this.removeRippleEffect(), this.rippleEffectAnimationDuration);
  }

  removeRippleEffect = (): any => {
    this.rippleState = false;
    clearTimeout(this.rippleTimeout);
  }

  onTouchStart(): void {
    clearTimeout(this.touchTimeout);
    this.touchState = true;
  }

  onTouchEnd(): void {
    // defer the removal of the touch state to allow the page to render
    this.touchTimeout = setTimeout(() => this.touchState = false, this.touchStateDelay);
  }
}
