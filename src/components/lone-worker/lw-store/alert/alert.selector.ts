import { AlertModel, AlertStatusModel, AlertRequestStatus } from './alert.model';
import { Severity, ScenarioType, Vehicle, IncidentCore } from '@dvsa/lw-incident-model';
import { StoreModel } from '../../../../shared/models/store.model';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { Accompaniment, Name, VehicleDetails } from '@dvsa/mes-test-schema/categories/common';
import { omit, get } from 'lodash';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';

export const getAlertStatus = (state: AlertModel, severity: Severity): AlertStatusModel => {
  const status = new AlertStatusModel(severity);
  switch (severity) {
    case Severity.Red:
      if (state.redAlert) {
        status.sending = state.redAlert.isSending;
        status.received = state.redAlert.status === AlertRequestStatus.Success;
        status.error = state.redAlert.status === AlertRequestStatus.Fail;
      }
      break;
    case Severity.Amber:
      if (state.amberAlert) {
        status.sending = state.amberAlert.isSending;
        status.received = state.amberAlert.status === AlertRequestStatus.Success;
        status.disabled = !!state.redAlert || state.amberAlert.status === AlertRequestStatus.Success;
        status.error = state.amberAlert.status === AlertRequestStatus.Fail;
      }
      break;
  }
  return status;
};

export const getIncidentProperties = (state: StoreModel): Partial<IncidentCore> => {

  const staffNumber = state.journal.examiner.staffNumber;
  // This selector always get the test that is currently in progress and active
  const currentTest = getCurrentTest(state.tests);
  const { journalData } = currentTest;
  const { candidate, testCentre } = journalData;
  const candidateNameAsStr = constructCandidateNameStr(candidate.candidateName);

  const incident = {
    loneWorker: {
      staffNumber,
      name: state.appInfo.employeeName,
    },
    scenario: {
      drivingTestInfo: {
        accompaniedBy: getAccompaniedBy(currentTest.accompaniment),
        candidateDriverNumber: candidate.driverNumber,
        candidateName: candidateNameAsStr,
        startDateTime: new Date(journalData.testSlotAttributes.start),
        testCategory: currentTest.category,
        testCentre: {
          centreId: testCentre.centreId.toString(),
          centreName: testCentre.centreName,
        },
        vehicle: getVehicleDetails(currentTest.vehicleDetails),
      },
      type: ScenarioType.DrivingTest,
    },
  };

  return incident;
};

const getVehicleDetails = (vehicleDetails: VehicleDetails & CatBUniqueTypes.VehicleDetails): Vehicle => {
  const incidentVehicleDetails: Vehicle = {};
  const hasDualControlsField = get(vehicleDetails, 'dualControls', false);
  const hasSchoolCarField = get(vehicleDetails, 'schoolCar', false);
  if (hasDualControlsField) incidentVehicleDetails.dualControl = vehicleDetails.dualControls;
  if (hasSchoolCarField) incidentVehicleDetails.schoolCar = vehicleDetails.schoolCar;
  return {
    ...incidentVehicleDetails,
    vehicleRegistration: vehicleDetails.registrationNumber,
  };
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

const constructCandidateNameStr = (candidateName: Name): string => {
  const { title } = candidateName;
  const names = omit(candidateName, 'title');
  const firstName = 'firstName' in names ? names.firstName : '';
  const secondName = 'secondName' in names ? names.secondName : '';
  const thirdName = 'thirdName' in names ? names.thirdName : '';
  const lastName = 'lastName' in names ? names.lastName : '';
  return `${title} ${firstName} ${secondName} ${thirdName} ${lastName}`;
};
