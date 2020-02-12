import { Action } from '@ngrx/store';
import { Circuit } from '@dvsa/mes-test-schema/categories/AM1';

export const CIRCUIT_TYPE_CHANGED = '[Test Summary] Circuit type changed';

export class CircuitTypeChanged implements Action {
  readonly type = CIRCUIT_TYPE_CHANGED;
  constructor(public circuitType: Circuit) { }
}

export type Types =
  | CircuitTypeChanged;
