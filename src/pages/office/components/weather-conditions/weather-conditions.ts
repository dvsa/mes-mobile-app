import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WeatherConditions } from '@dvsa/mes-test-schema/categories/B';
import { WeatherConditionSelection } from '../../../../providers/weather-conditions/weather-conditions.model';
import { OutcomeBehaviourMapProvider } from '../../../../providers/outcome-behaviour-map/outcome-behaviour-map';

@Component({
  selector: 'weather-conditions',
  templateUrl: 'weather-conditions.html',
})
export class WeatherConditionsComponent implements OnChanges {

  @Input()
  display: boolean;

  @Input()
  outcome: string;

  @Input()
  weatherConditions: WeatherConditions[];

  @Input()
  weatherConditionsOptions: WeatherConditionSelection[];

  @Input()
  formGroup: FormGroup;

  @Output()
  weatherConditionsChange = new EventEmitter<WeatherConditions[]>();

  private formControl: FormControl;

  constructor(private outcomeBehaviourProvider: OutcomeBehaviourMapProvider) { }

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl([]);
      this.formGroup.addControl('weatherConditions', this.formControl);
    }
    const visibilityType = this.outcomeBehaviourProvider.getVisibilityType(this.outcome, 'weatherConditions');

    if (visibilityType === 'N') {
      this.formGroup.get('weatherConditions').clearValidators();
    } else {
      this.formGroup.get('weatherConditions').setValidators([Validators.required]);
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
