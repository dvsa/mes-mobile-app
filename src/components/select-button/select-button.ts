import { Component, Input, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import {
  ControlValueAccessor,
  Validator,
  AbstractControl,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS
} from '@angular/forms';

@Component({
  selector: 'select-button',
  templateUrl: 'select-button.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectButtonComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SelectButtonComponent),
      multi: true
    }
  ]
})
export class SelectButtonComponent implements ControlValueAccessor, Validator, OnChanges {
  @Input() selectedText: string;
  @Input() onClickEventHandler: () => void;

  constructor() {}

  private propagateChange = (_: any) => {};

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.selectedText &&
      changes.selectedText.previousValue !== changes.selectedText.currentValue
    ) {
      this.propagateChange(this.selectedText);
    }
  }

  validate(c: AbstractControl): { [key: string]: any } {
    return this.selectedText
      ? null
      : {
          noSelectedText: {
            valid: false
          }
        };
  }

  writeValue(obj: any): void {
    this.selectedText = obj;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {}
}
