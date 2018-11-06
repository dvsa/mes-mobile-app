import { IAddress, ICandidateName } from '../../providers/journal/journal-model';

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
     ${address.line1}<br>
     ${address.line2}<br>
     ${address.line3}<br>
     ${address.line4}<br>
     ${address.line5}<br>
     ${address.postcode}
  `;
}
