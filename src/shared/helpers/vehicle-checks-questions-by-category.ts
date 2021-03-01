import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import {
  NUMBER_OF_SHOW_ME_QUESTIONS,
} from '../constants/show-me-questions/show-me-questions.cat-be.constants';
import {
  NUMBER_OF_TELL_ME_QUESTIONS,
} from '../constants/tell-me-questions/tell-me-questions.cat-be.constants';
import {
  NUMBER_OF_TELL_ME_QUESTIONS as NUMBER_OF_TELL_ME_QUESTIONS_CAT_C,
} from '../constants/tell-me-questions/tell-me-questions.cat-c.constants';

import {
  NUMBER_OF_SHOW_ME_QUESTIONS as NUMBER_OF_SHOW_ME_QUESTIONS_CAT_C,
} from '../constants/show-me-questions/show-me-questions.cat-c.constants';

import {
  NUMBER_OF_TELL_ME_QUESTIONS as NUMBER_OF_TELL_ME_QUESTIONS_CAT_CE,
} from '../constants/tell-me-questions/tell-me-questions.cat-ce.constants';

import {
  NUMBER_OF_SHOW_ME_QUESTIONS as NUMBER_OF_SHOW_ME_QUESTIONS_CAT_CE,
} from '../constants/show-me-questions/show-me-questions.cat-ce.constants';

import {
  NUMBER_OF_TELL_ME_QUESTIONS as NUMBER_OF_TELL_ME_QUESTIONS_CAT_D,
} from '../constants/tell-me-questions/tell-me-questions.cat-d.constants';

import {
  NUMBER_OF_SHOW_ME_QUESTIONS as NUMBER_OF_SHOW_ME_QUESTIONS_CAT_D,
} from '../constants/show-me-questions/show-me-questions.cat-d.constants';

import {
  NUMBER_OF_TELL_ME_QUESTIONS as NUMBER_OF_TELL_ME_QUESTIONS_CAT_DE,
} from '../constants/tell-me-questions/tell-me-questions.cat-de.constants';

import {
  NUMBER_OF_SHOW_ME_QUESTIONS as NUMBER_OF_SHOW_ME_QUESTIONS_CAT_DE,
} from '../constants/show-me-questions/show-me-questions.cat-de.constants';

export const vehicleChecksQuestionsByCategory = (category: TestCategory): number => {
  switch (category) {
    case TestCategory.BE:
      return NUMBER_OF_SHOW_ME_QUESTIONS + NUMBER_OF_TELL_ME_QUESTIONS;
    case TestCategory.C:
    case TestCategory.C1:
      return NUMBER_OF_TELL_ME_QUESTIONS_CAT_C + NUMBER_OF_SHOW_ME_QUESTIONS_CAT_C;
    case TestCategory.D:
    case TestCategory.D1:
      return NUMBER_OF_TELL_ME_QUESTIONS_CAT_D + NUMBER_OF_SHOW_ME_QUESTIONS_CAT_D;
    case TestCategory.CE:
    case TestCategory.C1E:
      return NUMBER_OF_TELL_ME_QUESTIONS_CAT_CE + NUMBER_OF_SHOW_ME_QUESTIONS_CAT_CE;
    case TestCategory.DE:
    case TestCategory.D1E:
      return NUMBER_OF_TELL_ME_QUESTIONS_CAT_DE + NUMBER_OF_SHOW_ME_QUESTIONS_CAT_DE;
  }
};
