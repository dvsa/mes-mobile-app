import { Candidate } from '../../../shared/models/DJournal';

export const getCandidateName = (candidate: Candidate): string => {
  const { title, firstName, lastName } = candidate.candidateName;
  return `${title} ${firstName} ${lastName}`;
};

export const getUntitledCandidateName = (candidate: Candidate): string => {
  const { firstName, lastName } = candidate.candidateName;
  return `${firstName} ${lastName}`;
};

export const getCandidateDriverNumber = (candidate: Candidate) => candidate.driverNumber;

export const formatDriverNumber = (driverNumber: string) => {
  if (driverNumber.length > 14) {
    return `${driverNumber.slice(0, 5)} ${driverNumber.slice(5, 10)} ${driverNumber.slice(10)}`;
  }
  return driverNumber;
};
