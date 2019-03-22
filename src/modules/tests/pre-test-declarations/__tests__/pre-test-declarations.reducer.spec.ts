import { preTestDeclarationsReducer, initialState } from '../pre-test-declarations.reducer';
import {
  ToggleInsuranceDeclaration,
  ToggleResidencyDeclaration,
  SignatureDataChanged,
  SignatureDataCleared,
} from '../pre-test-declarations.actions';

describe('PreTestDeclarations reducer', () => {
  it('should toggle the residency status when the toggle action is received', () => {
    const result = preTestDeclarationsReducer(initialState, new ToggleInsuranceDeclaration());
    expect(result.insuranceDeclarationAccepted).toBe(true);
  });

  it('should toggle the insurance status when the toggle action is received', () => {
    const result = preTestDeclarationsReducer(initialState, new ToggleResidencyDeclaration);
    expect(result.residencyDeclarationAccepted).toBe(true);
  });

  it('should set the signature when the SignatureDataChanged action is received', () => {
    const result = preTestDeclarationsReducer(initialState, new SignatureDataChanged('ImSomeNewSignatureData'));
    expect(result.signature).toEqual('ImSomeNewSignatureData');
  });

  it('should clear the signature when the SignatureDataChanged action is received', () => {
    initialState.signature = 'SomeSignatureData';
    const result = preTestDeclarationsReducer(initialState, new SignatureDataCleared());
    expect(result.signature).toEqual('');
  });
});
