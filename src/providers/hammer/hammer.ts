import { Injectable, ElementRef } from '@angular/core';

declare const Hammer: any;

@Injectable()
export class HammerJsProvider {

  private hammerManager: any;

  constructor() {}

  init(element: ElementRef, action: Function) {
    this.hammerManager = new Hammer.Manager(element.nativeElement);
    this.hammerManager.add(new Hammer.Press({
      time: 300,
    }));
    this.hammerManager.on('press', action);
  }
}
