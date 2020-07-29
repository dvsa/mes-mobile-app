import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

enum DeclarationSigned {
  YES = 'Y',
  NO = 'N',
}

@Component({
  selector: 'candidate-declaration-signed',
  templateUrl: 'candidate-declaration.html',
})
export class CandidateDeclarationSignedComponent {

  @Input()
  declarationSelected: boolean;

  @Input()
  candidateSigned: boolean;

  @Input()
  formGroup: FormGroup;

  formControl: FormControl;

  @Output()
  candidateDeclarationChange = new EventEmitter<boolean>();

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl('', [Validators.required]);
      this.formGroup.addControl('candidateDeclarationCtrl', this.formControl);
    }
    this.formControl.patchValue(this.declarationSelected);
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

  candidateDeclarationChanged(declarationSelected: string): void {
    this.candidateDeclarationChange.emit(declarationSelected === DeclarationSigned.YES);
  }

}
