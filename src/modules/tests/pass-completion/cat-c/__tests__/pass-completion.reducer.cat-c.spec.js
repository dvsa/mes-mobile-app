import { passCompletionCatCReducer, initialState } from '../pass-completion.cat-c.reducer';
import { PassCertificateNumberChanged, ProvisionalLicenseReceived, ProvisionalLicenseNotReceived, Code78Present, Code78NotPresent, } from '../../pass-completion.actions';
describe('pass completion reducer', function () {
    it('should put the pass certificate number into the state on pass certificate number changed action', function () {
        var result = passCompletionCatCReducer(initialState, new PassCertificateNumberChanged('ABC123'));
        expect(result.passCertificateNumber).toBe('ABC123');
    });
    it('should put that the provisional license was received into state when yes selected', function () {
        var result;
        result = passCompletionCatCReducer(result, new ProvisionalLicenseReceived());
        expect(result.provisionalLicenceProvided).toBe(true);
    });
    it('should put that the provisional license was not received into state when no selected', function () {
        var result;
        result = passCompletionCatCReducer(result, new ProvisionalLicenseNotReceived());
        expect(result.provisionalLicenceProvided).toBe(false);
    });
    it('should toggle whether the provisional license was received', function () {
        var result;
        result = passCompletionCatCReducer(initialState, new ProvisionalLicenseReceived());
        expect(result.provisionalLicenceProvided).toBe(true);
        result = passCompletionCatCReducer(result, new ProvisionalLicenseNotReceived());
        expect(result.provisionalLicenceProvided).toBe(false);
    });
    it('should put that the code 78 was present into the state when selected', function () {
        var result;
        result = passCompletionCatCReducer(result, new Code78Present());
        expect(result.code78Present).toBe(true);
    });
    it('should put that the code 78 was not present into the state when not selected', function () {
        var result;
        result = passCompletionCatCReducer(result, new Code78NotPresent());
        expect(result.code78Present).toBe(false);
    });
});
//# sourceMappingURL=pass-completion.reducer.cat-c.spec.js.map