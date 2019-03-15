import { waitingRoomReducer, initialState } from '../waiting-room.reducer';
import { ToggleInsuranceDeclaration, ToggleResidencyDeclaration } from '../waiting-room.actions';

describe('Waiting Room reducer', () => {
  it('should toggle the residency status when the toggle action is received', () => {
    const result = waitingRoomReducer(initialState, new ToggleInsuranceDeclaration());
    expect(result.insuranceDeclarationAccepted).toBe(true);
  });

  it('should toggle the insurance status when the toggle action is received', () => {
    const result = waitingRoomReducer(initialState, new ToggleResidencyDeclaration);
    expect(result.residencyDeclarationAccepted).toBe(true);
  });
});
