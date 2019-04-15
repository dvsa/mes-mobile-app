import { Injectable } from '@angular/core';
import { WeatherConditionSelection } from './weather-conditions.model';
import { default as weatherConditions } from './weather-conditions.constants';

@Injectable()
export class WeatherConditionProvider {
  getWeatherConditions(): WeatherConditionSelection[] {
    return weatherConditions;
  }
}
