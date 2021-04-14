import { of } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
var TestSubmissionProviderMock = /** @class */ (function () {
    function TestSubmissionProviderMock() {
        this.submitTests = jasmine.createSpy('submitTests').and.returnValue(of([
            new HttpResponse({ status: 201 }),
            new HttpResponse({ status: 201 }),
            new HttpErrorResponse({ status: 500 }),
        ]));
    }
    return TestSubmissionProviderMock;
}());
export { TestSubmissionProviderMock };
//# sourceMappingURL=test-submission.mock.js.map