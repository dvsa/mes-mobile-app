import { sumManoeuvreFaults } from '../faults';
import { CompetencyOutcome } from '../../models/competency-outcome';

describe('sumManoeuvreFaults', () => {

  it('null manoeuvres has 0 faults', () => {
    const result = sumManoeuvreFaults(null, CompetencyOutcome.DF);
    expect(result).toBe(0);
  });

  it('empty manoeuvres has 0 faults', () => {
    const result = sumManoeuvreFaults({}, CompetencyOutcome.DF);
    expect(result).toBe(0);
  });

  it('one manoeuvres has 1 driving fault faults', () => {
    const result = sumManoeuvreFaults({
      reverseLeft: {
        selected: true,
        controlFault: CompetencyOutcome.DF,
      },
    }, CompetencyOutcome.DF);
    expect(result).toBe(1);
  });

  it('3 manoeuvres faults has 2 driving faults', () => {
    const result = sumManoeuvreFaults({
      reverseLeft: {
        selected: true,
        controlFault: CompetencyOutcome.DF,
      },
      forwardPark: {
        selected: true,
        controlFault: CompetencyOutcome.D,
      },
      reverseParkCarpark: {
        selected: true,
        controlFault: CompetencyOutcome.DF,
      },
    }, CompetencyOutcome.DF);
    expect(result).toBe(2);
  });

  it('3 manoeuvres faults has 1 dangerous', () => {
    const result = sumManoeuvreFaults({
      reverseLeft: {
        selected: true,
        controlFault: CompetencyOutcome.DF,
      },
      forwardPark: {
        selected: true,
        controlFault: CompetencyOutcome.D,
      },
      reverseParkCarpark: {
        selected: true,
        controlFault: CompetencyOutcome.DF,
      },
    }, CompetencyOutcome.D);
    expect(result).toBe(1);
  });

  it('3 manoeuvres faults has 1 serious', () => {
    const result = sumManoeuvreFaults({
      reverseLeft: {
        selected: true,
        controlFault: CompetencyOutcome.DF,
      },
      forwardPark: {
        selected: true,
        controlFault: CompetencyOutcome.S,
      },
      reverseParkCarpark: {
        selected: true,
        controlFault: CompetencyOutcome.DF,
      },
    }, CompetencyOutcome.S);
    expect(result).toBe(1);
  });

});
