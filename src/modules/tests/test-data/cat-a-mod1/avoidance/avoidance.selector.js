export var getAvoidance = function (testData) { return testData.avoidance; };
export var getAvoidanceAttempted = function (avoidance) {
    return avoidance.firstAttempt !== undefined || avoidance.secondAttempt !== undefined;
};
//# sourceMappingURL=avoidance.selector.js.map