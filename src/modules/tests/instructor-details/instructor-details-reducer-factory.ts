
import { TestCategories } from '../../../shared/constants/test-categories';
import { instructorDetailsReducer } from './instructor-details.reducer';

export function instructorDetailsReducerFactory(category: string | null) {
  switch (category) {
    case TestCategories.B:
      return instructorDetailsReducer;
    case TestCategories.BE:
      // There is no intructor details in cat b+e
      return () => undefined;
    default:
      return instructorDetailsReducer;
  }
}
