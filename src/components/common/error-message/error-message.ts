import { ErrorTypes } from '../../../shared/models/error-message';
import { Component, Output, EventEmitter, Input } from '@angular/core';

enum additionalText {
  JOURNAL = 'and try again later.',
  STANDARD_TEXT = 'and try again.',
}

@Component({
  selector: 'error-message',
  templateUrl: 'error-message.html',
})
export class ErrorMessageComponent {

  public additionalText: string;
  @Input() returnTo: string;

  @Output() exitModal = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    this.additionalText = (this.returnTo === ErrorTypes.JOURNAL_REFRESH)
      ? additionalText.JOURNAL : additionalText.STANDARD_TEXT;
  }

  goBack = (): void => {
    this.exitModal.emit();
  }

}
