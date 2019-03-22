import { Injectable, ElementRef } from '@angular/core';

declare const Hammer: any;

@Injectable()
export class HammerProvider {

  hammerManager: any ;
  pressTime: number = 300;

  constructor() {}

  init = (element: ElementRef): void =>
    this.hammerManager = new Hammer.Manager(element.nativeElement)

  addPressAndHoldEvent = (action: Function): void => {
    this.hammerManager.add(new Hammer.Press({
      event: 'pressAndHold',
      time: this.pressTime,
    }));

    this.hammerManager.on('pressAndHold', () => action());
  }

  addPressEvent = (action: Function): void => {
    this.hammerManager.add(new Hammer.Press({
      event: 'press',
      time: 1,
    }));

    this.hammerManager.on('press', () => action());
  }

}
