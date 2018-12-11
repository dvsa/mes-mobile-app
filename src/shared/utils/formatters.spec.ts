import { IAddress, ICandidateName } from '../../providers/journal/journal-model';
import { getFormattedAddress, getFormattedCandidateName } from './formatters';

describe('formatters utility - ', () => {
  it('should format a candidates name ', () => {
    const candidateName: ICandidateName = {
      firstName: 'Steve',
      lastName: 'Strange',
      secondName: 'owt',
      title: 'Mr'
    };

    expect(getFormattedCandidateName(candidateName)).toEqual('Steve Strange');
  });

  it('should format an address ', () => {
    const address: IAddress = {
      line1: '1 New Road',
      line2: 'Grangemouth',
      line3: 'Some Area',
      line4: 'Big City',
      line5: 'Somethingshire',
      postcode: 'A23 6TY'
    };

    const expectedResult = `
     1 New Road<br />
     Grangemouth<br />
     Some Area<br />
     Big City<br />
     Somethingshire<br />
     A23 6TY<br />
  `;
    expect(getFormattedAddress(address)).toEqual(expectedResult);
  });
});
