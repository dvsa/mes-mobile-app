import { TestSummary } from '@dvsa/mes-test-schema/categories/CM';
import { testSummaryCatManoeuvresReducer } from '../test-summary.cat-manoeuvres.reducer';
import { D255No } from '../../common/test-summary.actions';

const initialState: TestSummary = {
  D255: null,
};
describe('testSummaryCatManoeuvresReducer', () => {
  it('should set the D255 to true', () => {
    const result = testSummaryCatManoeuvresReducer(initialState, new D255No());
    expect(result.D255).toBe(false);
  });
});
