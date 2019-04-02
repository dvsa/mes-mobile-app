import { InstructorDetails } from '@dvsa/mes-test-schema/categories/B';

export const getInstructorRegistrationNumber =
    (instructorDetails: InstructorDetails) => instructorDetails.registrationNumber;
