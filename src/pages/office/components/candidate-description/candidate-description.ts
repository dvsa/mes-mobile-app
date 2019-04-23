import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'candidate-description',
  templateUrl: 'candidate-description.html',
})
export class CandidateDescriptionComponent implements OnChanges {

  @Input()
  candidateDescription: string;

  @Input()
  formGroup: FormGroup;

  @Output()
  candidateDescriptionChange = new EventEmitter<string>();

  private formControl: FormControl;

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl(null, [Validators.required]);
      this.formGroup.addControl('candidateDescription', this.formControl);
    }
    this.formControl.patchValue(this.candidateDescription);
  }

  candidateDescriptionChanged(candidateDescription: string): void {
    if (this.formControl.valid) {
      this.candidateDescriptionChange.emit(candidateDescription);
    }
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

}
