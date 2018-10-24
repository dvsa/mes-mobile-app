import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

/*
  Generated class for the HazardRecorderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HazardRecorderProvider {
  isSeriousRecordingEnabled = false;
  isSeriousRemovingEnabled = false;
  isDangerousRecordingEnabled = false;
  isDangerousRemovingEnabled = false;
  isRemovingFaultsEnabled = false;
  change: Subject<any> = new Subject();

  constructor() {}

  completionClosure: (() => void)[] = [];

  enableSeriousRecording(completionClosure: () => void) {
    this.isSeriousRecordingEnabled = true;
    this.change.next(this);
    this.completionClosure.push(completionClosure);
  }

  enableSeriousRemoving(completionClosure: () => void) {
    this.isDangerousRemovingEnabled = false;
    this.isSeriousRemovingEnabled = true;
    this.change.next(this);
    this.completionClosure.push(completionClosure);
  }

  enableDangerousRecording(completionClosure: () => void) {
    this.isDangerousRecordingEnabled = true;
    this.change.next(this);
    this.completionClosure.push(completionClosure);
  }

  enableDangerousRemoving(completionClosure: () => void) {
    this.isSeriousRemovingEnabled = false;
    this.isDangerousRemovingEnabled = true;
    this.change.next(this);
    this.completionClosure.push(completionClosure);
  }

  enableRemovingFaults(callback) {
    this.isRemovingFaultsEnabled = true;
    this.change.next(this);
    this.completionClosure.push(callback);
  }

  getEnabled(): string {
    if (this.isDangerousRecordingEnabled) return 'dangerous';
    if (this.isRemovingFaultsEnabled) return 'remove';
    if (this.isSeriousRecordingEnabled) return 'serious';
    return null;
  }

  disableRecording() {
    this.isSeriousRecordingEnabled = false;
    this.isSeriousRemovingEnabled = false;
    this.isDangerousRecordingEnabled = false;
    this.isDangerousRemovingEnabled = false;
    this.isRemovingFaultsEnabled = false;
    this.change.next(this);
    this.completionClosure.forEach((closure) => closure());
    this.completionClosure = [];
  }

  resetHazardRecording() {
    this.isSeriousRecordingEnabled = false;
    this.isDangerousRecordingEnabled = false;
  }

  isRecordingEnabled(): boolean {
    return this.isSeriousRecordingEnabled || this.isDangerousRecordingEnabled;
  }

  isRecordingOrRemoving(): boolean {
    return (
      this.isRecordingEnabled() ||
      this.isSeriousRemovingEnabled ||
      this.isDangerousRemovingEnabled ||
      this.isRemovingFaultsEnabled
    );
  }
}
