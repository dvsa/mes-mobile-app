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

  categories: any[] = [
    {
      code: 'AM',
      description: 'Motorcycle',
      imageUrl: '',
    },
    {
      code: 'A1',
      description: 'Motorcycle',
      imageUrl: '',
    },
    {
      code: 'A2',
      description: 'Motorcycle',
      imageUrl: '',
    },
    {
      code: 'A',
      description: 'Motorcycle',
      imageUrl: '',
    }
  ];

  categorySelectOptions: any = {
    cssClass: 'selector-header',
  };

  imagePath: string = 'src/assets/imgs/motorbike.png';

  constructor(
  ) { }

  openCategorySelector() {
    this.loadImages();
    this.selectRef.open();
  }

  closeCategorySelector() {
    this.selectRef.close();
  }

  loadImages() {
    setTimeout(function() {
      let options= document.getElementsByClassName('alert-radio-label');
      for (let index = 0; index < options.length; index++) {
        let element = options[index];
        element.innerHTML=element.innerHTML.concat('<img class="bike-image" src="assets/imgs/motorbike.png" />');
      }
    }, 200);
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
