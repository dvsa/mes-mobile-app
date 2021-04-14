import { question, question5 } from '../../../../modules/tests/test-data/cat-cpc/_tests_/test-data.cat-cpc.mock';
export var mockToggleEvent = {
    answer: {
        label: 'a description of some kind',
        selected: true,
    },
    questionNumber: 1,
    answerNumber: '2',
    score: 5,
};
export var catCPCTestData = {
    combination: 'LGV1',
    question1: question('4'),
    question2: question('2'),
    question3: question('5'),
    question4: question('1'),
    question5: question5(),
    totalPercent: 85,
};
//# sourceMappingURL=test-report.cat-cpc.mock.js.map