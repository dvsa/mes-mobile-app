#! /usr/bin/env node

import * as fs from 'fs';
import * as moment from 'moment';
import { ExaminerWorkSchedule } from '../src/shared/models/DJournal';

/**
 *  The class below is also found in MES-Journal-Service in src/functions/getJournal/application/service/FindJournal.ts
 *  So if you find a bug please fix it in both places.
 */
class DateUpdater {

  private dateFormat = 'YYYY-MM-DDTHH:mm:ssZ';
  private hasSkippedSunday = false;

  constructor(public data: ExaminerWorkSchedule) { }

  public updateTestSlots = (): DateUpdater => {
    if (!this.data.testSlots) { return this; }

    this.updateSlots(this.data.testSlots);
    return this;
  }

  public updateNonTestActivities = (): DateUpdater => {
    if (!this.data.nonTestActivities) { return this; }

    this.updateSlots(this.data.nonTestActivities);
    return this;
  }

  public updatePersonalCommitments = (): DateUpdater => {

    if (!this.data.personalCommitments || this.data.personalCommitments.length === 0) { return this; }

    const newDate = this.createMoment();

    const dateProcessingString =
      this.formatDate(this.data.personalCommitments[0].startDate, this.data.personalCommitments[0].startTime);

    let dateProcessing = this.createMoment(dateProcessingString);

    this.data.personalCommitments.forEach(commitment => {

      const commitmentDateString = this.formatDate(commitment.startDate, commitment.startTime);
      const commitmentDate = this.createMoment(commitmentDateString);

      dateProcessing =
        this.caculateNewProcessingDate(dateProcessing, commitmentDate, newDate);

      commitment.startDate =
        this.createMoment(this.updateDate(commitmentDate, newDate)).format('YYYY-MM-DD');
    });
    return this;

  }

  public updateAdvancedTestSlots = (): DateUpdater => {
    if (!this.data.advanceTestSlots || this.data.advanceTestSlots.length === 0) { return this; }

    const newDate = this.createMoment();
    let dateProcessing = this.createMoment(this.data.advanceTestSlots[0].slotDetail.start);

    this.data.advanceTestSlots.forEach(slot => {
      const slotDate = this.createMoment(slot.slotDetail.start);

      dateProcessing =
        this.caculateNewProcessingDate(dateProcessing, slotDate, newDate);

      slot.slotDetail.start = this.updateDate(slotDate, newDate);
    });

    return this;
  }

  public getData = (): ExaminerWorkSchedule => {
    return this.data;
  }

  private updateSlots = (slots: any[]) => {

    if (!slots || slots.length === 0 || !slots[0].slotDetail || !slots[0].slotDetail.start) {
      return;
    }

    const newDate = this.createMoment();
    let dateProcessing = this.createMoment(slots[0].slotDetail.start);

    slots.forEach(slot => {
      if (!slot.slotDetail || !slot.slotDetail.start) { return; }

      const slotDate = this.createMoment(slot.slotDetail.start);

      dateProcessing = this.caculateNewProcessingDate(dateProcessing, slotDate, newDate);

      slot.slotDetail.start = this.updateDate(slotDate, newDate);
    });
  }

  private doesMatch = (a: moment.Moment, b: moment.Moment): boolean => {
    return a.isSame(b, 'day');
  }

  private caculateDiffInDays = (a: moment.Moment, b: moment.Moment): number => {
    return this.createMoment(a).startOf('day').diff(this.createMoment(b).startOf('day'), 'days');
  }

  private createMoment = (date?: string | moment.Moment): moment.Moment => {
    if (date) {
      return moment(date, this.dateFormat, true);
    }
    return moment();
  }

  private updateDate = (currentDate: moment.Moment, newDate: moment.Moment): string => {
    const daysToAdd = this.caculateDiffInDays(newDate, currentDate);
    return currentDate.add(daysToAdd, 'days').format(this.dateFormat);
  }

  private caculateNewProcessingDate =
    (dateProcessing: moment.Moment, itemDate: moment.Moment, newDate: moment.Moment): moment.Moment => {
      if (this.doesMatch(dateProcessing, itemDate)) { return dateProcessing; }

      const daysToAdd = this.caculateDiffInDays(itemDate, dateProcessing);
      newDate.add(daysToAdd, 'days');

      // Skip Sunday's
      const sunday = 0;
      if (newDate.day() === sunday || this.hasSkippedSunday) {
        newDate.add(1, 'day');
        this.hasSkippedSunday = true;
      }
      return this.createMoment(itemDate);
    }

  private formatDate = (startDate: string, startTime: String): string => {
    if (startTime) {
      return startDate + 'T' + startTime;
    }
    return startDate + 'T00:00:00+00:00';
  }
}

updateLocalJournal();

function updateLocalJournal() {
  const path = 'mock/local-journal.json';

  const updatedData = new DateUpdater(getData(path))
    .updateTestSlots()
    .updateNonTestActivities()
    .updatePersonalCommitments()
    .updateAdvancedTestSlots()
    .getData();

  saveData(path, updatedData);
}

function getData(path: string): ExaminerWorkSchedule {
  return JSON.parse(fs.readFileSync(path).toString());
}

function saveData(path: string, data: ExaminerWorkSchedule) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}
