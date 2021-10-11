import { PassCompletion } from '@dvsa/mes-test-schema/categories/CM';
import { PassCertificateNumberChanged } from '../../pass-completion.actions';
import { passCompletionCatManoeuvresReducer } from '../pass-completion.cat-manoeuvres.reducer';

const initialState: PassCompletion = {
  passCertificateNumber: null,
};

describe('passCompletionCatManoeuvresReducer', () => {
  it('should put the pass certificate number into the state on pass certificate number changed action', () => {
    const result = passCompletionCatManoeuvresReducer(
      initialState,
      new PassCertificateNumberChanged('ABC123'),
    );
    expect(result.passCertificateNumber).toBe('ABC123');
  });
});
