
import { instructorDetailsReducerFactory } from '../instructor-details-reducer-factory';

import { instructorDetailsReducer } from '../instructor-details.reducer';
import { nullReducer } from '../../../../shared/classes/null.reducer';
import { TestCategory } from '../../../../shared/models/test-category';

describe('instructor details reducer factory', () => {
  it('should create a cat B instructor details reducer', () => {
    const reducer = instructorDetailsReducerFactory(TestCategory.B);
    expect(reducer.name).toEqual(instructorDetailsReducer.name);
  });

  it('should return undefined for cat B+E instructor details reducer', () => {
    const reducer = instructorDetailsReducerFactory(TestCategory.BE);
    expect(reducer.name).toBe(nullReducer.name);
  });

  it('should create a default (cat B) instructor details reducer', () => {
    const reducer = instructorDetailsReducerFactory(null);
    expect(reducer.name).toEqual(instructorDetailsReducer.name);
  });
});
