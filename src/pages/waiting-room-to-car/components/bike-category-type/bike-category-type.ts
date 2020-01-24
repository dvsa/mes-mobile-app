import { Component, OnChanges, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Select } from 'ionic-angular';
import { BikeCategoryDetailProvider } from '../../../../providers/bike-category-detail/bike-category-detail';
import {
  BikeCategoryDetail,
  BikeTestType,
} from '../../../../providers/bike-category-detail/bike-category-detail.model';
import { CategoryCode } from '@dvsa/mes-test-schema/categories/common';

@Component({
  selector: 'bike-category-type',
  templateUrl: 'bike-category-type.html',
})
export class BikeCategoryTypeComponent implements OnChanges {

  @ViewChild('categorySelect') selectRef: Select;

  @Input()
  formGroup: FormGroup;

  @Input()
  testCategory: CategoryCode;

  @Input()
  testType: BikeTestType;

  @Output()
  categoryCodeChange = new EventEmitter<CategoryCode>();

  formControl: FormControl;
  bikeCategoryDetails: BikeCategoryDetail[];
  categoryConfirmed: boolean;

  constructor(
    private bikeCategoryDetailProvider: BikeCategoryDetailProvider,
  ) { }

  openCategorySelector(): void {
    this.loadImages();
    this.selectRef.open();
  }

  closeCategorySelector(): void {
    this.selectRef.close();
  }

  loadImages(): void {
    setTimeout(() =>  {
      const options = document.getElementsByClassName('alert-radio-label');
      Array.from(options).forEach((option, index) => {
        const element = options[index];
        const category = this.bikeCategoryDetails[index].categoryCode;
        const bike = this.bikeCategoryDetailProvider.getDetailByCategoryCode(category);
        element.innerHTML = `<span class="bike-code">${element.innerHTML}</span>`
            .concat(`${bike.displayName}<img class="bike-image" src="${bike.imageUrl}" />`);
      });
    }, 20);
  }

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl({
        value: 'Select cat type..',
        disabled: false,
      },
        [this.validateCategorySelection.bind(this)],
      );
      this.formGroup.addControl('categoryTypeSelectCategory', this.formControl);
    }
    console.log(this.formGroup);
    this.formControl.patchValue('Select cat type..');

  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

  ngOnInit(): void {
    // default to MOD1 if any input other than MOD1 or MOD2 provided
    this.testType  = (this.testType === BikeTestType.MOD1 || this.testType === BikeTestType.MOD2) ?
      this.testType : BikeTestType.MOD1;
    this.categoryConfirmed = false;
    this.bikeCategoryDetails = this.bikeCategoryDetailProvider.getAllDetailsByTestType(this.testType);
  }

  categoryCodeChanged(category: CategoryCode): void {
    this.categoryConfirmed = true;
    this.categoryCodeChange.emit(category);
  }

  validateCategorySelection(): null | {categoryTypeSelectCategory: boolean} {
    return this.categoryConfirmed ? null : { categoryTypeSelectCategory: false };
  }

}
