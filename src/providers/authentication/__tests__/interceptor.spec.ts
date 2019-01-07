import { JournalProvider } from './../../journal/journal';
import { CognitoIdentityWrapper } from './../cognitoIdentityWrapper';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptor';
import { AppConfigProvider } from '../../app-config/app-config';
import { AppConfigProviderMock } from '../../app-config/__mocks__/app-config.mock';
import { CognitoIdentityWrapperMock } from '../__mocks__/cognito-identity-wrapper.mock';
import { Platform } from 'ionic-angular';
import { PlatformMock } from 'ionic-mocks-jest';

describe('Authentication interceptor', () => {
  let httpMock: HttpTestingController;
  let interceptor: AuthInterceptor;
  let journalProvider: JournalProvider;
  let platform: Platform;
  let appConfig: AppConfigProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthInterceptor,
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        // { provide: JournalProvider, useClass: JournalProviderMock },
        JournalProvider,
        { provide: AppConfigProvider, useClass: AppConfigProviderMock },
        { provide: CognitoIdentityWrapper, useClass: CognitoIdentityWrapperMock },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ]
    });
    platform = TestBed.get(Platform);
    platform.is = jest.fn().mockReturnValue(false);
    httpMock = TestBed.get(HttpTestingController);
    interceptor = TestBed.get(AuthInterceptor);
    journalProvider = TestBed.get(JournalProvider);
    appConfig = TestBed.get(AppConfigProvider);
  });

  describe('Interceptor', () => {

    it('should compile', () => {
      expect(interceptor).toBeDefined;
    });

    it('should not modify the request if not on ios', () => {
      const { journalUrl } = appConfig.getAppConfig().journal;
      journalProvider.getJournal().subscribe(
        res => {},
        err => {}
      );
      const httpRequest = httpMock.expectOne(journalUrl);
      expect(httpRequest.request.headers.has('Authorization')).toBe(false);
    });

    it('should add the signed headers', () => {
      platform.is = jest.fn().mockReturnValue(true);
      const { journalUrl } = appConfig.getAppConfig().journal;
      journalProvider.getJournal().subscribe(
        res => {},
        err => {}
      );
      const httpRequest = httpMock.expectOne(journalUrl);
      expect(httpRequest.request.headers.has('Authorization')).toBe(true);
    });

  });

});
