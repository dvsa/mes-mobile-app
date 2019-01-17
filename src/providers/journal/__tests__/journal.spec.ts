import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JournalProvider } from '../journal';
import { AppConfigProvider } from '../../app-config/app-config';
import { AuthenticationProvider } from '../../authentication/authentication';
import { AuthenticationProviderMock } from '../../authentication/__mocks__/authentication.mock';
import { AppConfigProviderMock } from '../../app-config/__mocks__/app-config.mock';

describe('JournalProvider', () => {
  describe('getJournal', () => {

    let journalProvider;
    let httpMock;
    let authProviderMock;
    let appConfigMock;
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule
        ],
        providers: [
          JournalProvider,
          { provide: AppConfigProvider, useClass: AppConfigProviderMock },
          { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        ],
      });

      httpMock = TestBed.get(HttpTestingController);
      journalProvider = TestBed.get(JournalProvider);
      authProviderMock = TestBed.get(AuthenticationProvider);
      appConfigMock = TestBed.get(AppConfigProvider);
    });

    it('should use the configured URL populated with the staff ID to get the journal', () => {
      journalProvider.getJournal(null).subscribe();

      httpMock.expectOne('https://www.example.com/api/v1/journals/12345678/personal');
      expect(authProviderMock.getEmployeeId).toHaveBeenCalled();
      expect(appConfigMock.getPersonalJournalUrl).toHaveBeenCalledWith('12345678');
    });

  });
});
