import { sumManoeuvreFaults } from '../faults';
import { CompetencyOutcome } from '../../models/competency-outcome';
describe('sumManoeuvreFaults (single)', function () {
    it('null manoeuvres has 0 faults', function () {
        var result = sumManoeuvreFaults(null, CompetencyOutcome.DF);
        expect(result).toBe(0);
    });
    it('empty manoeuvres has 0 faults', function () {
        var result = sumManoeuvreFaults({}, CompetencyOutcome.DF);
        expect(result).toBe(0);
    });
    it('one manoeuvres has 1 driving fault faults', function () {
        var result = sumManoeuvreFaults({
            reverseLeft: {
                selected: true,
                controlFault: CompetencyOutcome.DF,
            },
        }, CompetencyOutcome.DF);
        expect(result).toBe(1);
    });
    it('3 manoeuvres faults has 2 driving faults', function () {
        var result = sumManoeuvreFaults({
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
    it('3 manoeuvres faults has 1 dangerous', function () {
        var result = sumManoeuvreFaults({
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
    it('3 manoeuvres faults has 1 serious', function () {
        var result = sumManoeuvreFaults({
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
describe('sumManoeuvreFaults (multiple)', function () {
    it('null manoeuvres have 0 faults', function () {
        var result = sumManoeuvreFaults(null, CompetencyOutcome.DF);
        expect(result).toBe(0);
    });
    it('2 empty manoeuvres have 0 faults', function () {
        var result = sumManoeuvreFaults([{}, {}], CompetencyOutcome.DF);
        expect(result).toBe(0);
    });
    it('first manouevre exercise with manoeuvre faults has 2 driving faults', function () {
        var result = sumManoeuvreFaults([{
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
    it('second manouevre exercise with manoeuvre faults has 2 driving faults', function () {
        var result = sumManoeuvreFaults([{
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
    it('both manouevre exercises with manoeuvre faults has 4 driving faults', function () {
        var result = sumManoeuvreFaults([{
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
//# sourceMappingURL=faults.spec.js.map