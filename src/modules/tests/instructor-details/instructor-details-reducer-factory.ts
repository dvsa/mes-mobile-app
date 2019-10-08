
import { instructorDetailsReducer } from './instructor-details.reducer';
import { nullReducer } from '../../../shared/classes/null.reducer';
import { TestCategory } from '../../../shared/models/test-category';

export function instructorDetailsReducerFactory(category: string | null) {
  switch (category) {
    case TestCategory.B:
      return instructorDetailsReducer;
    case TestCategory.BE:
      // There are no instructor details so we return our null reducer
      return nullReducer;
    default:
      return instructorDetailsReducer;
  }
}
