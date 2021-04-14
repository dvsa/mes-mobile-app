import * as moment from 'moment';
var DateTime = /** @class */ (function () {
    function DateTime(sourceDateTime) {
        if (sourceDateTime === undefined) {
            this.moment = moment();
        }
        else if (typeof sourceDateTime === 'string') {
            this.moment = moment(new Date(sourceDateTime));
        }
        else if (sourceDateTime instanceof Date) {
            this.moment = moment(sourceDateTime);
        }
        else {
            this.moment = moment(sourceDateTime.moment);
        }
    }
    DateTime.at = function (sourceDateTime) {
        return new DateTime(sourceDateTime);
    };
    DateTime.prototype.add = function (amount, unit) {
        var momentUnit = unit.valueOf();
        this.moment.add(amount, momentUnit);
        return this;
    };
    DateTime.prototype.subtract = function (amount, unit) {
        var momentUnit = unit.valueOf();
        this.moment.subtract(amount, momentUnit);
        return this;
    };
    DateTime.prototype.format = function (formatString) {
        return this.moment.format(formatString);
    };
    DateTime.prototype.day = function () {
        return this.moment.day();
    };
    DateTime.prototype.toString = function () {
        return this.moment.toString();
    };
    DateTime.prototype.daysDiff = function (targetDate) {
        var date = new DateTime(targetDate);
        var today = this.moment.startOf(Duration.DAY);
        return date.moment.startOf(Duration.DAY).diff(today, Duration.DAY);
    };
    DateTime.prototype.compareDuration = function (targetDate, duration) {
        if (typeof targetDate === 'string') {
            return moment(targetDate).diff(this.moment, duration);
        }
        return new DateTime(targetDate).moment.diff(this.moment, duration);
    };
    DateTime.prototype.isBefore = function (targetDate) {
        var date = new DateTime(targetDate);
        return date.moment.diff(this.moment, Duration.SECOND) > 0;
    };
    DateTime.today = function () {
        return moment().toDate();
    };
    DateTime.datePickerInputToString = function (date) {
        return moment().year(date.year).month(date.month - 1).date(date.day).format('YYYY-MM-DD');
    };
    return DateTime;
}());
export { DateTime };
export var Duration;
(function (Duration) {
    Duration["DAY"] = "day";
    Duration["HOUR"] = "hour";
    Duration["MINUTE"] = "minute";
    Duration["SECOND"] = "second";
})(Duration || (Duration = {}));
//# sourceMappingURL=date-time.js.map