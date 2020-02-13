export type FaultSummary =  {
  competencyIdentifier: string;
  competencyDisplayName: string;
  source?: string;
  faultCount: number;
  comment: string;
};

export enum CommentSource {
  SIMPLE = 'simple',
  VEHICLE_CHECKS = 'vehicleChecks',
  CONTROLLED_STOP = 'controlledStop',
  MANOEUVRES = 'Manoeuvres',
  EYESIGHT_TEST = 'eyesightTest',
  UNCOUPLE_RECOUPLE = 'uncoupleRecouple',
  PCV_DOOR_EXERCISE = 'pcvDoorExercise',
  SAFETY_QUESTIONS = 'safetyQuestions',
}

export enum CompetencyIdentifiers {
  COMMENTS_SUFFIX = 'Comments',
  FAULT_SUFFIX = 'Fault',
  EYESIGHT_TEST = 'eyesightTest',
  CONTROLLED_STOP = 'controlledStop',
  CONTROL_FAULT = 'controlFault',
}
