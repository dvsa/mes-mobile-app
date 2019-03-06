import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UrlProvider } from '../../url/url';
import { UrlProviderMock, LOGS_SERVICE_URL } from '../../url/__mocks__/url.mock';
import { LogsProvider } from '../logs';
import { LogType } from '../../../shared/models/log.model';

describe('LogsProvider', () => {
  let logsProvider: LogsProvider;
  let httpMock: HttpTestingController;
  let urlProviderMock:  UrlProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        LogsProvider,
        { provide: UrlProvider, useClass: UrlProviderMock },
      ],
    });

    httpMock = TestBed.get(HttpTestingController);
    logsProvider = TestBed.get(LogsProvider);
    urlProviderMock = TestBed.get(UrlProvider);
  });

  describe('sendLogs', () => {
    it('should sucessfully send the logs', () => {
      logsProvider.sendLogs([{
        type: LogType.DEBUG,
        message: 'Successfully logged multiple',
        timestamp: new Date().getTime(),
      }]).subscribe();

      httpMock.expectOne(LOGS_SERVICE_URL);
      expect(urlProviderMock.getLogsServiceUrl).toHaveBeenCalled();
    });
  });
});
