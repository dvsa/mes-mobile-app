import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'license-provided',
  templateUrl: 'license-provided.html'
})

export class LicenseProvidedComponent implements OnChanges{

  @Input()
  lisenceRecievedRadioChecked: boolean;

  @Input()
  lisenceNotRecievedRadioChecked: boolean;

  @Input()
  formGroup: FormGroup;

  @Output()
  provisionalLisenceRecievedChange = new EventEmitter<boolean>();
  formControl: any;

  ngOnChanges(): void {
    if(!this.formControl) {
      this.formControl = new FormControl('', [Validators.required]);
      this.formGroup.addControl('provisionalLicenseProvidedCtrl', this.formControl);
    }
    this.formControl.patchValue(this.lisenceRecievedRadioChecked);
    }

    provisionalLicenseReceivedChanged(): void {
      if(this.formControl.valid) {
        this.provisionalLisenceRecievedChange.emit();
      }
    }

    get invalid(): boolean {
      return !this.formControl.valid && this.formControl.dirty;
    }

    get lisenceRecieved(): boolean {
      return this.lisenceRecievedRadioChecked;
    }

    get lisenceNotRecieved(): boolean {
      return this.lisenceNotRecievedRadioChecked;
    }
  }
