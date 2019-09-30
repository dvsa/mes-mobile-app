
import { TestCategories } from '../../../shared/constants/test-categories';
import { instructorDetailsReducer } from './instructor-details.reducer';

export function instructorDetailsReducerFactory(category: string | null) {
  switch (category) {
    case TestCategories.B:
      return instructorDetailsReducer;
    case TestCategories.BE:
      console.log('this is instructorDetailsReducer for B+E');
      return undefined;
    default:
      return instructorDetailsReducer;
  }
}
