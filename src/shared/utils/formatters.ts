import { IAddress, ICandidateName } from '../../providers/journal/journal-model';

/**
 * Returns concatenated Candidate name
 */
export function getFormattedCandidateName(candidateName: ICandidateName): string {
  return `${candidateName.title} ${candidateName.firstName} ${candidateName.lastName}`;
}

/**
 * `Builds a formatted html structure from a given IAddress
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
