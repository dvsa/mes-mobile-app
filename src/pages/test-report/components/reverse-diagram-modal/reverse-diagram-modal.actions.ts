import { Action } from '@ngrx/store';

export const REVERSE_DIAGRAM_VIEW_DID_ENTER = '[ReverseDiagramPage] Reverse Diagram Did Enter';
export const REVERSE_DIAGRAM_OPENED = '[ReverseDiagramPage] Reverse Diagram Opened';
export const REVERSE_DIAGRAM_CLOSED = '[ReverseDiagramPage] Reverse Diagram Closed';
export const REVERSE_DIAGRAM_LENGTH_CHANGED = '[ReverseDiagramPage] Change Vehicle Length';
export const REVERSE_DIAGRAM_WIDTH_CHANGED = '[ReverseDiagramPage] Change Vehicle Width';

export class ReverseDiagramViewDidEnter implements Action {
  readonly type = REVERSE_DIAGRAM_VIEW_DID_ENTER;
}

export class ReverseDiagramOpened implements Action {
  readonly type = REVERSE_DIAGRAM_OPENED;
}

export class ReverseDiagramClosed implements Action {
  readonly type = REVERSE_DIAGRAM_CLOSED;
}
export class ReverseDiagramLengthChanged implements Action {
  readonly type = REVERSE_DIAGRAM_LENGTH_CHANGED;
  constructor(public previousLength: number , public newLength: number) {}
}
export class ReverseDiagramWidthChanged implements Action {
  readonly type = REVERSE_DIAGRAM_WIDTH_CHANGED;
  constructor(public previousWidth: number , public newWidth: number) {}
}

export type Types =
  | ReverseDiagramViewDidEnter
  | ReverseDiagramOpened
  | ReverseDiagramClosed
  | ReverseDiagramLengthChanged
  | ReverseDiagramWidthChanged;
