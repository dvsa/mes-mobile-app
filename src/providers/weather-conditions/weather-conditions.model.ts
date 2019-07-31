import { WeatherConditions } from '@dvsa/mes-test-schema/categories/B';

export interface WeatherConditionSelection {
  weatherConditionNumber: number;
  weatherConditionDescription: WeatherConditions;
}
