export type Competency = {
  competencyIdentifier: string;
  competencyDisplayName: string;
};

export type MultiFaultAssignable = {
  faultCount: number;
};

export type CommentedCompetency = {
  comment: string;
} & Competency;
