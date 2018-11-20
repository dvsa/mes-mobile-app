import { IAddress, ICandidateName } from '../../providers/journal/journal-model';
import { isNonBlankString } from './string-utils';
/**
 * Returns concatenated Candidate name
 */
export function getFormattedCandidateName(candidateName: ICandidateName): string {
  return `${candidateName.firstName} ${candidateName.lastName}`;
}

/**
 * `Builds a formatted html structure from a given IAddress
 * todo - this is quick and dirty for now. Needs to deal with missing fields etc
 * @param address
 */
export function getFormattedAddress(address?: IAddress): string {
  return `
     ${isNonBlankString(address.line1) ? `${address.line1}<br />` : ''}
     ${isNonBlankString(address.line2) ? `${address.line2}<br />` : ''}
     ${isNonBlankString(address.line3) ? `${address.line3}<br />` : ''}
     ${isNonBlankString(address.line4) ? `${address.line4}<br />` : ''}
     ${isNonBlankString(address.line5) ? `${address.line5}<br />` : ''}
     ${isNonBlankString(address.postcode) ? `${address.postcode}<br />` : ''}
  `;
}
