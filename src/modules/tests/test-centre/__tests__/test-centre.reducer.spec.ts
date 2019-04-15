import { TestCentre } from '@dvsa/mes-test-schema/categories/B';
import { testCentreReducer } from '../test-centre.reducer';
import { PopulateTestCentre } from '../test-centre.actions';

describe('testCentre reducer', () => {
  it('should return the tetcentre from a populate test centre action', () => {
    const mockTestCentre: TestCentre = {
      costCode: '1234',
    };
    const result = testCentreReducer(null, new PopulateTestCentre(mockTestCentre));

    expect(result).toBe(mockTestCentre);
  });
});
