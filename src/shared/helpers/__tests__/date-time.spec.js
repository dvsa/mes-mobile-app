import { DateTime, Duration } from '../date-time';
describe('DateTime', function () {
    var today = new DateTime();
    var yesterday = new DateTime().add(-1, Duration.DAY);
    var tomorrow = new DateTime().add(1, Duration.DAY);
    it('should construct from text and add days', function () {
        expect(DateTime.at('2019-02-01').add(1, Duration.DAY).format('YYYY-MM-DD')).toBe('2019-02-02');
    });
    it('should correctly calculate days difference using a DateTime', function () {
        expect(today.daysDiff(today)).toBe(0);
        expect(today.daysDiff(tomorrow)).toBe(1);
        expect(today.daysDiff(yesterday)).toBe(-1);
    });
    it('should correctly calculate days difference using a string', function () {
        expect(today.daysDiff(today.format('YYYY-MM-DD'))).toBe(0);
        expect(today.daysDiff(tomorrow.format('YYYY-MM-DD'))).toBe(1);
        expect(today.daysDiff(yesterday.format('YYYY-MM-DD'))).toBe(-1);
    });
    it('should correctly calculate days difference using a date', function () {
        expect(today.daysDiff(new Date())).toBe(0);
        expect(today.daysDiff(new Date(tomorrow.format('YYYY-MM-DD')))).toBe(1);
        expect(today.daysDiff(new Date(yesterday.format('YYYY-MM-DD')))).toBe(-1);
    });
    it('should correctly calculate the earliest date', function () {
        expect(today.isBefore(tomorrow)).toBe(true);
        expect(today.isBefore(today)).toBe(false);
        expect(today.isBefore(yesterday)).toBe(false);
    });
});
//# sourceMappingURL=date-time.spec.js.map