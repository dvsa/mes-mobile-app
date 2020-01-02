import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { PopulateCandidateDetails } from '../../cat-b/candidate/candidate.actions';
import { PopulateCandidateDetailsCatBE } from '../../cat-be/candidate/candidate.cat-be.actions';
import { PopulateCandidateDetailsCatC } from '../../cat-c/candidate/candidate.cat-c.actions';
import { Booking } from '@dvsa/mes-journal-schema';
import { get } from 'lodash';

export const createPopulateCandidateDetailsAction = (testCategory: string, booking: Booking) => {
  switch (testCategory) {
    case TestCategory.B:
      return new PopulateCandidateDetails(booking.candidate);
    case TestCategory.BE:
      return new PopulateCandidateDetailsCatBE({
        ...booking.candidate,
        businessAddress: get(booking, 'business.businessAddress'),
        businessName: get(booking, 'business.businessName'),
        businessTelephone: get(booking, 'business.telephone'),
      });
    case TestCategory.C:
      return new PopulateCandidateDetailsCatC({
        ...booking.candidate,
        businessAddress: get(booking, 'business.businessAddress'),
        businessName: get(booking, 'business.businessName'),
        businessTelephone: get(booking, 'business.telephone'),
      });
    default:
      throw new Error('No testCategory has been defined');
  }
};
