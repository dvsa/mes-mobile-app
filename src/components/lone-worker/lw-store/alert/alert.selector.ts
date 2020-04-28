import { AlertModel, AlertStatusModel } from './alert.model';
import { Severity, ScenarioType } from '@dvsa/lw-incident-model';
import { StoreModel } from '../../../../shared/models/store.model';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { Accompaniment } from '@dvsa/mes-test-schema/categories/common';

export const getAlertStatus = (state: AlertModel, severity: Severity): AlertStatusModel => {
  const status = new AlertStatusModel(severity);
  switch (severity) {
    case Severity.Red:
      if (state.redAlert) {
        status.sending = state.isSending;
        status.received = !!state.redAlert.id;
      }
      break;
    case Severity.Amber:
      if (state.amberAlert) {
        status.sending = state.isSending;
        status.received = !!state.amberAlert.id;
        status.disabled = !!state.redAlert || !!state.amberAlert.id;
      }
      break;
  }
  return status;
};

// TODO: add return type when have all properties
export const getIncidentProperties = (state: StoreModel): any => {

  // This selector always get the test that is currently in progress and active
  const currentTest = getCurrentTest(state.tests);

  const incident = {
    loneWorker: {

      // Not sure where the name property is coming from
      name: 'Not defined in DES',

      staffNumber: state.journal.examiner.staffNumber,
    },
    scenario: {
      drivingTestInfo: {
        accompaniedBy: getAccompaniedBy(currentTest.accompaniment),
        candidateDriverNumber: currentTest.journalData.candidate.candidateName, // Needs string concatination
        candidateName: currentTest.journalData.candidate.candidateName, // Needs string concatination
        startDateTime: currentTest.journalData.testSlotAttributes.start, // Needs turning into a Date
        testCategory: currentTest.category,
        testCentre: {
          centreId: currentTest.journalData.testCentre.centreId,
          centreName: currentTest.journalData.testCentre.centreName,
        },
        vehicle: {

          // Different categories store different data - so you might want to extract these on a category level

          // dualControl: currentTest.vehicleDetails.dualControls,
          // schoolCar: currentTest.vehicleDetails.schoolCar,

          vehicleRegistration: currentTest.vehicleDetails.registrationNumber,
        },
      },
      type: ScenarioType.DrivingTest,
    },
  };

  return incident;
};

const getAccompaniedBy = (accompaniment: Accompaniment) => {
  let accompaniedBy = '';

  if (accompaniment.ADI) {
    accompaniedBy = `${accompaniedBy} Instructor`;
  }

  if (accompaniment.interpreter) {
    accompaniedBy = `${accompaniedBy} interpreter`;
  }

  if (accompaniment.other) {
    accompaniedBy = `${accompaniedBy} other`;
  }

  if (accompaniment.supervisor) {
    accompaniedBy = `${accompaniedBy} supervisor`;
  }

  return accompaniedBy;
};
