
import { instructorDetailsReducerFactory } from '../instructor-details-reducer-factory';

import { instructorDetailsReducer } from '../instructor-details.reducer';
import { TestCategories } from '../../../../shared/constants/test-categories';

describe('instructor details reducer factory', () => {
  it('should create a cat B instructor details reducer', () => {
    const reducer = instructorDetailsReducerFactory(TestCategories.B);
    expect(reducer.name).toEqual(instructorDetailsReducer.name);
  });

  it('should return undefined for cat B+E instructor details reducer', () => {
    const reducer = instructorDetailsReducerFactory(TestCategories.BE);
    expect(reducer).toBe(undefined);
  });

  it('should create a default (cat B) instructor details reducer', () => {
    const reducer = instructorDetailsReducerFactory(null);
    expect(reducer.name).toEqual(instructorDetailsReducer.name);
  });
});
