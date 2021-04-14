import { isHighwayCodeSafetySelected, getHighwayCodeSafetySeriousFault, getHighwayCodeSafetyDrivingFault, } from '../highway-code-safety.selectors';
describe('Highway Code Safety Selector', function () {
    describe('isHighwayCodeSafetySelected', function () {
        it('should return true if highway code safety has been selected', function () {
            expect(isHighwayCodeSafetySelected({ selected: true })).toEqual(true);
        });
        it('should return false if highway code safety has not been selected', function () {
            expect(isHighwayCodeSafetySelected({ selected: false })).toEqual(false);
        });
        it('should return undefined if highway code safety is not defined', function () {
            expect(isHighwayCodeSafetySelected({})).toBeUndefined();
        });
    });
    describe('getHighwayCodeSafetyDrivingFault', function () {
        it('should return true if there is a driving fault', function () {
            expect(getHighwayCodeSafetyDrivingFault({ drivingFault: true })).toEqual(true);
        });
        it('should return true if there is a serious fault', function () {
            expect(getHighwayCodeSafetySeriousFault({ seriousFault: true })).toEqual(true);
        });
        it('should return undefined if there is no driving fault', function () {
            expect(getHighwayCodeSafetyDrivingFault({})).toBeUndefined();
        });
        it('should return undefined if there is no serious fault', function () {
            expect(getHighwayCodeSafetySeriousFault({})).toBeUndefined();
        });
    });
});
//# sourceMappingURL=highway-code-safety.selector.spec.js.map