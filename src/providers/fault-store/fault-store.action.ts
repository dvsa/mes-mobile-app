import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { IFaultPayload, IFaultCalcPayload, ILastFaultPayload } from './fault-store.model';

export type FaultAction = FluxStandardAction<IFaultPayload, null>;
export type FaultUndoAction = FluxStandardAction<ILastFaultPayload, null>;
export type FaultAddAction = FluxStandardAction<IFaultCalcPayload, null>;
export type FaultDeleteAction = FluxStandardAction<IFaultCalcPayload, null>;
@Injectable()
export class FaultStoreActions {
  static readonly RESET_FAULTS = 'RESET_FAULTS';
  static readonly RESET_FAULT = 'RESET_FAULT';
  static readonly LOAD_FAULTS = 'LOAD_FAULTS';
  static readonly ADD_FAULTS = 'ADD_FAULTS';
  static readonly DELETE_FAULTS = 'DELETE_FAULTS';
  static readonly UNDO_FAULTS = 'UNDO_FAULTS';

  @dispatch()
  resetFaults = (): FaultAction => ({
    type: FaultStoreActions.RESET_FAULTS,
    meta: null,
    payload: null
  });

  @dispatch()
  resetFault = (id: string): FaultAction => ({
    type: FaultStoreActions.RESET_FAULT,
    meta: null,
    payload: { id }
  });

  @dispatch()
  loadFaults = (): FaultAction => ({
    type: FaultStoreActions.LOAD_FAULTS,
    meta: null,
    payload: null
  });

  @dispatch()
  addFault = (id: string, faultType: string): FaultAddAction => ({
    type: FaultStoreActions.ADD_FAULTS,
    meta: null,
    payload: { id, faultType }
  });

  @dispatch()
  removeFault = (id: string, faultType: string): FaultDeleteAction => ({
    type: FaultStoreActions.DELETE_FAULTS,
    meta: null,
    payload: { id, faultType }
  });
}
