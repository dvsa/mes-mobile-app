import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UrlProvider } from '../../url/url';
import { UrlProviderMock } from '../../url/__mocks__/url.mock';
import { AppConfigProvider } from '../../app-config/app-config';
import { AppConfigProviderMock } from '../../app-config/__mocks__/app-config.mock';
import { FindUserProvider } from '../find-user';
import { configureTestSuite } from 'ng-bullet';
describe('FindUserProvider', function () {
    var findUserProvider;
    var httpMock;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                FindUserProvider,
                { provide: UrlProvider, useClass: UrlProviderMock },
                { provide: AppConfigProvider, useClass: AppConfigProviderMock },
            ],
        });
    });
    beforeEach(function () {
        httpMock = TestBed.get(HttpTestingController);
        findUserProvider = TestBed.get(FindUserProvider);
    });
    describe('userExists', function () {
        it('should call the find user URL with the staff number', function () {
            var staffNumber = 1234567;
            findUserProvider.userExists(staffNumber).subscribe();
            httpMock.expectOne("https://www.example.com/api/v1/users/search/1234567");
        });
    });
});
//# sourceMappingURL=find-user.spec.js.map