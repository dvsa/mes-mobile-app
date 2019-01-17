import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JournalProvider } from '../journal';
import { remoteEnvironmentMock, localEnvironmentMock } from '../../app-config/__mocks__/environment.mock';
import { AppConfigProvider } from '../../app-config/app-config';
import { AuthenticationProvider } from '../../authentication/authentication';
import { AuthenticationProviderMock } from '../../authentication/__mocks__/authentication.mock';

describe('JournalProvider', () => {
  describe('getJournal', () => {

    let journalProvider;
    let httpMock;
    let authProviderMock;
    let appConfig;
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule
        ],
        providers: [
          JournalProvider,
          { provide: AppConfigProvider, useClass: AppConfigProvider, environmentFile: remoteEnvironmentMock },
          { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        ],
      });

      httpMock = TestBed.get(HttpTestingController);
      journalProvider = TestBed.get(JournalProvider);
      authProviderMock = TestBed.get(AuthenticationProvider);
      appConfig = TestBed.get(AppConfigProvider);
    });

    it('should create', () => {
      expect(journalProvider).toBeDefined();
    });

    it('should use the configured URL populated with the staff ID to get the journal', () => {
      appConfig.environmentFile = localEnvironmentMock;
      appConfig.refreshConfigSettings();
      journalProvider.getJournal(null).subscribe();
      httpMock.expectOne('https://www.example.com/api/v1/journals/a/today');
      expect(authProviderMock.getEmployeeId).toHaveBeenCalled();
    });

  });
});