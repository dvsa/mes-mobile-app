import { Injectable } from '@angular/core';
import { uniq } from 'lodash';

@Injectable()
export class TestSummaryMetadataProvider {
  constructor() {}

  selectedManoeuvre: string;
  eco = {
    done: false,
    selections: []
  };
  eta = {
    physical: false,
    verbal: false
  };
  controlledStopDone: boolean = false;

  updateManoeuvre(manoeuvre: string) {
    this.selectedManoeuvre = manoeuvre;
  }

  setEcoCompletion(bool: boolean) {
    this.eco.done = bool;
  }

  setEcoSelection(selection: string) {
    this.eco.selections.push(selection);
    this.eco.selections = uniq(this.eco.selections);
  }

  clearEcoSelections() {
    this.eco.selections = [];
  }

  updateETA(action: 'physical' | 'verbal', value: boolean) {
    this.eta[action] = value;
  }

  toggleControlledStopComplete() {
    this.controlledStopDone = !this.controlledStopDone;
  }

  reset() {
    this.selectedManoeuvre = undefined;
    this.eco = {
      done: false,
      selections: []
    };
    this.controlledStopDone = false;
    this.eta = {
      physical: false,
      verbal: false
    };
  }

  getMetadata() {
    return {
      selectedManoeuvre: this.selectedManoeuvre,
      eco: this.eco,
      eta: this.eta,
      controlledStopDone: this.controlledStopDone
    };
  }
}
