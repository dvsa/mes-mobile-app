import { OutcomeBehaviourMapping } from '../../providers/outcome-behaviour-map/outcome-behaviour-map.model';

export const behaviourMap: OutcomeBehaviourMapping = {
  ['1']: {
    ['routeNumber']: { display: 'Y', defaultValue: null, showNotApplicable: false },
    ['independentDriving']: { display: 'Y', showNotApplicable: false },
    ['showMeQuestion']: { display: 'Y', defaultValue: '', showNotApplicable: false },
    ['faultComment']: { display: 'A', showNotApplicable: false },
  },
  ['3']: {
    ['routeNumber']: { display: 'N', defaultValue: '1', showNotApplicable: false },
    ['independentDriving']: { display: 'N', showNotApplicable: false },
    ['showMeQuestion']: { display: 'N', showNotApplicable: false },
    ['faultComment']: { display: 'A', showNotApplicable: false },
  },
  ['4']: {
    ['routeNumber']: { display: 'Y', showNotApplicable: false },
    ['independentDriving']: { display: 'Y', showNotApplicable: true },
    ['showMeQuestion']: { display: 'Y', showNotApplicable: true },
    ['faultComment']: { display: 'A', showNotApplicable: false },
  },
};
