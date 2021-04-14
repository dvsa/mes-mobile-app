import { isControlledStopSelected, getControlledStopFault } from '../controlled-stop.selectors';
import { CompetencyOutcome } from '../../../../../../shared/models/competency-outcome';
describe('Controlled Stop Selector', function () {
    describe('isControlledStopSelected', function () {
        it('should return true if controlled stop has been selected', function () {
            expect(isControlledStopSelected({ selected: true })).toEqual(true);
        });
        it('should return false if controlled stop has not been selected', function () {
            expect(isControlledStopSelected({ selected: false })).toEqual(false);
        });
        it('should return undefined if contolled stop is not defined', function () {
            expect(isControlledStopSelected({})).toBeUndefined();
        });
    });
    describe('getControlledStopFault', function () {
        it('should return DF if there is a driving fault', function () {
            expect(getControlledStopFault({ fault: 'DF' })).toEqual(CompetencyOutcome.DF);
        });
        it('should return S if there is a serious fault', function () {
            expect(getControlledStopFault({ fault: 'S' })).toEqual(CompetencyOutcome.S);
        });
        it('should return D if there is a dangerous fault', function () {
            expect(getControlledStopFault({ fault: 'D' })).toEqual(CompetencyOutcome.D);
        });
        it('should return undefined if there is no fault', function () {
            expect(getControlledStopFault({})).toBeUndefined();
        });
    });
});
//# sourceMappingURL=controlled-stop.selector.spec.js.map