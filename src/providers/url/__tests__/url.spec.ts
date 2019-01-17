import { TestBed } from '@angular/core/testing';
import { UrlProvider } from '../url';
import { AppConfigProvider } from '../../app-config/app-config';
import { AppConfigProviderMock } from '../../app-config/__mocks__/app-config.mock';

describe('UrlProvider', () => {

  let urlProvider: UrlProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UrlProvider,
        { provide: AppConfigProvider, useClass: AppConfigProviderMock },
      ],
    });

    urlProvider = TestBed.get(UrlProvider);
  });

  describe('getPersonalJournalUrl', () => {
    it('should format the URL template from the AppConfigProvider with the provided staffNumber', () => {
      const url = urlProvider.getPersonalJournalUrl('12345678');
      expect(url).toBe('https://www.example.com/api/v1/journals/12345678/personal');
    });

    it('should format the URL with an unmapped staffNumber when no staffNumber is provided', () => {
      let url;
      url = urlProvider.getPersonalJournalUrl(null);
      expect(url).toBe('https://www.example.com/api/v1/journals/00000000/personal');
      url = urlProvider.getPersonalJournalUrl(undefined);
      expect(url).toBe('https://www.example.com/api/v1/journals/00000000/personal');
    });
  });
});
