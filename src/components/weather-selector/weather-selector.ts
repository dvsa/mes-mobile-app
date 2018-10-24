import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
@Component({
  selector: 'weather-selector',
  templateUrl: 'weather-selector.html'
})
export class WeatherSelectorComponent {
  selectedWeather: string = '';
  weatherConditions: object[] = [
    { label: 'Dull / wet Roads', value: 'dullWetRoads' },
    { label: 'Bright / dry roads', value: 'brightDryRoads' },
    { label: 'Dull / dry Roads', value: 'dullDryRoads' },
    { label: 'Bright / wet roads', value: 'brightWetRoads' },
    { label: 'Snowing', value: 'snow' },
    { label: 'Raining through test', value: 'raining' },
    { label: 'Icy', value: 'icy' },
    { label: 'Showers', value: 'showers' },
    { label: 'Windy', value: 'wind' },
    { label: 'Foggy / misty', value: 'fog' }
  ];

  constructor(private viewCtrl: ViewController) {}

  updateWeatherConditions(id: string, isChecked: boolean) {
    return this.weatherConditions.map((condition: any) => {
      if (condition.value === id) {
        condition.checked = isChecked;
      }
      return condition;
    });
  }

  setWeatherSummary() {
    return this.weatherConditions
      .reduce((conditions: any, curr: any) => {
        if (curr.checked === true) {
          conditions.push(curr.label);
        }
        return conditions;
      }, [])
      .join(', ');
  }

  setWeather(event: any) {
    const { checked: isChecked, id } = event.target;

    this.weatherConditions = this.updateWeatherConditions(id, isChecked);
    this.selectedWeather = this.setWeatherSummary();
  }

  cancelWeather() {
    this.selectedWeather = '';
    this.viewCtrl.dismiss();
  }

  submitWeather() {
    this.viewCtrl.dismiss(this.selectedWeather);
  }
}
