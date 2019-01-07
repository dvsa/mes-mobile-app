// import { TestBed } from '@angular/core/testing';
// import { AuthenticationProvider } from '../authentication';
// import {
//   HttpClientTestingModule,
//   HttpTestingController
// } from '@angular/common/http/testing';
// import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
// import { AuthInterceptor } from '../interceptor';
// import { AppConfigProvider } from '../../app-config/app-config';
// import { AppConfigProviderMock } from '../../app-config/__mocks__/app-config.mock';
// import { CognitoIdentityCredentialsMock } from '../__mocks__/cognito-identity-credentials.mock';
// import { Platform } from 'ionic-angular';
// import { PlatformMock } from 'ionic-mocks-jest';
// import { CognitoIdentityCredentials } from 'aws-sdk';

// describe('Authentication interceptor', () => {
//   let authenticationService: AuthenticationProvider;
//   let httpMock: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [
//         AuthenticationProvider,
//         { provide: Platform, useFactory: () => PlatformMock.instance() },
//         { provide: AppConfigProvider, useClass: AppConfigProviderMock },
//         {
//           provide: HTTP_INTERCEPTORS,
//           useClass: AuthInterceptor,
//           multi: true
//         }
//       ]
//     });
//     authenticationService = TestBed.get(AuthenticationProvider);
//     httpMock = TestBed.get(HttpTestingController);
//   });

// });
