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
import { AuthenticationProvider } from '../authentication';
import { AuthenticationProviderMock } from '../__mocks__/authentication.mock';
import { UrlProvider } from '../../url/url';
import { UrlProviderMock } from '../../url/__mocks__/url.mock';

describe('Authentication interceptor', () => {
  let httpMock: HttpTestingController;
  let interceptor: AuthInterceptor;
  let journalProvider: JournalProvider;
  let platform: Platform;
  let urlProvider: UrlProvider;
  let journalUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthInterceptor,
        JournalProvider,
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AppConfigProvider, useClass: AppConfigProviderMock },
        { provide: CognitoIdentityWrapper, useClass: CognitoIdentityWrapperMock },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: UrlProvider, useClass: UrlProviderMock },
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
    urlProvider = TestBed.get(UrlProvider);
    journalUrl = urlProvider.getPersonalJournalUrl('');
  });

  describe('Interceptor', () => {

    it('should compile', () => {
      expect(interceptor).toBeDefined;
    });

    it('should not modify the request if not on ios', () => {
      journalProvider.getJournal(null).subscribe(
        res => {},
        err => {}
      );
      const httpRequest = httpMock.expectOne(journalUrl);
      expect(httpRequest.request.headers.has('Authorization')).toBe(false);
      expect(httpRequest.request.headers.has('X-Amz-Date')).toBe(false);
      expect(httpRequest.request.headers.has('X-Amz-Security-Token')).toBe(false);
    });

    it('should add the signed headers if running on ios', () => {
      platform.is = jest.fn().mockReturnValue(true);
      journalProvider.getJournal(null).subscribe(
        res => {},
        err => {}
      );
      const httpRequest = httpMock.expectOne(journalUrl);
      expect(httpRequest.request.headers.has('Authorization')).toBe(true);
      expect(httpRequest.request.headers.has('X-Amz-Date')).toBe(true);
      expect(httpRequest.request.headers.has('X-Amz-Security-Token')).toBe(true);
    });

  });

});
