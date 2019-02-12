import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UrlProvider } from '../../url/url';
import { UrlProviderMock } from '../../url/__mocks__/url.mock';
import { LoggingProvider } from '../logging';
import { LogType, Log } from '../logging.constants';

describe('LoggingProvider', () => {
  let loggingProvider: LoggingProvider;
  let httpMock: HttpTestingController;
  let urlProviderMock:  UrlProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        LoggingProvider,
        { provide: UrlProvider, useClass: UrlProviderMock },
      ],
    });

    httpMock = TestBed.get(HttpTestingController);
    loggingProvider = TestBed.get(LoggingProvider);
    urlProviderMock = TestBed.get(UrlProvider)
  });

  describe('log' , () => {
    it('should successfully send a log', () => {

        const testLog: Log = {
          type: LogType.DEBUG,
          message: 'Successfully logged one log'
        }

        loggingProvider.logMultiple =
          jasmine.createSpy('logMultiple', loggingProvider.logMultiple);

        loggingProvider.log(testLog);

        expect(loggingProvider.logMultiple).toHaveBeenCalledWith([testLog]);
    });
  });

  describe('logMultiple', () => {
    it('should sucessfully send the logs', () => {
      loggingProvider.logMultiple([{
        type: LogType.DEBUG,
        message: 'Successfully logged multiple'
      }]);

      httpMock.expectOne('https://www.example.com/api/v1/logs');
      expect(urlProviderMock.getLoggingServiceUrl).toHaveBeenCalled();
    });
  });
});
