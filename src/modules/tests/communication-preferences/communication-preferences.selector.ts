import { CommunicationPreferences } from '@dvsa/mes-test-schema/categories/B';

export const getCommunicationPreferenceUpdatedEmail
  = (communicationPreferences: CommunicationPreferences) =>
    communicationPreferences.updatedEmail ? communicationPreferences.updatedEmail : '';

export const getCommunicationPreferenceType
  = (communicationPreferences: CommunicationPreferences) => communicationPreferences.communicationMethod;
