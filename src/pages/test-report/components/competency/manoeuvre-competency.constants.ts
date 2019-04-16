interface ManoeuvreCompetencyLabel {
  [key: string]: 'Control' | 'Observation';
}

export const manoeuvreCompetencyLabels: ManoeuvreCompetencyLabel = {
  outcomeReverseLeftControl: 'Control',
  outcomeReverseLeftObservation: 'Observation',
  outcomeReverseRightControl: 'Control',
  outcomeReverseRightObservation: 'Observation',
  outcomeReverseParkRoadControl: 'Control',
  outcomeReverseParkRoadObservation: 'Observation',
  outcomeReverseParkCarparkControl: 'Control',
  outcomeReverseParkCarparkObservation: 'Observation',
  outcomeForwardParkControl: 'Control',
  outcomeForwardParkObservation: 'Observation',
};
