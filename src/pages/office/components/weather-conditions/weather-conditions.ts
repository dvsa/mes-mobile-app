import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WeatherConditions } from '@dvsa/mes-test-schema/categories/B';
import { WeatherConditionSelection } from '../../../../providers/weather-conditions/weather-conditions.model';

@Component({
  selector: 'weather-conditions',
  templateUrl: 'weather-conditions.html',
})
export class WeatherConditionsComponent implements OnChanges {

  @Input()
  weatherConditions: WeatherConditions[];

  @Input()
  weatherConditionsOptions: WeatherConditionSelection[];

  @Input()
  formGroup: FormGroup;

  @Output()
  weatherConditionsChange = new EventEmitter<WeatherConditions[]>();

  private formControl: FormControl;

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl([], [Validators.required]);
      this.formGroup.addControl('weatherConditions', this.formControl);
    }
    this.formControl.patchValue(this.weatherConditions);
  }

  weatherConditionsChanged(weatherConditions: WeatherConditions[]): void {
    this.weatherConditionsChange.emit(weatherConditions);
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

}
