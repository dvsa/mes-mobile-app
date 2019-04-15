interface ManoeuvreCompetencyLabel {
  [key: string]: 'Control' | 'Observation';
}

export const manoeuvreCompetencyLabels: ManoeuvreCompetencyLabel = {
  reverseLeftControl: 'Control',
  reverseLeftObservation: 'Observation',
  reverseRightControl: 'Control',
  reverseRightObservation: 'Observation',
  reverseParkRoadControl: 'Control',
  reverseParkRoadObservation: 'Observation',
  reverseParkCarparkControl: 'Control',
  reverseParkCarparkObservation: 'Observation',
  forwardParkControl: 'Control',
  forwardParkObservation: 'Observation',
};
