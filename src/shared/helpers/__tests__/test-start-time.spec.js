import { getNewTestStartTime, isValidStartDate } from '../test-start-time';
describe('Test Start Time helper functions', function () {
    describe('getNewTestStartTime', function () {
        it('should return the correct date', function () {
            var inputDate = '2021-01-19';
            var startDateTime = '2020-12-25T08:10:00';
            expect(getNewTestStartTime(inputDate, startDateTime)).toBe('2021-01-19T08:10:00');
        });
    });
    describe('isValidStartDate', function () {
        var currentDate = '2021-01-22';
        it('should return true when date is between current date and one year in the past', function () {
            var inputDate = '2020-11-19';
            expect(isValidStartDate(inputDate, currentDate)).toBe(true);
        });
        it('should return false when date is after current date', function () {
            var inputDate = '2021-10-22';
            expect(isValidStartDate(inputDate, currentDate)).toBe(false);
        });
        it('should return false when date is more than one year before current date', function () {
            var inputDate = '2020-01-21';
            expect(isValidStartDate(inputDate, currentDate)).toBe(false);
        });
    });
});
//# sourceMappingURL=test-start-time.spec.js.map