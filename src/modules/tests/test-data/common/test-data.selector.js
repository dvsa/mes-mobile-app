export var hasSeriousFault = function (data, competency) { return data.seriousFaults[competency]; };
export var hasDangerousFault = function (data, competency) { return data.dangerousFaults[competency]; };
export var getTestRequirements = function (data) { return data.testRequirements; };
export var getETA = function (data) { return data.ETA; };
export var getETAFaultText = function (data) {
    if (!data)
        return;
    if (data.physical && !data.verbal)
        return 'Physical';
    if (!data.physical && data.verbal)
        return 'Verbal';
    if (data.physical && data.verbal)
        return 'Physical and Verbal';
    return;
};
export var hasExaminerTakenAction = function (data, action) {
    return data[action];
};
export var getEco = function (data) { return data.eco; };
export var getEcoFaultText = function (data) {
    if (!data)
        return;
    if (data.adviceGivenControl && !data.adviceGivenPlanning)
        return 'Control';
    if (!data.adviceGivenControl && data.adviceGivenPlanning)
        return 'Planning';
    if (data.adviceGivenControl && data.adviceGivenPlanning)
        return 'Control and Planning';
    return;
};
export var getShowMeQuestionOptions = function (questions, outcome, provider) {
    var filteredQuestions = [];
    var showNotApplicable = provider.showNotApplicable(outcome, 'showMeQuestion');
    questions.forEach(function (value) {
        if (value.code !== 'N/A' || (value.code === 'N/A' && showNotApplicable)) {
            filteredQuestions.push(value);
        }
    });
    return filteredQuestions;
};
//# sourceMappingURL=test-data.selector.js.map