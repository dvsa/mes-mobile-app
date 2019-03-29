import { WaitingRoomToCarModel, EyesightRadioState } from './waiting-room-to-car.reducer';

export const getEyesightRadioState = (wrtc: WaitingRoomToCarModel) => wrtc.eyesightRadioState;
export const isEyesightPassRadioSelected = (es: EyesightRadioState) => es === EyesightRadioState.PassSelected;
export const isEyesightFailRadioSelected = (es: EyesightRadioState) => es === EyesightRadioState.FailSelected;
