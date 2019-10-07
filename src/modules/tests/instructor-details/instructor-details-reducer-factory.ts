
import { TestCategories } from '../../../shared/constants/test-categories';
import { instructorDetailsReducer } from './instructor-details.reducer';
import { nullReducer } from '../../../shared/classes/null.reducer';

export function instructorDetailsReducerFactory(category: string | null) {
  switch (category) {
    case TestCategories.B:
      return instructorDetailsReducer;
    case TestCategories.BE:
      // There are no instructor details so we return our null reducer
      return nullReducer;
    default:
      return instructorDetailsReducer;
  }
}
