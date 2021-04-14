import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UrlProvider } from '../../url/url';
import { UrlProviderMock, LOGS_SERVICE_URL } from '../../url/__mocks__/url.mock';
import { LogsProvider } from '../logs';
import { LogType } from '../../../shared/models/log.model';
import { AuthenticationProvider } from '../../authentication/authentication';
import { AuthenticationProviderMock } from '../../authentication/__mocks__/authentication.mock';
import { Device } from '@ionic-native/device';
import { Store, StoreModule } from '@ngrx/store';
import { configureTestSuite } from 'ng-bullet';
describe('LogsProvider', function () {
    var logsProvider;
    var httpMock;
    var urlProviderMock;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                StoreModule.forRoot({
                    appInfo: function () { return ({
                        versionNumber: '5',
                    }); },
                }),
            ],
            providers: [
                LogsProvider,
                { provide: UrlProvider, useClass: UrlProviderMock },
                { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
                Device,
                Store,
            ],
        });
    });
    beforeEach(function () {
        httpMock = TestBed.get(HttpTestingController);
        logsProvider = TestBed.get(LogsProvider);
        urlProviderMock = TestBed.get(UrlProvider);
    });
    describe('sendLogs', function () {
        it('should sucessfully send the logs', function () {
            logsProvider.sendLogs([{
                    type: LogType.DEBUG,
                    message: 'Successfully logged multiple',
                    timestamp: new Date().getTime(),
                    drivingExaminerId: '1234567',
                }]).subscribe();
            httpMock.expectOne(LOGS_SERVICE_URL);
            expect(urlProviderMock.getLogsServiceUrl).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=logs.spec.js.map