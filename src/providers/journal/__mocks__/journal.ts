import { Observable } from 'rxjs';

export const mockGetData = jest.fn().mockReturnValue(
  Observable.of([
    {
      candidateName: {
        title: 'Mr',
        firstName: 'Joe',
        lastName: 'Bloggs'
      },
      testCentreName: 'Colwick'
    },
    {
      candidateName: {
        title: 'Mrs',
        firstName: 'Jodie',
        lastName: 'Blogger'
      },
      testCentreName: 'Cardington'
    }
  ])
);

export class JournalProvider {
  getData = mockGetData;
}
