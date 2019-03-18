import { Candidate } from '../../../shared/models/DJournal';

export const getCandidateName = (candidate: Candidate): string => {
  const { title, firstName, lastName } = candidate.candidateName;
  return `${title} ${firstName} ${lastName}`;
};

export const getCandidateDriverNumber = (candidate: Candidate) => candidate.driverNumber;
