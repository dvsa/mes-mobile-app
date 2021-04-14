import { of } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
var localJournalJson = require('../../../../mock/local-journal.json');
var JournalProviderMock = /** @class */ (function () {
    function JournalProviderMock() {
        this.do304ErrorNextCall = false;
        this.doTimeoutErrorNextCall = false;
        this.doActualError = false;
        this.saveJournalForOffline = function () { };
    }
    JournalProviderMock.prototype.getJournal = function () {
        if (this.do304ErrorNextCall) {
            return ErrorObservable.create({ status: 304 });
        }
        if (this.doTimeoutErrorNextCall) {
            return ErrorObservable.create({ message: 'Timeout has occurred' });
        }
        if (this.doActualError) {
            return ErrorObservable.create({});
        }
        return of(JournalProviderMock.mockJournal);
    };
    JournalProviderMock.prototype.setupHttp304Error = function () {
        this.do304ErrorNextCall = true;
    };
    JournalProviderMock.prototype.setupActualError = function () {
        this.doActualError = true;
    };
    JournalProviderMock.prototype.setupTimeoutError = function () {
        this.doTimeoutErrorNextCall = true;
    };
    JournalProviderMock.mockJournal = localJournalJson;
    return JournalProviderMock;
}());
export { JournalProviderMock };
//# sourceMappingURL=journal.mock.js.map