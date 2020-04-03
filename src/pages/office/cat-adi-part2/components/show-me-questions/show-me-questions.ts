import { Component, Input, Output, EventEmitter, OnChanges, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/common';
import {
  OutcomeBehaviourMapProvider,
  VisibilityType,
} from '../../../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { VehicleChecksQuestion } from '../../../../../providers/question/vehicle-checks-question.model';
import {
  // find,
  uniqBy,
  uniq,
} from 'lodash';
import { Select } from 'ionic-angular';

// type VehicleChecksQuestionDisable = (VehicleChecksQuestion & { disabled: boolean; })[];

@Component({
  selector: 'show-me-questions-cat-adi2',
  templateUrl: 'show-me-questions.html',
})
export class ShowMeQuestionsCatADI2Component implements OnInit, OnChanges {

  @ViewChild('showMeQuestionSelect') selectRef: Select;

  @Input()
  display: boolean;

  @Input()
  outcome: string;

  @Input()
  showMeQuestions: QuestionResult[];

  @Input()
  showMeQuestionOptions: VehicleChecksQuestion[];

  // Created as i've added a disabled property - might not be needed
  showMeQuestionOptionsDisabled: { code: string; description: string; shortName: string; disabled: boolean; }[];

  @Input()
  formGroup: FormGroup;

  @Output()
  showMeQuestionsChange = new EventEmitter<VehicleChecksQuestion[]>();

  // @TODO - rename and make type strict
  values: any[] = [];

  // @TODO - rename and make type strict
  index: number[] = [];

  clicked: number = 0;

  optionValue: boolean = false;

  private formControl: FormControl;
  static readonly fieldName: string = 'showMeQuestions';

  constructor(private outcomeBehaviourProvider: OutcomeBehaviourMapProvider) {
  }

  // Might not be needed if not using 'disabled' property directly
  ngOnInit(): void {
    this.showMeQuestionOptionsDisabled = this.showMeQuestionOptions.map(v => ({ ...v, disabled: false }));
  }

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl([]);
      this.formGroup.addControl(ShowMeQuestionsCatADI2Component.fieldName, this.formControl);
    }
    const visibilityType = this.outcomeBehaviourProvider.getVisibilityType(this.outcome,
      ShowMeQuestionsCatADI2Component.fieldName);

    if (visibilityType === VisibilityType.NotVisible) {
      this.formGroup.get(ShowMeQuestionsCatADI2Component.fieldName).clearValidators();
    } else {
      this.formGroup.get(ShowMeQuestionsCatADI2Component.fieldName).setValidators([Validators.required]);
    }
    this.formControl.patchValue(this.showMeQuestions);
  }

  showMeQuestionsChanged(showMeQuestions: VehicleChecksQuestion[]): void {
    this.showMeQuestionsChange.emit(showMeQuestions);
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

  selection = (question: VehicleChecksQuestion, index: number): void => {
    this.values.push(question);
    this.index.push(index);

    this.values = this.uniqueArray(this.values, 'code');
    this.index = this.uniqueArray(this.index, null);

    const filteredIndices: number[] =
      this.fillArray(8).filter(v => this.index.indexOf(v) === -1);

    filteredIndices.forEach((res: number): void => {
      if (res !== undefined) {
        // const endsIn: Element = document.querySelector(`[id$='${res}']`);
        // const contains: Element = document.querySelector(`[id*='alert-input']`);

        console.log(`#alert-input-${this.clicked}-${res}`);
        const dom: Element = document.querySelector(`#alert-input-${this.clicked}-${res}`);

        if (this.values.length >= 2 && dom) {
          // endsIn.setAttribute('disabled', 'true');
          dom.setAttribute('disabled', 'true');
          this.showMeQuestionOptionsDisabled[res].disabled = true;
        }
      }
    });
  };

  fillArray = (length: number): number[] => Array.from({ length }, (val, index) => index);

  uniqueArray = (array: any[], key: string): any[] => {
    if (!key) {
      return uniq(array);
    }
    return uniqBy(array, key);
  };

  openedSelect = () => {
    console.log('clicked');
    console.log(this.formControl);

    const vals = this.uniqueArray(this.formControl.value, 'code');

    console.log('vals', vals);

    const filteredIndices: number[] = this.fillArray(8);

    filteredIndices.forEach((res: number): void => {
      if (res !== undefined) {

        // const dom = document.querySelector(`#alert-input-${this.clicked}-${res}`);

        if (vals.length < 2) {
          const dom = document.getElementsByTagName(`button`);

          if (dom) {
            console.log(dom);

            const h = <HTMLInputElement>document.querySelector(`#alert-input-0-0`);
            if (h) {
              // h.addEventListener('click', (event: MouseEvent) => {
              //   console.log('clicked', res);
              // });
              h.onclick = () => {
                console.info('res', res);
              };
              // h.disabled = false;
              //
              // h.setAttribute('disabled', 'false');
            }
            //
            // Array.from(dom).forEach(elem => {
            //   elem.setAttribute('disabled', 'false');
            // });
            // dom.setAttribute('disabled', 'true');
            this.showMeQuestionOptionsDisabled[res].disabled = false;
          }
          // const h = <HTMLInputElement>document.getElementById("myBtn");
          // h.disabled = false;

        }
      }
    });
  }

  onSelectClicked = () => {
    // const d: Element = document.querySelector(`#alert-input-0-0`);
    //
    // let val: boolean = false;
    // if (d) {
    //   d.onclick = function() { alert('blah'); };
    // }
  }


}
