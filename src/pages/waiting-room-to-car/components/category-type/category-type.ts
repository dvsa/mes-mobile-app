import { Component, OnChanges, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Select } from 'ionic-angular';
import { BikeCategoryDetailProvider } from '../../../../providers/bike-category-detail/bike-category-detail';
import { BikeCategoryDetail } from '../../../../providers/bike-category-detail/bike-category-detail.model';
import { CategoryCode } from '@dvsa/mes-test-schema/categories/common';

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

  @Input()
  testCategory: CategoryCode;

  @Output()
  categoryCodeChange = new EventEmitter<CategoryCode>();

  formControl: FormControl;

  bikeCategoryDetails: BikeCategoryDetail[];

  categorySelectOptions: any = {
    cssClass: 'selector-header',
  };

  constructor(
    private bikeCategoryDetailProvider: BikeCategoryDetailProvider,
  ) { }

  openCategorySelector() {
    this.loadImages();
    this.selectRef.open();
  }

  closeCategorySelector() {
    this.selectRef.close();
  }

  loadImages() {
    setTimeout(() =>  {
      const options = document.getElementsByClassName('alert-radio-label');
      for (let index = 0; index < options.length; index++) {
        const element = options[index];
        const category = this.bikeCategoryDetails[index].categoryCode;
        const bike = this.bikeCategoryDetailProvider.getDetailByCategoryCode(category);
        element.innerHTML = `<span class="bike-code">${element.innerHTML}</span>`
          .concat(`${bike.displayName}<img class="bike-image" src="${bike.imageUrl}" />`);
      }
    }, 20);
  }

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl({
        value: 'Select cat type..',
        disabled: false,
      },
        [this.validateCategorySelection.bind(this)]
      );
      this.formGroup.addControl('categoryTypeSelectCategory', this.formControl);
    }
    this.formControl.patchValue('Select cat type..');

  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

  ngOnInit(): void {
    this.bikeCategoryDetails = this.bikeCategoryDetailProvider.getAllDetailsByTestType('MOD1');
  }

  categoryCodeChanged(category: CategoryCode) {
    if (this.formControl.valid) {
      this.categoryCodeChange.emit(category);
    }
  }

  validateCategorySelection(c: FormControl): null | {categoryTypeSelectCategory: boolean} {
    return this.testCategory === 'EUAMM1' ? null : { categoryTypeSelectCategory: false }
  }

}
