import { SearchResultTestSchema } from '@dvsa/mes-search-schema';

export const searchResultsMock: SearchResultTestSchema [] = [
  {
    activityCode: '1',
    applicationReference: '123456',
    category: 'B',
    costCode: 'abcd',
    staffNumber: '98765',
    testDate: new Date('2019-06-24T09:00:00'),
    candidateName: {
      firstName: 'Joe',
      lastName: 'Blogs',
      title: 'Mr',
    },
  },
  {
    activityCode: '2',
    applicationReference: '234567',
    category: 'B',
    costCode: 'mnbv',
    staffNumber: '98765',
    testDate: new Date('2019-06-24T010:00:00'),
    candidateName: {
      firstName: 'Alan',
      lastName: 'Smith',
      title: 'Mr',
    },
  },
];
