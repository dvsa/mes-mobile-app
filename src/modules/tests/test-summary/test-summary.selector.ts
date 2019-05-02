import { TestSummary, WeatherConditions, Identification, IndependentDriving } from '@dvsa/mes-test-schema/categories/B';
import { OutcomeBehaviourMapProvider } from '../../../providers/outcome-behaviour-map/outcome-behaviour-map';

export const getRouteNumber = (ts: TestSummary): number => ts.routeNumber;
export const displayRouteNumber = (
    routeNumber: number,
    outcome: string,
    provider: OutcomeBehaviourMapProvider): boolean => {
  const visibility = provider.getVisibilityType(outcome, 'routeNumber');
  if ((visibility === 'A' && routeNumber !== null) || visibility === 'Y') {
    return true;
  }
  return false;
};

export const getCandidateDescription = (ts: TestSummary): string => ts.candidateDescription;
export const getAdditionalInformation = (ts: TestSummary): string => ts.additionalInformation;
export const getD255 = (ts: TestSummary): boolean => ts.D255;
export const getIdentification = (ts: TestSummary): Identification => ts.identification;
export const getSatNavUsed = (ts: TestSummary): boolean => ts.independentDriving === 'Sat nav';
export const getTrafficSignsUsed = (ts: TestSummary): boolean => ts.independentDriving === 'Traffic signs';
export const isDebriefWitnessed = (ts: TestSummary): boolean => ts.debriefWitnessed;
export const getWeatherConditions = (ts: TestSummary): WeatherConditions[] => ts.weatherConditions;
export const getIndependentDriving = (ts: TestSummary): IndependentDriving => ts.independentDriving;
