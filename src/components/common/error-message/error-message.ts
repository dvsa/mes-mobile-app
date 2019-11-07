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
  public redirectLinkText: string;

  @Input()
  returnTo: string;

  @Output()
  exitModal = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    switch (this.returnTo) {
      case ErrorTypes.JOURNAL_REFRESH:
        this.additionalText = additionalText.JOURNAL;
        this.redirectLinkText = this.returnTo;
        break;
      case ErrorTypes.CANDIDATE_DATA_MISSING:
        this.additionalText = null;
        this.redirectLinkText = 'Dashboard';
        break;
      default:
        this.additionalText = additionalText.STANDARD_TEXT;
        this.redirectLinkText = this.returnTo;
    }
  }

  goBack = (): void => {
    this.exitModal.emit();
  }

}
