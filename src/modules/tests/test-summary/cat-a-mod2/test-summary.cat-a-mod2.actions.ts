import { Action } from '@ngrx/store';
import { ModeOfTransport } from '@dvsa/mes-test-schema/categories/AM2';

export const MODE_OF_TRANSPORT_CHANGED = '[Test Summary] [CatAMod2] Mode of transport changed';

export class ModeOfTransportChanged implements Action {
  readonly type = MODE_OF_TRANSPORT_CHANGED;
  constructor(public modeOfTransport: ModeOfTransport) { }
}

export type Types =
  | ModeOfTransportChanged;
