import * as moment from 'moment';
export var PRESS_TIME_TO_ENABLE_EDIT = 10000;
// This function is required for updating incorrect dates of test
// Is mainly used in the office page of Delegated test journies
export function getNewTestStartTime(inputDate, startDateTime) {
    var date = inputDate.trim();
    var dateArray = date.split('-').map(function (d) { return parseInt(d, 10); });
    var year = dateArray[0];
    var month = dateArray[1];
    var day = dateArray[2];
    var startDateTemp = moment(startDateTime);
    startDateTemp.date(day);
    startDateTemp.month(month - 1);
    startDateTemp.year(year);
    // Database schema accepts only 19 characters for the start date time property
    return startDateTemp.format('YYYY-MM-DDTHH:mm:ss');
}
/**
 * Checks if an inputDate is in range regarding to currentDate
 * @param inputDate format: YYYY-MM-DD
 * @param currentDate format: YYYY-MM-DD
 */
export function isValidStartDate(inputDate, currentDate) {
    if (moment(inputDate).isAfter(currentDate)) {
        // inputDate is in the future
        return false;
    }
    if (moment(currentDate).diff(inputDate, 'year', true) > 1) {
        // inputDate is more than one year in the past
        return false;
    }
    return true;
}
//# sourceMappingURL=test-start-time.js.map