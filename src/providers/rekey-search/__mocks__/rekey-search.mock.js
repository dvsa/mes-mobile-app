import { of } from 'rxjs';
import { bookedTestMockHash } from './booked-test.mock';
var RekeySearchProviderMock = /** @class */ (function () {
    function RekeySearchProviderMock() {
    }
    RekeySearchProviderMock.prototype.getBooking = function (params) {
        return of(bookedTestMockHash);
    };
    return RekeySearchProviderMock;
}());
export { RekeySearchProviderMock };
//# sourceMappingURL=rekey-search.mock.js.map