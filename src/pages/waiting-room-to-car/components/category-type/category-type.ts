import { Component, OnChanges, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Select } from 'ionic-angular';
import { BikeCategoryDetailProvider } from '../../../../providers/bike-category-detail/bike-category-detail';
import { BikeCategoryDetail } from '../../../../providers/bike-category-detail/bike-category-detail.model';

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
        element.innerHTML = element.innerHTML
          .concat(`<span>${bike.displayName}</span> <img class="bike-image" src="${bike.imageUrl}" />`);
      }
    }, 20);
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

  ngOnInit(): void {
    this.bikeCategoryDetails = this.bikeCategoryDetailProvider.getAllDetailsByTestType('MOD1');
  }

}
