export var getReasonForRekey = function (test) {
    return test.rekeyReason;
};
export var getRekeyIpadIssue = function (rekeyReason) { return rekeyReason.ipadIssue; };
export var getRekeyTransfer = function (rekeyReason) { return rekeyReason.transfer; };
export var getRekeyOther = function (rekeyReason) { return rekeyReason.other; };
//# sourceMappingURL=rekey-reason.selector.js.map