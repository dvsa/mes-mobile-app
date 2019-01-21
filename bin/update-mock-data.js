#! /usr/bin/env node
const fs = require('fs');
const moment = require('moment');

const dateFormat = 'YYYY-MM-DDTHH:mm:ssZ'

updateLocalJournal();


function updateLocalJournal() {
  const path = 'mock/local-journal.json';

  let data = getData(path);
  data.testSlot = updateTestSlots(data.testSlot);
  data.nonTestActivities = updateTestSlots(data.nonTestActivities);
  data.personalCommitment = updatePersonalCommitments(data.personalCommitment);
  data.advanceTestSlot = updateAdvanceTestSlots(data.advanceTestSlot);

  saveData(path, data);
};

function getData(path) {
  return JSON.parse(fs.readFileSync(path));
};

function saveData(path, data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
};

function updateTestSlots(testSlots) {

  if (testSlots.length === 0) { return [] };

  let newDate = createMoment();
  let dateProcessing = createMoment(testSlots[0].slotDetail.start);

  testSlots.forEach(slot => {
    let slotDate = createMoment(slot.slotDetail.start)

    dateProcessing = caculateNewProcessingDate(dateProcessing, slotDate, newDate);

    slot.slotDetail.start = updateDate(slotDate, newDate);
  });

  return testSlots;
};

function updatePersonalCommitments(personalCommitments) {
    /*
      For some reason the date is split into 2 parts for Personal Commitments.
      Due to this I do some additional formatting so we can still use strict formats in moment.js
    */

  if (personalCommitments.length === 0) { return [] };

  let newDate = createMoment();

  let dateProcessingString =
    formatDate(personalCommitments[0].startDate,personalCommitments[0].startTime);
  let dateProcessing = createMoment(dateProcessingString);

  personalCommitments.forEach(commitment => {

    let commitmentDateString = formatDate(commitment.startDate, commitment.startTime);
    let commitmentDate = createMoment(commitmentDateString);

    dateProcessing =
      caculateNewProcessingDate(dateProcessing, commitmentDate, newDate);

    commitment.startDate =
      createMoment(updateDate(commitmentDate, newDate)).format('YYYY-MM-DD');
  });
  return personalCommitments;
}

function updateAdvanceTestSlots(testSlots) {

  if (testSlots.length === 0) { return [] };

  let newDate = createMoment();
  let dateProcessing = createMoment(testSlots[0].start);

  testSlots.forEach(slot => {
    let slotDate = createMoment(slot.start)

    processingDate =
      caculateNewProcessingDate(dateProcessing, slotDate, newDate);

    slot.start = updateDate(slotDate, newDate);
  });

  return testSlots;
}

function doesMatch(a, b) {
  return a.isSame(b, 'day');
};

function caculateDiffInDays(a, b) {
  return createMoment(a).startOf('day').diff(createMoment(b).startOf('day'), 'days');
}

function createMoment(date) {
  if (date) {
    return moment(date, dateFormat, true);
  }
  return moment()
}

function updateDate(currentDate, newDate) {
  let daysToAdd = caculateDiffInDays(newDate, currentDate);
  return currentDate.add(daysToAdd, 'days').format(dateFormat);
};

function caculateNewProcessingDate(dateProcessing, itemDate, newDate) {
  if (doesMatch(dateProcessing, itemDate)) { return dateProcessing; }

  let daysToAdd = caculateDiffInDays(itemDate, dateProcessing)
  newDate.add(daysToAdd, 'days');
  return createMoment(itemDate);
}

function formatDate(startDate, startTime) {
  if(startTime) {
    return startDate + 'T' + startTime;
  }
  return startDate + 'T00:00:00+00:00';
}
