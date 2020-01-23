import { Component, OnChanges, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Select } from 'ionic-angular';
import { CategoryCode } from '@dvsa/mes-test-schema/categories/common';
import { BikeCategoryIconProvider } from '../../../../providers/bike-category-icon/bike-category-icon';

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

  categories: CategoryCode[] = [
    'EUA1M1',
    'EUA2M1',
    'EUAM1',
    'EUAMM1',
  ];

  categorySelectOptions: any = {
    cssClass: 'selector-header',
  };

  //imagePath: string = 'src/assets/imgs/motorbike.png';

  constructor(
    private bikeCategoryIconProvider: BikeCategoryIconProvider
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
      let options= document.getElementsByClassName('alert-radio-label');
      for (let index = 0; index < options.length; index++) {
        let element = options[index];
        let category = this.categories[index];
        console.log(this.categories[index]);
        let imagePath = this.bikeCategoryIconProvider.getBikeIcon(category);
        console.log(imagePath);
        element.innerHTML=element.innerHTML.concat(`A1 &emsp; Motorbike <img class="bike-image" src="${imagePath}" />`);
      }
    }, 200);
  }

  pickCategoryImage(category: CategoryCode) {

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
