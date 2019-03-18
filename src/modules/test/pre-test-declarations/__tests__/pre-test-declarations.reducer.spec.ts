import { preTestDeclarationsReducer, initialState } from '../pre-test-declarations.reducer';
import { ToggleInsuranceDeclaration, ToggleResidencyDeclaration } from '../pre-test-declarations.actions';

describe('PreTestDeclarations reducer', () => {
  it('should toggle the residency status when the toggle action is received', () => {
    const result = preTestDeclarationsReducer(initialState, new ToggleInsuranceDeclaration());
    expect(result.insuranceDeclarationAccepted).toBe(true);
  });

  it('should toggle the insurance status when the toggle action is received', () => {
    const result = preTestDeclarationsReducer(initialState, new ToggleResidencyDeclaration);
    expect(result.residencyDeclarationAccepted).toBe(true);
  });
});
