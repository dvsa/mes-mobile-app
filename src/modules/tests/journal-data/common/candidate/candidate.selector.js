export var getCandidateName = function (candidate) {
    var _a = candidate.candidateName, title = _a.title, firstName = _a.firstName, lastName = _a.lastName;
    return title ? title + " " + firstName + " " + lastName : firstName + " " + lastName;
};
export var getUntitledCandidateName = function (candidate) {
    var _a = candidate.candidateName, firstName = _a.firstName, lastName = _a.lastName;
    return firstName + " " + lastName;
};
export var getCandidateDriverNumber = function (candidate) { return candidate.driverNumber; };
export var formatDriverNumber = function (driverNumber) {
    if (driverNumber.length > 14) {
        return driverNumber.slice(0, 5) + " " + driverNumber.slice(5, 11) + " " + driverNumber.slice(11);
    }
    return driverNumber;
};
export var getCandidateEmailAddress = function (candidate) { return candidate.emailAddress ? candidate.emailAddress : ''; };
export var getPostalAddress = function (candidate) { return candidate.candidateAddress; };
export var getCandidateId = function (candidate) { return candidate.candidateId; };
//# sourceMappingURL=candidate.selector.js.map