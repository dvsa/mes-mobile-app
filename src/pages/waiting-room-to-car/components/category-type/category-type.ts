import { Component, OnChanges, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Select } from 'ionic-angular';

@Component({
  selector: 'category-type',
  templateUrl: 'category-type.html',
})
export class CategoryTypeComponent implements OnChanges {

  @ViewChild('categorySelect') selectRef: Select;

  @Input()
  formGroup: FormGroup;

  @Input()
  onCloseCategorySelectModal: () => {};

  formControl: FormControl;

  categories: string[] = [
    'AM Moped',
    'A1 Motorcycle',
    'A2 Motorcycle',
    'A Motorcycle'
  ];

  categorySelectOptions: any = {
    cssClass: 'selector-header'
  };

  constructor(
  ) { }

  openCategorySelector() {
    this.selectRef.open();
  }

  closeCategorySelector() {
    this.selectRef.close();
  }

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl({
        value: 'Select cat type..',
        disabled: false,
      },
        // @TODO - MES-4661 add validator to form control
      );
      this.formGroup.addControl('categoryTypeSelectCategory', this.formControl);
    }
    this.formControl.patchValue('Select cat type..');

  }

}
