import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RaisedAlertStatusModel } from '../../store/raised-alert/raised-alert.model';

export enum Severity {
  Red = 'Red',
  Amber = 'Amber',
}

@Component({
  selector: 'lw-alert-button',
  templateUrl: 'alert-button.component.html',
})
export class RaiseAlertButtonComponent {
  @Input()
  status: RaisedAlertStatusModel;

  @Output()
  start: EventEmitter<any> = new EventEmitter();

  @Output()
  stop: EventEmitter<any> = new EventEmitter();

  onTouch(): void {
    this.start.emit();
  }

  onTouchLeave(): void {
    this.stop.emit();
  }

}
