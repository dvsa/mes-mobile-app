import { DateTime, Duration } from '../../../../../shared/helpers/date-time';
var JournalEarlyStartModalMock = /** @class */ (function () {
    function JournalEarlyStartModalMock() {
    }
    JournalEarlyStartModalMock.prototype.mockSlotDetail = function () {
        return {
            duration: 57,
            slotId: 123,
            start: new DateTime().add(6, Duration.MINUTE).toString(),
        };
    };
    return JournalEarlyStartModalMock;
}());
export { JournalEarlyStartModalMock };
//# sourceMappingURL=journal-early-start-modal.mock.js.map