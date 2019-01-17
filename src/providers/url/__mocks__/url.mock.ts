export class UrlProviderMock {

  getPersonalJournalUrl = jest.fn().mockReturnValue('https://www.example.com/api/v1/journals/12345678/personal');

}
