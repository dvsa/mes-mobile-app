import { Injectable } from '@angular/core';
import { StoreModel } from '../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IncidentCore, Vehicle, ScenarioType } from '@dvsa/lw-incident-model';
import { getCurrentTest } from '../../modules/tests/tests.selector';
import { Accompaniment, Name, VehicleDetails } from '@dvsa/mes-test-schema/categories/common';
import { omit, get } from 'lodash';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { getSlotsOnSelectedDate } from '../../modules/journal/journal.selector';

@Injectable()
export class LoneWorkerIntegrationProvider {

  constructor(
    private store$: Store<StoreModel>,
  ) {

  }

  getIncidentPropertiesFromStore(): Observable<Partial<IncidentCore>> {
    return this.store$.pipe(
      select(this.getIncidentProperties),
    );
  }

  getTestCentreIdFromStore(): Observable<string> {
    return this.store$.pipe(
      select(this.getTestCentreId),
    );
  }

  private getTestCentreId = (state: StoreModel): string => {
    // if there is a current tests, return that test centre Id
    if (state.tests.currentTest.slotId) {
      const currentTest = getCurrentTest(state.tests);
      return currentTest.journalData.testCentre.centreId.toString();
    }

    // if no active test, return id from top slow for selected date
    const slots = getSlotsOnSelectedDate(state.journal);
    if (slots[0]) {
      return slots[0].slotData.testCentre.centreId.toString();
    }

    return null;
  }

  private getIncidentProperties = (state: StoreModel): Partial<IncidentCore> => {

    const staffNumber = state.journal.examiner.staffNumber;
    // This selector always get the test that is currently in progress and active
    const currentTest = getCurrentTest(state.tests);
    const { journalData } = currentTest;
    const { candidate, testCentre } = journalData;
    const candidateNameAsStr = this.constructCandidateNameStr(candidate.candidateName);

    const incident = {
      loneWorker: {
        staffNumber,
        name: state.appInfo.employeeName,
      },
      scenario: {
        drivingTestInfo: {
          accompaniedBy: this.getAccompaniedBy(currentTest.accompaniment),
          candidateDriverNumber: candidate.driverNumber,
          candidateName: candidateNameAsStr,
          startDateTime: new Date(journalData.testSlotAttributes.start),
          testCategory: currentTest.category,
          testCentre: {
            centreId: testCentre.centreId.toString(),
            centreName: testCentre.centreName,
          },
          vehicle: this.getVehicleDetails(currentTest.vehicleDetails),
        },
        type: ScenarioType.DrivingTest,
      },
    };

    return incident;
  }

  private getVehicleDetails = (vehicleDetails: VehicleDetails & CatBUniqueTypes.VehicleDetails): Vehicle => {
    const incidentVehicleDetails: Vehicle = {};
    const hasDualControlsField = get(vehicleDetails, 'dualControls', false);
    const hasSchoolCarField = get(vehicleDetails, 'schoolCar', false);
    if (hasDualControlsField) incidentVehicleDetails.dualControl = vehicleDetails.dualControls;
    if (hasSchoolCarField) incidentVehicleDetails.schoolCar = vehicleDetails.schoolCar;
    return {
      ...incidentVehicleDetails,
      vehicleRegistration: vehicleDetails.registrationNumber,
    };
  }

  private getAccompaniedBy = (accompaniment: Accompaniment) => {
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
  }

  private constructCandidateNameStr = (candidateName: Name): string => {
    const { title } = candidateName;
    const names = omit(candidateName, 'title');
    const firstName = 'firstName' in names ? names.firstName : '';
    const secondName = 'secondName' in names ? names.secondName : '';
    const thirdName = 'thirdName' in names ? names.thirdName : '';
    const lastName = 'lastName' in names ? names.lastName : '';
    return `${title} ${firstName} ${secondName} ${thirdName} ${lastName}`;
  }
}
