export type Competency = {
  competencyIdentifier: string;
  competencyDisplayName: string;
};

export type MultiFaultAssignableCompetency = {
  faultCount: number;
};

export type CommentedCompetency = {
  comment: string;
} & Competency;
