import * as moment from 'moment';

// This function is required for updating incorrect dates of test
// Is mainly used in the office page of Delegated test journies

export function getNewTestStartTime(inputDate: string, startDateTime: string): string {
  const date = inputDate.trim();

  const dateArray = date.split('-').map(d => parseInt(d, 10));
  const year = dateArray[0];
  const month = dateArray[1];
  const day = dateArray[2];

  const startDateTemp = moment(startDateTime);

  startDateTemp.date(day);
  startDateTemp.month(month - 1);
  startDateTemp.year(year);

  return startDateTemp.toISOString();
}
