import { Injectable } from '@angular/core';
import { behaviourMap } from './outcome-behaviour-map.constants';

@Injectable()
export class OutcomeBehaviourMapProvider {

  getVisibilityType(outcomeId: string, fieldName: string): string {
    const mappedOutcome = behaviourMap[outcomeId];
    if (!mappedOutcome) {
      return 'U';
    }
    const field = mappedOutcome[fieldName];
    if (!field) {
      return 'U';
    }
    return field.display;
  }

  hasDefault(outcomeId: string, fieldName: string): boolean {
    const mappedOutcome = behaviourMap[outcomeId];
    if (!mappedOutcome) {
      return false;
    }
    const field = mappedOutcome[fieldName];
    if (!field) {
      return false;
    }

    if (field.defaultValue && field.defaultValue !== '') {
      return true;
    }
    return false;
  }

  getDefault(outcomeId: string, fieldName: string): string {
    const mappedOutcome = behaviourMap[outcomeId];
    if (!mappedOutcome) {
      return null;
    }
    const field = mappedOutcome[fieldName];
    if (!field) {
      return null;
    }

    if (field.defaultValue && field.defaultValue !== '') {
      return field.defaultValue;
    }
    return null;
  }

  showNotApplicable(outcomeId: string, fieldName: string): boolean {
    const mappedOutcome = behaviourMap[outcomeId];
    if (!mappedOutcome) {
      return false;
    }
    const field = mappedOutcome[fieldName];
    if (!field) {
      return false;
    }
    return field.showNotApplicable;
  }
}
