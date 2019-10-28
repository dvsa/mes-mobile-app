import { WeatherConditions } from '@dvsa/mes-test-schema/categories/Common';

export interface WeatherConditionSelection {
  weatherConditionNumber: number;
  weatherConditionDescription: WeatherConditions;
}
