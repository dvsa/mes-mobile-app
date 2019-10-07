
import { testDataReducerFactory } from '../test-data-reducer-factory';

import { testDataReducer } from '../test-data.reducer';
import { testDataCatBeReducer } from '../test-data.cat-be.reducer';
import { TestCategories } from '../../../../shared/constants/test-categories';

describe('test data reducer factory', () => {
  it('should create a cat B test data reducer', () => {
    const reducer = testDataReducerFactory(TestCategories.B);
    expect(reducer.name).toEqual(testDataReducer.name);
  });

  it('should create a cat B+E test data reducer', () => {
    const reducer = testDataReducerFactory(TestCategories.BE);
    expect(reducer.name).toEqual(testDataCatBeReducer.name);
  });

  it('should create a default (cat B) test data reducer', () => {
    const reducer = testDataReducerFactory(null);
    expect(reducer.name).toEqual(testDataReducer.name);
  });
});
