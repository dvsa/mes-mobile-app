import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'provided-email',
  templateUrl: 'provided-email.html',
})
export class ProvidedEmailComponent {

  readonly providedEmail = 'providedEmail';
  @Input()
  providedEmailAddress: string;

  @Input()
  shouldRender: boolean;

  @Input()
  providedEmailAddressChosen: boolean;

  @Output()
  providedEmailRadioSelect = new EventEmitter<string>();

  providedEmailRadioSelected() {
    this.providedEmailRadioSelect.emit(this.providedEmail);
  }
}
