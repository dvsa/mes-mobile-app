import { Injectable } from '@angular/core';
import { NgRedux, DevToolsExtension } from '@angular-redux/store';
import { combineReducers } from 'redux';

import { Observable } from 'rxjs/Observable';
import { IState, IFaultElementState, ITestResults } from './fault-store.model';
import { faultReducer as faults } from './fault.reducer';
import { FaultStoreActions } from './fault-store.action';
import { TestResult } from '../../components/test-summary/enums/TestResult';
import { FaultTitle } from '../../components/test-summary/enums/FaultTitle';
import { Observer } from 'rxjs';

declare var require;

const reduxLogger = require('redux-logger');

@Injectable()
export class FaultStoreProvider {
  summaryLookups = require('../../assets/data/fault-summary-lookup.json');

  currentFaults$: Observable<IFaultElementState>;
  testResult: TestResult;

  INITIAL_STATE: IState = {
    faults: {}
  };

  testResults$: Observable<ITestResults>;

  drivingFaultsNumber = 0;
  seriousFaultsNumber = 0;
  dangerousFaultsNumber = 0;
  debriefConsent = false;

  constructor(
    private store: NgRedux<IState>,
    private faultActions: FaultStoreActions,
    public devTools: DevToolsExtension
  ) {
    const reducers = combineReducers<IState>({ faults });

    store.configureStore(
      reducers,
      this.INITIAL_STATE,
      [reduxLogger.createLogger()],
      devTools.isEnabled() ? [devTools.enhancer()] : []
    );

    this.faultActions.loadFaults();
    this.currentFaults$ = this.store.select((state) => state.faults);
  }

  reset() {
    this.faultActions.resetFaults();
  }

  resetFault(id) {
    this.faultActions.resetFault(id);
  }

  addFault(id, faultType) {
    this.faultActions.addFault(id, faultType);
  }

  removeFault(id, faultType) {
    this.faultActions.removeFault(id, faultType);
  }

  getState() {
    return this.store.getState();
  }

  private getSummaryText(key: string) {
    if (key in this.summaryLookups) {
      return this.summaryLookups[key];
    }

    return key;
  }

  getDebriefConsentStatus() {
    return this.debriefConsent;
  }

  setDebriefConsentStatus(status: boolean) {
    this.debriefConsent = status;
  }

  calculateFaultTotals(): ITestResults {
    let drivingFaultsNum = 0;
    let dangerousFaultsNum = 0;
    let seriousFaultsNum = 0;
    const seriousFaults = [];
    const dangerousFaults = [];
    const drivingFaults = [];

    const { faults } = this.getState();
    Object.keys(faults).forEach((fault) => {
      const faultText = this.getSummaryText(fault);

      if (faults[fault].fault) {
        drivingFaultsNum += faults[fault].fault;
        drivingFaults.push({
          name: faultText,
          total: faults[fault].fault
        });
      }
      if (faults[fault].dangerous) {
        dangerousFaultsNum += faults[fault].dangerous;
        dangerousFaults.push({
          name: faultText,
          total: faults[fault].fault
        });
      }
      if (faults[fault].serious) {
        seriousFaultsNum += faults[fault].serious;
        seriousFaults.push({
          name: faultText,
          total: faults[fault].fault
        });
      }
    });

    this.drivingFaultsNumber = drivingFaultsNum;
    this.seriousFaultsNumber = seriousFaultsNum;
    this.dangerousFaultsNumber = dangerousFaultsNum;

    const dangerousFaultSummary = {
      title: FaultTitle.Dangerous,
      total: dangerousFaultsNum,
      faults: dangerousFaults
    };
    const seriousFaultSummary = {
      title: FaultTitle.Serious,
      total: seriousFaultsNum,
      faults: seriousFaults
    };
    const drivingFaultSummary = {
      title: FaultTitle.DrivingFaults,
      total: drivingFaultsNum,
      faults: drivingFaults
    };

    return { dangerousFaultSummary, seriousFaultSummary, drivingFaultSummary };
  }

  getFaultTotals(): Observable<ITestResults> {
    return new Observable((observer: Observer<any>) => {
      observer.next(this.calculateFaultTotals());
      observer.complete();
    });
  }

  calculateTestResult() {
    const failResult =
      this.drivingFaultsNumber >= 16 ||
      this.seriousFaultsNumber > 0 ||
      this.dangerousFaultsNumber > 0;
    this.testResult = failResult ? TestResult.Fail : TestResult.Pass;
    return this.testResult;
  }

  getTestResult(): TestResult {
    this.calculateTestResult();
    return this.testResult;
  }
}
