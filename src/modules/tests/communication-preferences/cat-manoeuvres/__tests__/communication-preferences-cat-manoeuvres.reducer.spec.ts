import { CommunicationPreferences } from '@dvsa/mes-test-schema/categories/CM';
import { CandidateChoseToProceedWithTestInEnglish } from '../../communication-preferences.actions';
import { communicationPreferencesCatManoeuvresReducer } from '../communication-preferences-cat-manoeuvres.reducer';

const initialState: CommunicationPreferences = {
  conductedLanguage: 'Not provided',
};
describe('communicationPreferencesCatManoeuvresReducer', () => {
  it('should set the conducted language to english', () => {
    const result = communicationPreferencesCatManoeuvresReducer(
      initialState,
      new CandidateChoseToProceedWithTestInEnglish('English'),
    );
    expect(result.conductedLanguage).toEqual('English');
  });
});
