export var REKEY_REASON_VIEW_DID_LEAVE = '[RekeyReasonPage] Rekey Reason view did leave';
export var REKEY_REASON_VIEW_DID_ENTER = '[RekeyReasonPage] Rekey Reason view did enter';
export var IPAD_ISSUE_SELECTED = '[RekeyReasonPage] Rekey Reason Ipad Issue Selected';
export var IPAD_ISSUE_TECH_FAULT = '[RekeyReasonPage] Rekey Reason Ipad Issue Tech Fault Selected';
export var IPAD_ISSUE_LOST = '[RekeyReasonPage] Rekey Reason Ipad Issue Lost Selected';
export var IPAD_ISSUE_STOLEN = '[RekeyReasonPage] Rekey Reason Ipad Issue Stolen Selected';
export var IPAD_ISSUE_BROKEN = '[RekeyReasonPage] Rekey Reason Ipad Issue Broken Selected';
export var TRANSFER_SELECTED = '[RekeyReasonPage] Rekey Reason Transfer Selected';
export var OTHER_SELECTED = '[RekeyReasonPage] Rekey Reason Other Selected';
export var OTHER_REASON_UPDATED = '[RekeyReasonPage] Rekey Reason Other Reason Updated';
var RekeyReasonViewDidLeave = /** @class */ (function () {
    function RekeyReasonViewDidLeave() {
        this.type = REKEY_REASON_VIEW_DID_LEAVE;
    }
    return RekeyReasonViewDidLeave;
}());
export { RekeyReasonViewDidLeave };
var RekeyReasonViewDidEnter = /** @class */ (function () {
    function RekeyReasonViewDidEnter() {
        this.type = REKEY_REASON_VIEW_DID_ENTER;
    }
    return RekeyReasonViewDidEnter;
}());
export { RekeyReasonViewDidEnter };
var IpadIssueSelected = /** @class */ (function () {
    function IpadIssueSelected(selectedValue) {
        this.selectedValue = selectedValue;
        this.type = IPAD_ISSUE_SELECTED;
    }
    return IpadIssueSelected;
}());
export { IpadIssueSelected };
var IpadIssueTechFaultSelected = /** @class */ (function () {
    function IpadIssueTechFaultSelected() {
        this.type = IPAD_ISSUE_TECH_FAULT;
    }
    return IpadIssueTechFaultSelected;
}());
export { IpadIssueTechFaultSelected };
var IpadIssueLostSelected = /** @class */ (function () {
    function IpadIssueLostSelected() {
        this.type = IPAD_ISSUE_LOST;
    }
    return IpadIssueLostSelected;
}());
export { IpadIssueLostSelected };
var IpadIssueStolenSelected = /** @class */ (function () {
    function IpadIssueStolenSelected() {
        this.type = IPAD_ISSUE_STOLEN;
    }
    return IpadIssueStolenSelected;
}());
export { IpadIssueStolenSelected };
var IpadIssueBrokenSelected = /** @class */ (function () {
    function IpadIssueBrokenSelected() {
        this.type = IPAD_ISSUE_BROKEN;
    }
    return IpadIssueBrokenSelected;
}());
export { IpadIssueBrokenSelected };
var TransferSelected = /** @class */ (function () {
    function TransferSelected(selectedValue) {
        this.selectedValue = selectedValue;
        this.type = TRANSFER_SELECTED;
    }
    return TransferSelected;
}());
export { TransferSelected };
var OtherSelected = /** @class */ (function () {
    function OtherSelected(selectedValue) {
        this.selectedValue = selectedValue;
        this.type = OTHER_SELECTED;
    }
    return OtherSelected;
}());
export { OtherSelected };
var OtherReasonUpdated = /** @class */ (function () {
    function OtherReasonUpdated(otherReason) {
        this.otherReason = otherReason;
        this.type = OTHER_REASON_UPDATED;
    }
    return OtherReasonUpdated;
}());
export { OtherReasonUpdated };
//# sourceMappingURL=rekey-reason.actions.js.map