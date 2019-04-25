import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'additional-information',
  templateUrl: 'additional-information.html',
})
export class AdditionalInformationComponent implements OnChanges {

  @Input()
  additionalInformation: string;

  @Input()
  formGroup: FormGroup;

  @Output()
  additionalInformationChange = new EventEmitter<string>();

  private formControl: FormControl;

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl(null);
      this.formGroup.addControl('additionalInformation', this.formControl);
    }
    this.formControl.patchValue(this.additionalInformation);
  }

  additionalInformationChanged(additionalInformation: string): void {
    this.additionalInformationChange.emit(additionalInformation);
  }

}
