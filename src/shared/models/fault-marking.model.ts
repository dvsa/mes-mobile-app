export type Competency = {
  competencyIdentifier: string;
  competencyDisplayName: string;
  source?: string;
};

export type MultiFaultAssignableCompetency = {
  faultCount: number;
} & Competency;

export type CommentedCompetency = {
  comment: string;
} & Competency;
