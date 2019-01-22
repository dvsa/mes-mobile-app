#! /usr/bin/env node

import * as fs from 'fs';
import * as moment from 'moment';
import { ExaminerWorkSchedule, TestSlot, PersonalCommitment, AdvanceTestSlot } from '../src/common/domain/DJournal';

const dateFormat = 'YYYY-MM-DDTHH:mm:ssZ'

updateLocalJournal();


function updateLocalJournal() {
  const path = 'mock/local-journal.json';

  const data = getData(path);
  data.testSlots = updateTestSlots(data.testSlots);
  data.nonTestActivities = updateTestSlots(data.nonTestActivities);
  data.personalCommitment = updatePersonalCommitments(data.personalCommitment);
  data.advanceTestSlot = updateAdvanceTestSlots(data.advanceTestSlot);

  saveData(path, data);
};

function getData(path: string): ExaminerWorkSchedule {
  return JSON.parse(fs.readFileSync(path).toString());
};

function saveData(path: string, data: ExaminerWorkSchedule) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
};

function updateTestSlots(testSlots: TestSlot[]): TestSlot[] {

  if (testSlots.length === 0) { return [] };

  const newDate = createMoment();
  let dateProcessing = createMoment(testSlots[0].slotDetail.start);

  testSlots.forEach(slot => {
    const slotDate = createMoment(slot.slotDetail.start)

    dateProcessing = caculateNewProcessingDate(dateProcessing, slotDate, newDate);

    slot.slotDetail.start = updateDate(slotDate, newDate);
  });

  return testSlots;
};

function updatePersonalCommitments(personalCommitments: PersonalCommitment[]): PersonalCommitment[] {
  /*
    For some reason the date is split into 2 parts for Personal Commitments.
    Due to this I do some additional formatting so we can still use strict formats in moment.js
  */

  if (personalCommitments.length === 0) { return [] };

  const newDate = createMoment();

  const dateProcessingString =
    formatDate(personalCommitments[0].startDate, personalCommitments[0].startTime);
  let dateProcessing = createMoment(dateProcessingString);

  personalCommitments.forEach(commitment => {

    const commitmentDateString = formatDate(commitment.startDate, commitment.startTime);
    const commitmentDate = createMoment(commitmentDateString);

    dateProcessing =
      caculateNewProcessingDate(dateProcessing, commitmentDate, newDate);

    commitment.startDate =
      createMoment(updateDate(commitmentDate, newDate)).format('YYYY-MM-DD');
  });
  return personalCommitments;
}

function updateAdvanceTestSlots(testSlots: AdvanceTestSlot[]): AdvanceTestSlot[] {

  if (testSlots.length === 0) { return [] };

  const newDate = createMoment();
  let dateProcessing = createMoment(testSlots[0].start);

  testSlots.forEach(slot => {
    const slotDate = createMoment(slot.start)

    dateProcessing =
      caculateNewProcessingDate(dateProcessing, slotDate, newDate);

    slot.start = updateDate(slotDate, newDate);
  });

  return testSlots;
}

function doesMatch(a: moment.Moment, b: moment.Moment): boolean {
  return a.isSame(b, 'day');
};

function caculateDiffInDays(a: moment.Moment, b: moment.Moment) : number {
  return createMoment(a).startOf('day').diff(createMoment(b).startOf('day'), 'days');
}

function createMoment(date?: string | moment.Moment) : moment.Moment {
  if (date) {
    return moment(date, dateFormat, true);
  }
  return moment()
}

function updateDate(currentDate: moment.Moment, newDate: moment.Moment): string {
  const daysToAdd = caculateDiffInDays(newDate, currentDate);
  return currentDate.add(daysToAdd, 'days').format(dateFormat);
};

function caculateNewProcessingDate( dateProcessing: moment.Moment, itemDate: moment.Moment,newDate: moment.Moment): moment.Moment {
  if (doesMatch(dateProcessing, itemDate)) { return dateProcessing; }

  const daysToAdd = caculateDiffInDays(itemDate, dateProcessing)
  newDate.add(daysToAdd, 'days');
  return createMoment(itemDate);
}

function formatDate(startDate: string, startTime: String): string {
  if (startTime) {
    return startDate + 'T' + startTime;
  }
  return startDate + 'T00:00:00+00:00';
}
