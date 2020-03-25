import { sumManoeuvreFaults } from '../faults';
import { CompetencyOutcome } from '../../models/competency-outcome';

describe('sumManoeuvreFaults (single)', () => {

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

describe('sumManoeuvreFaults (multiple)', () => {
  it('null manoeuvres have 0 faults', () => {
    const result = sumManoeuvreFaults(null, CompetencyOutcome.DF);
    expect(result).toBe(0);
  });

  it('2 empty manoeuvres have 0 faults', () => {
    const result = sumManoeuvreFaults([{}, {}], CompetencyOutcome.DF);
    expect(result).toBe(0);
  });

  it('first manouevre exercise with manoeuvre faults has 2 driving faults', () => {
    const result = sumManoeuvreFaults([{
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
    }, {
      reverseLeft: {
        selected: true,
      },
    }], CompetencyOutcome.DF);
    expect(result).toBe(2);
  });

  it('second manouevre exercise with manoeuvre faults has 2 driving faults', () => {
    const result = sumManoeuvreFaults([{
      reverseLeft: {
        selected: true,
      },
    }, {
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
    }], CompetencyOutcome.DF);
    expect(result).toBe(2);
  });

  it('both manouevre exercises with manoeuvre faults has 4 driving faults', () => {
    const result = sumManoeuvreFaults([{
      reverseLeft: {
        selected: true,
        controlFault: CompetencyOutcome.DF,
      },
      reverseParkCarpark: {
        selected: true,
        controlFault: CompetencyOutcome.DF,
      },
    }, {
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
    }], CompetencyOutcome.DF);
    expect(result).toBe(4);
  });
});
