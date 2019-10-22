import { Component, Input, OnChanges, Output, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { fromEvent } from 'rxjs/observable/fromEvent';
import {map, distinctUntilChanged, debounceTime} from "rxjs/operators";
import { PassCertificateNumberChanged } from '../../../../../modules/tests/pass-completion/pass-completion.actions';

@Component({
  selector: 'pass-certificate-number',
  templateUrl: 'pass-certificate-number.html',
})
export class PassCertificateNumberComponent implements OnChanges {
  inputSubscriptions: Subscription[] = [];
  @ViewChild('passCertificateNumberInput')
  passCertificateNumberInput: ElementRef;

  @Input()
  form: FormGroup;

  @Output()
  formControl: any;
  store$: any;

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl('', [Validators.required]);
      this.form.addControl('passCertificateNumberCtrl', this.formControl);
    }
  }

  isInvalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

  passCertificateValidation() {
    const ctrlHasErrors = this.form.get('passCertificateNumberCtrl').errors ? true : false;
    return ctrlHasErrors && this.form.get('passCertificateNumberCtrl').dirty;
  }

  ionViewWillEnter(): boolean {
    this.inputSubscriptions = [
      this.inputChangeSubscriptionDispatchingAction(this.passCertificateNumberInput, PassCertificateNumberChanged),
     ];
 
     return true;
   }

   inputChangeSubscriptionDispatchingAction(inputRef: ElementRef, actionType: any): Subscription {
    const changeStream$ = fromEvent(inputRef.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      debounceTime(1000),
      distinctUntilChanged(),
    );
    const subscription = changeStream$
      .subscribe((newVal: string) => this.store$.dispatch(new actionType(newVal)));
    return subscription;
  }
}
