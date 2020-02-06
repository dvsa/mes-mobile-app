import { Action } from '@ngrx/store';

export const WAITING_ROOM_TO_CAR_VIEW_DID_ENTER = '[WaitingRoomToCarPage] Waiting Room To Car Did Enter';
export const WAITING_ROOM_TO_CAR_ERROR = '[WaitingRoomToCarPage] Waiting Room To Car Error';
export const WAITING_ROOM_TO_CAR_VALIDATION_ERROR
  = '[WaitingRoomToCarPage] Waiting Room To Car Validation Error';
export const WAITING_ROOM_TO_CAR_VIEW_BIKE_CATEGORY_MODAL
  = '[WaitingRoomToCarPage] Waiting Room To Car View Bike Category Modal';
export const WAITING_ROOM_TO_CAR_BIKE_CATEGORY_SELECTED
  = '[WaitingRoomToCarPage] Waiting Room To Car Bike Category Selected';
export const WAITING_ROOM_TO_CAR_BIKE_CATEGORY_CHANGED
  = '[WaitingRoomToCarPage] Waiting Room To Car Bike Category Changed';

export class WaitingRoomToCarViewDidEnter implements Action {
  readonly type = WAITING_ROOM_TO_CAR_VIEW_DID_ENTER;
}

export class WaitingRoomToCarError implements Action {
  readonly type = WAITING_ROOM_TO_CAR_ERROR;
  constructor(public errorMessage: string) { }
}

export class WaitingRoomToCarValidationError implements Action {
  readonly type = WAITING_ROOM_TO_CAR_VALIDATION_ERROR;
  constructor(public errorMessage: string) { }
}

export class WaitingRoomToCarViewBikeCategoryModal implements Action {
  readonly type = WAITING_ROOM_TO_CAR_VIEW_BIKE_CATEGORY_MODAL;
}

export class WaitingRoomToCarBikeCategorySelected implements Action {
  readonly type = WAITING_ROOM_TO_CAR_BIKE_CATEGORY_SELECTED;
  constructor(public bikeCategory: string) { }
}

export class WaitingRoomToCarBikeCategoryChanged implements Action {
  readonly type = WAITING_ROOM_TO_CAR_BIKE_CATEGORY_CHANGED;
  constructor(public initialBikeCategory: string, public selectedBikeCategory: string) { }
}

export type Types =
  | WaitingRoomToCarViewDidEnter
  | WaitingRoomToCarError
  | WaitingRoomToCarValidationError
  | WaitingRoomToCarViewBikeCategoryModal
  | WaitingRoomToCarBikeCategorySelected
  | WaitingRoomToCarBikeCategoryChanged;
