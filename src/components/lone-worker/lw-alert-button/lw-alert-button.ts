import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AlertStatusModel } from '../lw-store/alert/alert.model';

export enum Severity {
  Red = 'Red',
  Amber = 'Amber',
}

@Component({
  selector: 'lw-alert-button',
  templateUrl: 'lw-alert-button.html',
})
export class LWAlertButtonComponent {
  @Input()
  status: AlertStatusModel;

  @Output()
  start: EventEmitter<any> = new EventEmitter();

  @Output()
  stop: EventEmitter<any> = new EventEmitter();

  onTouch(): void {
    console.log('on touch has been triggered');
    this.start.emit();
  }

  onTouchLeave(): void {
    console.log('on touch leave has been triggered');
    this.stop.emit();
  }

}
