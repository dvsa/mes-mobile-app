
export enum fullCompetencyLabels {
  controlsAccelerator = 'Controls - Accelerator',
  controlsClutch = 'Controls - Clutch',
  controlsGears = 'Controls - Gears',
  controlsFootbrake = 'Controls - Footbrake',
  controlsParkingBrake = 'Controls - Parking brake',
  controlsSteering = 'Controls - Steering',
  precautions = 'Precautions',
  ancillaryControls = 'Ancillary Controls',
  moveOffSafety = 'Move off - Safety',
  moveOffControl = 'Move off - Control',
  useOfMirrorsSignalling = 'Use of mirrors - Signalling',
  useOfMirrorsChangeDirection = 'Use of mirrors - Change direction',
  useOfMirrorsChangeSpeed = 'Use of mirrors - Change speed',
  signalsNecessary = 'Signals - Necessary',
  signalsCorrectly = 'Signals - Correctly',
  signalsTimed = 'Signals - Timed',
  junctionsApproachSpeed = 'Junctions - Approach speed',
  junctionsObservation = 'Junctions - Observation',
  junctionsTurningRight = 'Junctions - Turning right',
  junctionsTurningLeft = 'Junctions - Turning left',
  junctionsCuttingCorners = 'Junctions - Cutting corners',
  judgementOvertaking = 'Judgement - Overtaking',
  judgementMeeting = 'Judgement - Meeting',
  judgementCrossing = 'Judgement - Crossing',
  positioningNormalDriving = 'Positioning - Normal driving',
  positioningLaneDiscipline = 'Positioning - Lane discipline',
  clearance = 'Clearance',
  followingDistance = 'Following distance',
  useOfSpeed = 'Use of speed',
  progressAppropriateSpeed = 'Progress - Appropriate speed',
  progressUndueHesitation = 'Progress - Undue hesitation',
  responseToSignsTrafficSigns = 'Response to signs / signals - Traffic signs',
  responseToSignsRoadMarkings = 'Response to signs / signals - Road markings',
  responseToSignsTrafficLights = 'Response to signs / signals - Traffic lights',
  responseToSignsTrafficControllers = 'Response to signs / signals - Traffic controllers',
  responseToSignsOtherRoadUsers = 'Response to signs / signals - Other road users',
  pedestrianCrossings = 'Pedestrian crossings',
  positionNormalStops = 'Position/normal stop',
  awarenessPlanning = 'Awareness planning',
  outcomeControlledStop = 'Controlled stop',
}

export type FaultCount = { propertyName: string, name: string, count: number };
export type SeriousFaultsContainer = { propertyName: string, name: string, comment: string };
