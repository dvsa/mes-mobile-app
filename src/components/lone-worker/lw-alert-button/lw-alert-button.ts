import { Component, Output, EventEmitter } from '@angular/core';
// import { AlertStatusModel } from '../../alert/alert.model';

@Component({
  selector: 'lw-alert-button',
  templateUrl: 'lw-alert-button.html',
})
export class AlertButtonComponent {

  // @Input()
  // status: AlertStatusModel;

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
