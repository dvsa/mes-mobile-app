import { IndependentDriving, WeatherConditions } from '@dvsa/mes-test-schema/categories/Common';

export interface TestSummaryCardModel {
  accompaniment?: string[];
  provisionalLicenceProvided?: boolean;
  passCertificateNumber?: string;
  routeNumber?: number;
  independentDriving?: IndependentDriving;
  candidateDescription?: string;
  debriefWitnessed?: boolean;
  weatherConditions?: WeatherConditions[];
  D255?: boolean;
  additionalInformation?: string;
}
