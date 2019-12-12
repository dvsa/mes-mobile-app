import { Action } from '@ngrx/store';

export const REVERSE_DIAGRAM_VIEW_DID_ENTER = '[ReverseDiagramPage] Reverse Diagram Did Enter';
export const REVERSE_DIAGRAM_OPENED = '[ReverseDiagramPage] Reverse Diagram Opened';
export const REVERSE_DIAGRAM_CLOSED = '[ReverseDiagramPage] Reverse Diagram Closed';

export class ReverseDiagramViewDidEnter implements Action {
  readonly type = REVERSE_DIAGRAM_VIEW_DID_ENTER;
}

export class ReverseDiagramOpened implements Action {
  readonly type = REVERSE_DIAGRAM_OPENED;
}

export class ReverseDiagramClosed implements Action {
  readonly type = REVERSE_DIAGRAM_CLOSED;
}
export type Types =
  | ReverseDiagramViewDidEnter
  | ReverseDiagramOpened
  | ReverseDiagramClosed;
