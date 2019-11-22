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

export enum CommentSource {
  SIMPLE = 'simple',
  VEHICLE_CHECKS = 'vehicleChecks',
  CONTROLLED_STOP = 'controlledStop',
  MANOEUVRES = 'Manoeuvres',
  EYESIGHT_TEST = 'eyesightTest',
  UNCOUPLE_RECOUPLE = 'uncoupleRecouple',
}

export type FaultSummary = Competency & MultiFaultAssignableCompetency & CommentedCompetency;

export enum CompetencyIdentifiers {
  COMMENTS = 'Comments',
  FAULT = 'Fault',
  EYESIGHT_TEST = 'eyesightTest',
  CONTROLLED_STOP = 'controlledStop',
  CONTROL_FAULT = 'controlFault',
}
