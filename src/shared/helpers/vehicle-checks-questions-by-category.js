import { NUMBER_OF_SHOW_ME_QUESTIONS, } from '../constants/show-me-questions/show-me-questions.cat-be.constants';
import { NUMBER_OF_TELL_ME_QUESTIONS, } from '../constants/tell-me-questions/tell-me-questions.cat-be.constants';
import { NUMBER_OF_TELL_ME_QUESTIONS as NUMBER_OF_TELL_ME_QUESTIONS_NON_TRAILER, } from '../constants/tell-me-questions/tell-me-questions.vocational.constants';
import { NUMBER_OF_SHOW_ME_QUESTIONS as NUMBER_OF_SHOW_ME_QUESTIONS_NON_TRAILER, } from '../constants/show-me-questions/show-me-questions.vocational.constants';
import { NUMBER_OF_TELL_ME_QUESTIONS as NUMBER_OF_TELL_ME_QUESTIONS_TRAILER, } from '../constants/tell-me-questions/tell-me-questions.vocational-trailer.constants';
import { NUMBER_OF_SHOW_ME_QUESTIONS as NUMBER_OF_SHOW_ME_QUESTIONS_TRAILER, } from '../constants/show-me-questions/show-me-questions.vocational-trailer.constants';
export var vehicleChecksQuestionsByCategory = function (category) {
    switch (category) {
        case "B+E" /* BE */:
            return NUMBER_OF_SHOW_ME_QUESTIONS + NUMBER_OF_TELL_ME_QUESTIONS;
        case "C" /* C */:
        case "C1" /* C1 */:
        case "D" /* D */:
        case "D1" /* D1 */:
            return NUMBER_OF_SHOW_ME_QUESTIONS_NON_TRAILER + NUMBER_OF_TELL_ME_QUESTIONS_NON_TRAILER;
        case "C+E" /* CE */:
        case "C1+E" /* C1E */:
        case "D+E" /* DE */:
        case "D1+E" /* D1E */:
            return NUMBER_OF_SHOW_ME_QUESTIONS_TRAILER + NUMBER_OF_TELL_ME_QUESTIONS_TRAILER;
    }
};
//# sourceMappingURL=vehicle-checks-questions-by-category.js.map