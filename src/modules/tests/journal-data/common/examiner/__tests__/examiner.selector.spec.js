import { getStaffNumber } from '../examiner.selector';
describe('examiner selector', function () {
    var examiner = {
        staffNumber: '1234',
    };
    describe('getStaffNumber', function () {
        it('should return the staff number', function () {
            expect(getStaffNumber(examiner)).toBe('1234');
        });
    });
});
//# sourceMappingURL=examiner.selector.spec.js.map