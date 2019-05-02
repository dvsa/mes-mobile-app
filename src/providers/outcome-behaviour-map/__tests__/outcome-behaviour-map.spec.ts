import { TestBed } from '@angular/core/testing';
import { OutcomeBehaviourMapProvider } from '../outcome-behaviour-map';

fdescribe('OutcomeBehaviourMapProvider', () => {
  let outcomeBehaviourMapProvider: OutcomeBehaviourMapProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        OutcomeBehaviourMapProvider,
      ],
    });

    outcomeBehaviourMapProvider = TestBed.get(OutcomeBehaviourMapProvider);
  });

// TODO need to create a way of providing a behaviour map so can pass in a test map

  describe('getVisibilityType', () => {
    it(`should return Y for an outcome and field that has display Y`, () => {
      const result = outcomeBehaviourMapProvider.getVisibilityType('1', 'routeNumber');
      expect(result).toBe('Y');
    });
    it(`should return N for an outcome and field that has display N`, () => {
      const result = outcomeBehaviourMapProvider.getVisibilityType('3', 'routeNumber');
      expect(result).toBe('N');
    });
    it(`should return A for an outcome and field that has display A`, () => {
      const result = outcomeBehaviourMapProvider.getVisibilityType('4', 'faultComment');
      expect(result).toBe('A');
    });
    it(`should return U for a non-existant outcome`, () => {
      const result = outcomeBehaviourMapProvider.getVisibilityType('40', 'faultComment');
      expect(result).toBe('U');
    });
    it(`should return U for a non-existant field`, () => {
      const result = outcomeBehaviourMapProvider.getVisibilityType('4', 'fakefield');
      expect(result).toBe('U');
    });
  });

  describe('hasDefault', () => {
    it(`should return false if defaultValue field is not present`, () => {
      const result = outcomeBehaviourMapProvider.hasDefault('1', 'independentDriving');
      expect(result).toBeFalsy();
    });

    it(`should return false if defaultValue field is present but is null`, () => {
      const result = outcomeBehaviourMapProvider.hasDefault('1', 'routeNumber');
      expect(result).toBeFalsy();
    });
    it(`should return false if defaultValue field is present but is empty string`, () => {
      const result = outcomeBehaviourMapProvider.hasDefault('1', 'routeNumber');
      expect(result).toBeFalsy();
    });

    it(`should return true if defaultValue field is present and non null`, () => {
      const result = outcomeBehaviourMapProvider.hasDefault('3', 'routeNumber');
      expect(result).toBeTruthy();
    });

  });

  describe('getDefault', () => {
    it(`should return null if defaultValue field is not present`, () => {
      const result = outcomeBehaviourMapProvider.getDefault('1', 'independentDriving');
      expect(result).toBeNull();
    });

    it(`should return null if defaultValue field is present but is null`, () => {
      const result = outcomeBehaviourMapProvider.getDefault('1', 'routeNumber');
      expect(result).toBeNull();
    });
    it(`should return null if defaultValue field is present but is empty string`, () => {
      const result = outcomeBehaviourMapProvider.getDefault('1', 'routeNumber');
      expect(result).toBeNull();
    });

    it(`should return value if defaultValue field is present and non null`, () => {
      const result = outcomeBehaviourMapProvider.getDefault('3', 'routeNumber');
      expect(result).toBe('1');
    });

  });

  describe('showNotApplicable', () => {
    it(`should return false if showNotApplicable is false`, () => {
      const result = outcomeBehaviourMapProvider.showNotApplicable('1', 'independentDriving');
      expect(result).toBeFalsy();
    });

    it(`should return false if showNotApplicable field is true`, () => {
      const result = outcomeBehaviourMapProvider.showNotApplicable('4', 'independentDriving');
      expect(result).toBeTruthy();
    });
    it(`should return false if called with non existant outcome`, () => {
      const result = outcomeBehaviourMapProvider.showNotApplicable('x', 'routeNumber');
      expect(result).toBeFalsy();
    });

    it(`should return false if called with non existant field`, () => {
      const result = outcomeBehaviourMapProvider.showNotApplicable('4', 'fakeroute');
      expect(result).toBeFalsy();
    });
  });

});
