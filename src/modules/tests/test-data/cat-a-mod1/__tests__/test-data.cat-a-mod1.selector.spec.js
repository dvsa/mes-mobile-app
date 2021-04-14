import { hasSeriousFault, hasDangerousFault, getETAFaultText, } from '../../common/test-data.selector';
import { getDrivingFaultCount, } from '../test-data.cat-a-mod1.selector';
import { Competencies } from '../../test-data.constants';
describe('TestDataSelectors', function () {
    var state = {
        drivingFaults: {
            precautions: 1,
        },
        seriousFaults: {
            precautions: true,
        },
        dangerousFaults: {
            precautions: true,
        },
        ETA: {
            physical: false,
            verbal: false,
        },
    };
    describe('getDrivingFaultCount', function () {
        it('should return the driving fault count', function () {
            expect(getDrivingFaultCount(state, Competencies.precautions)).toBe(1);
        });
        it('should return undefined when there hasnt been any driving faults', function () {
            expect(getDrivingFaultCount(state, Competencies.moveOffSafety)).toBeUndefined();
        });
    });
    describe('hasSeriousFault', function () {
        it('should return true if a competency has a serious fault', function () {
            expect(hasSeriousFault(state, Competencies.precautions)).toEqual(true);
        });
        it('should return false if a competency does not have a serious fault', function () {
            expect(hasSeriousFault(state, Competencies.moveOffSafety)).toBeFalsy();
        });
    });
    describe('hasDangerousFault', function () {
        it('should return true if a competency has a dangerous fault', function () {
            expect(hasDangerousFault(state, Competencies.precautions)).toEqual(true);
        });
        it('should return false if a competency does not have a dangerous fault', function () {
            expect(hasDangerousFault(state, Competencies.moveOffSafety)).toBeFalsy();
        });
    });
    describe('getETAFaultText', function () {
        it('should return null if no ETA faults', function () {
            var result = getETAFaultText(state.ETA);
            expect(result).toBeUndefined();
        });
        it('should return `Physical and Verbal` if both ETA faults', function () {
            state.ETA.physical = true;
            state.ETA.verbal = true;
            var result = getETAFaultText(state.ETA);
            expect(result).toEqual('Physical and Verbal');
        });
        it('should return `Physical` if just physical ETA fault', function () {
            state.ETA.physical = true;
            state.ETA.verbal = false;
            var result = getETAFaultText(state.ETA);
            expect(result).toEqual('Physical');
        });
        it('should return `Verbal` if just verbal ETA fault', function () {
            state.ETA.physical = false;
            state.ETA.verbal = true;
            var result = getETAFaultText(state.ETA);
            expect(result).toEqual('Verbal');
        });
    });
});
//# sourceMappingURL=test-data.cat-a-mod1.selector.spec.js.map