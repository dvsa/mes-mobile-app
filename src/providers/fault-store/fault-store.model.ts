import { IFaultSummary } from '../../components/test-summary/interfaces/IFaultSummary';

export interface IState {
  faults: IFaultElementState;
}

export interface IFaultState {
  fault?: number;
  dangerous?: number;
  serious?: number;
}

export interface IFaultElementState {
  [id: string]: any;
}

export interface IFaultCalcPayload {
  id: string;
  faultType: string;
}

export interface ILastFaultPayload {
  id: string;
  faultType: string;
  action: string;
}
export interface IFaultPayload {
  id?: string;
}

export interface ITestResults {
  [summary: string]: IFaultSummary;
}
