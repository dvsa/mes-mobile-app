import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'error-message',
  templateUrl: 'error-message.html',
})
export class ErrorMessageComponent {

  @Input() returnTo: string;
  @Input() showAdditionalText: boolean;

  @Output() exitModal = new EventEmitter<string>();

  constructor() { }

  goBack = (): void => {
    this.exitModal.emit();
  }

}
