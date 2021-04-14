import { of } from 'rxjs';
var FindUserProviderMock = /** @class */ (function () {
    function FindUserProviderMock() {
    }
    FindUserProviderMock.prototype.userExists = function (staffNumber) {
        return of();
    };
    return FindUserProviderMock;
}());
export { FindUserProviderMock };
//# sourceMappingURL=find-user.mock.js.map