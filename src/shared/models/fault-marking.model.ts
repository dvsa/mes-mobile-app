export type Competency = {
  competencyIdentifier: string;
  competencyDisplayName: string;
};

export type MultiFaultAssignableCompetency = {
  faultCount: number;
} & Competency;

export type CommentedCompetency = {
  comment: string;
} & Competency;
