import { getInstructorAccompaniment, getSupervisorAccompaniment, getOtherAccompaniment, getInterpreterAccompaniment, } from '../accompaniment.selector';
describe('accompaniment selector', function () {
    var state = {
        ADI: false,
        other: true,
        supervisor: false,
        interpreter: false,
    };
    describe('getInstructorAccompaniment', function () {
        it('should retrieve the instructor accompaniment indicator from the state', function () {
            expect(getInstructorAccompaniment(state)).toBe(false);
        });
    });
    describe('getSupervisorAccompaniment', function () {
        it('should retrieve the supervisor accompaniment indicator from the state', function () {
            expect(getSupervisorAccompaniment(state)).toBe(false);
        });
    });
    describe('getotherAccompaniment', function () {
        it('should retrieve the other accompaniment indicator from the state', function () {
            expect(getOtherAccompaniment(state)).toBe(true);
        });
    });
    describe('getInterpreterAccompaniment', function () {
        it('should retrieve the interpreter accompaniment indicator from the state', function () {
            expect(getInterpreterAccompaniment(state)).toBe(false);
        });
    });
});
//# sourceMappingURL=accompaniment.selector.spec.js.map