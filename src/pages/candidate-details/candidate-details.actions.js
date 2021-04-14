export var CANDIDATE_DETAILS_VIEW_DID_ENTER = '[CandidateDetailsPage] Candidate details view did enter';
export var CANDIDATE_DETAILS_SLOT_CHANGE_VIEWED = '[CandidateDetailsPage] Candidate details slot change viewed';
var CandidateDetailsViewDidEnter = /** @class */ (function () {
    function CandidateDetailsViewDidEnter(slot) {
        this.slot = slot;
        this.type = CANDIDATE_DETAILS_VIEW_DID_ENTER;
    }
    return CandidateDetailsViewDidEnter;
}());
export { CandidateDetailsViewDidEnter };
var CandidateDetailsSlotChangeViewed = /** @class */ (function () {
    function CandidateDetailsSlotChangeViewed(slotId) {
        this.slotId = slotId;
        this.type = CANDIDATE_DETAILS_SLOT_CHANGE_VIEWED;
    }
    return CandidateDetailsSlotChangeViewed;
}());
export { CandidateDetailsSlotChangeViewed };
//# sourceMappingURL=candidate-details.actions.js.map