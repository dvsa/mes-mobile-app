import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UrlProvider } from '../../url/url';
import { UrlProviderMock } from '../../url/__mocks__/url.mock';
import { LogsProvider } from '../logs';
import { LogType, Log } from '../../../shared/models/log.model';

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

  describe('log' , () => {
    it('should successfully send a log', () => {

      const testLog: Log = {
        type: LogType.DEBUG,
        message: 'Successfully logged one log',
        timestamp: new Date().getTime(),
      };

      logsProvider.logMultiple =
          jasmine.createSpy('logMultiple', logsProvider.logMultiple);

      logsProvider.log(testLog);

      expect(logsProvider.logMultiple).toHaveBeenCalledWith([testLog]);
    });
  });

  describe('logMultiple', () => {
    it('should sucessfully send the logs', () => {
      logsProvider.logMultiple([{
        type: LogType.DEBUG,
        message: 'Successfully logged multiple',
        timestamp: new Date().getTime(),
      }]);

      httpMock.expectOne('https://www.example.com/api/v1/logs');
      expect(urlProviderMock.getLoggingServiceUrl).toHaveBeenCalled();
    });
  });
});
