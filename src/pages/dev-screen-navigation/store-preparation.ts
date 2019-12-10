import { Store } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { StartTest, PersistTests } from '../../modules/tests/tests.actions';
import { PopulateCandidateDetails } from '../../modules/tests/journal-data/candidate/candidate.actions';
import { candidateMock } from '../../modules/tests/__mocks__/tests.mock';
import { PopulateTestCategory } from '../../modules/tests/category/category.actions';
import { PopulateExaminer } from '../../modules/tests/journal-data/examiner/examiner.actions';
import { DateTime } from '../../shared/helpers/date-time';
import { PopulateTestCentre } from '../../modules/tests/journal-data/test-centre/test-centre.actions';
import {
  SetTestStatusBooked,
  SetTestStatusStarted,
} from '../../modules/tests/test-status/test-status.actions';
import { SetExaminerBooked } from '../../modules/tests/examiner-booked/examiner-booked.actions';
import { SetExaminerConducted } from '../../modules/tests/examiner-conducted/examiner-conducted.actions';
import { SetExaminerKeyed } from '../../modules/tests/examiner-keyed/examiner-keyed.actions';
import { PopulateTestSchemaVersion } from '../../modules/tests/schema-version/schema-version.actions';
import { SetChangeMarker } from '../../modules/tests/change-marker/change-marker.actions';
import { StopPolling, LoadJournalSuccess, SetSelectedDate } from '../../modules/journal/journal.actions';
import { ConnectionStatus } from '../../providers/network-state/network-state';
import journalSlotsDataMock from '../../modules/journal/__mocks__/journal-slots-data.mock';
import { PopulateApplicationReference } from
  '../../modules/tests/journal-data/application-reference/application-reference.actions';
import { PopulateTestSlotAttributes } from
  '../../modules/tests/journal-data/test-slot-attributes/test-slot-attributes.actions';
import { PopulateConductedLanguage, CandidateChoseEmailAsCommunicationPreference } from
  '../../modules/tests/communication-preferences/communication-preferences.actions';
import { Injectable } from '@angular/core';
import { EyesightTestPassed } from '../../modules/tests/test-data/common/eyesight-test/eyesight-test.actions';
import { TellMeQuestionSelected } from
  '../../modules/tests/test-data/cat-be/vehicle-checks/vehicle-checks.cat-be.action';
import { TellMeQuestionCorrect, ShowMeQuestionPassed, ShowMeQuestionSelected } from
  '../../modules/tests/test-data/cat-b/vehicle-checks/vehicle-checks.actions';
import { VehicleRegistrationChanged, GearboxCategoryChanged, PopulateVehicleDimensions } from
  '../../modules/tests/vehicle-details/vehicle-details.actions';
import { ToggleLegalRequirement } from
  '../../modules/tests/test-data/cat-b/test-requirements/test-requirements.actions';
import { LegalRequirements, ManoeuvreTypes, ManoeuvreCompetencies, Competencies, ExaminerActions } from
  '../../modules/tests/test-data/test-data.constants';
import { ToggleEco } from '../../modules/tests/test-data/common/eco/eco.actions';
import { ToggleControlledStop } from '../../modules/tests/test-data/cat-b/controlled-stop/controlled-stop.actions';
import { AddDrivingFault } from '../../modules/tests/test-data/common/driving-faults/driving-faults.actions';
import { CalculateTestResult } from '../test-report/test-report.actions';
import { SetActivityCode } from '../../modules/tests/activity-code/activity-code.actions';
import { ActivityCodes } from '../../shared/models/activity-codes';
import { EndDebrief } from '../debrief/debrief.actions';
import {
  PopulatePassCompletion,
  ProvisionalLicenseReceived,
  PassCertificateNumberChanged,
} from '../../modules/tests/pass-completion/pass-completion.actions';
import {
  D255Yes,
  DebriefWitnessed,
  RouteNumberChanged,
  IndependentDrivingTypeChanged,
  CandidateDescriptionChanged,
  WeatherConditionsChanged,
} from '../../modules/tests/test-summary/test-summary.actions';
import {
  ToggleHealthDeclaration,
  ToggleReceiptDeclaration,
  SignatureDataChanged,
} from '../../modules/tests/post-test-declarations/post-test-declarations.actions';
import { ContinueFromDeclaration } from '../health-declaration/health-declaration.actions';
import { AddSeriousFault } from '../../modules/tests/test-data/common/serious-faults/serious-faults.actions';
import { ToggleETA } from '../../modules/tests/test-data/common/eta/eta.actions';
import { AddDangerousFault } from '../../modules/tests/test-data/common/dangerous-faults/dangerous-faults.actions';
import { Platform } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { RecordManoeuvresSelection, AddManoeuvreDrivingFault } from '../../modules/tests/test-data/common/manoeuvres/manoeuvres.actions';
import { TestCategory } from '@dvsa/mes-test-schema/categories/common/test-category';

// TODO, more work for specific CAT BE pages, after the waiting room to car page
@Injectable()
export class StorePreparation {

  rekey: boolean;
  randomSlotId: number;
  staffNumber: string;

  constructor(
    private store$: Store<StoreModel>,
    private platform: Platform,
    private authenticationProvider: AuthenticationProvider,
  ) {
    this.staffNumber = this.authenticationProvider.getEmployeeId();

    if (this.platform.is('ios')) {
      this.randomSlotId = Math.floor(Math.random() * 9999) + 1000;
    } else {
      // this.staffNumber = '123';
      this.randomSlotId = 1001;
    }
  }

  setRekey(rekey: boolean) {
    this.rekey = rekey;
  }

  isRekey() {
    return this.rekey;
  }

  public passWorkflowCatB = [
    'prepareJournal',
    'journalPageStartCatB',
    'waitingRoomCatBPage',
    'communicationPage',
    'waitingRoomToCarPage',
    'passTestReportCatBPage',
    'debriefCatBPagePass',
    'passFinalisationCatBPage',
    'healthDeclarationCatBPage',
    'backToOfficeCatBPage',
    'officeCatBPage',
  ];

  public passWorkflowCatBE = [
    'prepareJournal',
    'journalPageStartCatBE',
    'waitingRoomCatBPage',
    'communicationPage',
    'waitingRoomToCarPage',
    'passTestReportCatBPage',
    'debriefCatBPagePass',
    'passFinalisationCatBPage',
    'healthDeclarationCatBPage',
    'backToOfficeCatBPage',
    'officeCatBPage',
  ];

  public failWorkflow1SeriousCatB = [
    'prepareJournal',
    'journalPageStartCatB',
    'waitingRoomCatBPage',
    'communicationPage',
    'waitingRoomToCarPage',
    'failTestReportWith1SeriousCatBPage',
    'debriefCatBPagePass',
    'passFinalisationCatBPage',
    'healthDeclarationCatBPage',
    'backToOfficeCatBPage',
  ];

  public failWorkflow1DangerousCatB = [
    'prepareJournal',
    'journalPageStartCatB',
    'waitingRoomCatBPage',
    'communicationPage',
    'waitingRoomToCarPage',
    'failTestReportWith1DangerousCatBPage',
    'debriefCatBPagePass',
    'passFinalisationCatBPage',
    'healthDeclarationCatBPage',
    'backToOfficeCatBPage',
  ];

  public failWorkflow16FaultsCatB = [
    'prepareJournal',
    'journalPageStartCatB',
    'waitingRoomCatBPage',
    'communicationPage',
    'waitingRoomToCarPage',
    'failTestReportWith16FaultsCatBPage',
    'debriefCatBPagePass',
    'passFinalisationCatBPage',
    'healthDeclarationCatBPage',
    'backToOfficeCatBPage',
  ];

  runPassWorkflowCatB(pageNumber: number) {
    for (let i = 0; i < pageNumber; i += 1) {
      this[this.passWorkflowCatB[i]]();
    }
  }

  runPassWorkflowCatBE(pageNumber: number) {
    for (let i = 0; i < pageNumber; i += 1) {
      this[this.passWorkflowCatBE[i]]();
    }
  }

  runFailWorkflowWith1SeriousCatB(pageNumber: number) {
    for (let i = 0; i < pageNumber; i += 1) {
      this[this.failWorkflow1SeriousCatB[i]]();
    }
  }

  runFailWorkflowWith16FaultsCatB(pageNumber: number) {
    for (let i = 0; i < pageNumber; i += 1) {
      this[this.failWorkflow16FaultsCatB[i]]();
    }
  }

  runFailWorkflowWith1DangerousCatB(pageNumber: number) {
    for (let i = 0; i < pageNumber; i += 1) {
      this[this.failWorkflow1DangerousCatB[i]]();
    }
  }

  prepareJournal() {
    const selectedDate: string = new DateTime().format('YYYY-MM-DD');
    const examiner = { staffNumber: this.staffNumber, individualId: 456 };
    this.store$.dispatch(new SetSelectedDate(selectedDate));
    this.store$.dispatch(
      new LoadJournalSuccess(
        { examiner, slotItemsByDate: journalSlotsDataMock },
        ConnectionStatus.ONLINE,
        false,
        new Date(),
      ),
    );
  }

  journalPageStartCatB() {
    this.journalPageStart(TestCategory.B, this.rekey);
  }

  journalPageStartCatBE() {
    this.journalPageStart(TestCategory.BE, this.rekey);
  }

  journalPageStart(category: TestCategory, rekey: boolean) {
    this.store$.dispatch(new StartTest(this.randomSlotId, category, rekey));
    this.store$.dispatch(new PopulateTestCategory(category));
    this.store$.dispatch(new PopulateExaminer({
      staffNumber: this.staffNumber,
    }));
    this.store$.dispatch(new PopulateApplicationReference({
      applicationId: 123456,
      bookingSequence: 78,
      checkDigit: 9,
    }));
    this.store$.dispatch(new PopulateCandidateDetails(candidateMock));
    this.store$.dispatch(new PopulateTestSlotAttributes({
      slotId: this.randomSlotId,
      specialNeeds: true,
      start: new DateTime().toString(),
      vehicleTypeCode: 'C',
      extendedTest: true,
      welshTest: null,
    }));
    this.store$.dispatch(new PopulateTestCentre({
      centreId: 1,
      costCode: '1234',
    }));
    this.store$.dispatch(new SetTestStatusBooked(this.randomSlotId.toString()));
    this.store$.dispatch(new SetExaminerBooked(this.randomSlotId));
    this.store$.dispatch(new SetExaminerConducted(this.randomSlotId));
    this.store$.dispatch(new SetExaminerKeyed(this.randomSlotId));
    this.store$.dispatch(new PopulateConductedLanguage('English'));
    this.store$.dispatch(new PopulateTestSchemaVersion('1'));
    this.store$.dispatch(new SetChangeMarker(false));
    this.store$.dispatch(new StopPolling());

    if (category === TestCategory.BE) {
      this.store$.dispatch(new PopulateVehicleDimensions(5, 5));
    }
  }

  waitingRoomCatBPage() {
    // this.store$.dispatch(new CandidateChoseToProceedWithTestInEnglish('English'));
    // this.store$.dispatch(new ToggleInsuranceDeclaration());
    // this.store$.dispatch(new ToggleResidencyDeclaration());
    // this.store$.dispatch(new SignatureDataChanged('123'));
    this.store$.dispatch(new CandidateChoseEmailAsCommunicationPreference('email@email.com', 'Email'));

  }

  communicationPage() {
    this.store$.dispatch(new SetTestStatusStarted(this.randomSlotId.toString()));
    this.store$.dispatch(new PersistTests());
  }

  // TODO: make cat BE specific one with vehicle checks questions
  waitingRoomToCarPage() {
    this.store$.dispatch(new EyesightTestPassed());
    this.store$.dispatch(new TellMeQuestionSelected({
      code: 'T6',
      description: 'Antilock braking system',
    }, 0));
    this.store$.dispatch(new TellMeQuestionCorrect());
    this.store$.dispatch(new VehicleRegistrationChanged('123'));
    this.store$.dispatch(new GearboxCategoryChanged('Manual'));
  }

  // TODO: make cat BE specific one with cat BE test report store events
  passTestReportCatBPage() {
    this.store$.dispatch(new ToggleLegalRequirement(LegalRequirements.normalStart1));
    this.store$.dispatch(new ToggleLegalRequirement(LegalRequirements.normalStart2));
    this.store$.dispatch(new ToggleLegalRequirement(LegalRequirements.hillStart));
    this.store$.dispatch(new ToggleLegalRequirement(LegalRequirements.angledStart));
    this.store$.dispatch(new ToggleEco());
    this.store$.dispatch(new ShowMeQuestionPassed());
    this.store$.dispatch(new ToggleControlledStop());
    this.store$.dispatch(new RecordManoeuvresSelection(ManoeuvreTypes.reverseRight));
    this.store$.dispatch(new AddManoeuvreDrivingFault({
      manoeuvre: ManoeuvreTypes.reverseRight,
      competency: ManoeuvreCompetencies.controlFault,
    }));
    this.store$.dispatch(new AddDrivingFault({
      competency: Competencies.controlsGears,
      newFaultCount: 1,
    }));
    this.store$.dispatch(new AddDrivingFault({
      competency: Competencies.junctionsObservation,
      newFaultCount: 1,
    }));
    this.store$.dispatch(new AddDrivingFault({
      competency: Competencies.junctionsTurningRight,
      newFaultCount: 1,
    }));
    this.store$.dispatch(new PersistTests());
    this.store$.dispatch(new CalculateTestResult());
    this.store$.dispatch(new SetActivityCode(ActivityCodes.PASS));
  }

  failTestReportWith1SeriousCatBPage() {
    this.store$.dispatch(new ToggleLegalRequirement(LegalRequirements.normalStart1));
    this.store$.dispatch(new ToggleLegalRequirement(LegalRequirements.normalStart2));
    this.store$.dispatch(new ToggleLegalRequirement(LegalRequirements.hillStart));
    this.store$.dispatch(new ToggleLegalRequirement(LegalRequirements.angledStart));
    this.store$.dispatch(new ToggleEco());
    this.store$.dispatch(new ShowMeQuestionPassed());
    this.store$.dispatch(new ToggleControlledStop());
    this.store$.dispatch(new RecordManoeuvresSelection(ManoeuvreTypes.reverseRight));
    this.store$.dispatch(new AddManoeuvreDrivingFault({
      manoeuvre: ManoeuvreTypes.reverseRight,
      competency: ManoeuvreCompetencies.controlFault,
    }));
    this.store$.dispatch(new AddDrivingFault({
      competency: Competencies.controlsGears,
      newFaultCount: 1,
    }));
    this.store$.dispatch(new AddDrivingFault({
      competency: Competencies.junctionsObservation,
      newFaultCount: 1,
    }));
    this.store$.dispatch(new ToggleETA(ExaminerActions.verbal));
    this.store$.dispatch(new AddSeriousFault(Competencies.junctionsTurningRight));
    this.store$.dispatch(new PersistTests());
    this.store$.dispatch(new CalculateTestResult());
    this.store$.dispatch(new SetActivityCode(ActivityCodes.FAIL));
  }

  failTestReportWith1DangerousCatBPage() {
    this.store$.dispatch(new ToggleLegalRequirement(LegalRequirements.normalStart1));
    this.store$.dispatch(new ToggleLegalRequirement(LegalRequirements.normalStart2));
    this.store$.dispatch(new ToggleLegalRequirement(LegalRequirements.hillStart));
    this.store$.dispatch(new ToggleLegalRequirement(LegalRequirements.angledStart));
    this.store$.dispatch(new ToggleEco());
    this.store$.dispatch(new ShowMeQuestionPassed());
    this.store$.dispatch(new ToggleControlledStop());
    this.store$.dispatch(new RecordManoeuvresSelection(ManoeuvreTypes.reverseRight));
    this.store$.dispatch(new AddManoeuvreDrivingFault({
      manoeuvre: ManoeuvreTypes.reverseRight,
      competency: ManoeuvreCompetencies.controlFault,
    }));
    this.store$.dispatch(new AddDrivingFault({
      competency: Competencies.controlsGears,
      newFaultCount: 1,
    }));
    this.store$.dispatch(new AddDrivingFault({
      competency: Competencies.junctionsObservation,
      newFaultCount: 1,
    }));
    this.store$.dispatch(new ToggleETA(ExaminerActions.verbal));
    this.store$.dispatch(new AddDangerousFault(Competencies.junctionsTurningRight));
    this.store$.dispatch(new PersistTests());
    this.store$.dispatch(new CalculateTestResult());
    this.store$.dispatch(new SetActivityCode(ActivityCodes.FAIL));
  }

  failTestReportWith16FaultsCatBPage() {
    this.store$.dispatch(new ToggleLegalRequirement(LegalRequirements.normalStart1));
    this.store$.dispatch(new ToggleLegalRequirement(LegalRequirements.normalStart2));
    this.store$.dispatch(new ToggleLegalRequirement(LegalRequirements.hillStart));
    this.store$.dispatch(new ToggleLegalRequirement(LegalRequirements.angledStart));
    this.store$.dispatch(new ToggleEco());
    this.store$.dispatch(new ShowMeQuestionPassed());
    this.store$.dispatch(new ToggleControlledStop());
    this.store$.dispatch(new RecordManoeuvresSelection(ManoeuvreTypes.reverseRight));
    this.store$.dispatch(new AddDrivingFault({
      competency: Competencies.controlsGears,
      newFaultCount: 5,
    }));
    this.store$.dispatch(new AddDrivingFault({
      competency: Competencies.junctionsObservation,
      newFaultCount: 5,
    }));
    this.store$.dispatch(new AddDrivingFault({
      competency: Competencies.moveOffSafety,
      newFaultCount: 5,
    }));
    this.store$.dispatch(new AddDrivingFault({
      competency: Competencies.responseToSignsOtherRoadUsers,
      newFaultCount: 1,
    }));
    this.store$.dispatch(new ToggleETA(ExaminerActions.verbal));
    this.store$.dispatch(new PersistTests());
    this.store$.dispatch(new CalculateTestResult());
    this.store$.dispatch(new SetActivityCode(ActivityCodes.FAIL));
  }

  debriefCatBPagePass() {
    this.store$.dispatch(new EndDebrief());
    this.store$.dispatch(new PopulatePassCompletion());
  }

  passFinalisationCatBPage() {
    this.store$.dispatch(new ProvisionalLicenseReceived());
    this.store$.dispatch(new GearboxCategoryChanged('Manual'));
    this.store$.dispatch(new PassCertificateNumberChanged('A123456X'));
    this.store$.dispatch(new D255Yes());
    this.store$.dispatch(new DebriefWitnessed());
    this.store$.dispatch(new PersistTests());
  }

  healthDeclarationCatBPage() {
    this.store$.dispatch(new ToggleHealthDeclaration());
    this.store$.dispatch(new ToggleReceiptDeclaration());
    this.store$.dispatch(new SignatureDataChanged('123'));
    this.store$.dispatch(new ContinueFromDeclaration());
  }

  backToOfficeCatBPage() {
  }

  officeCatBPage() {
    this.store$.dispatch(new RouteNumberChanged(1));
    this.store$.dispatch(new IndependentDrivingTypeChanged('Sat nav'));
    this.store$.dispatch(new CandidateDescriptionChanged('human'));
    this.store$.dispatch(new ShowMeQuestionSelected({
      code: 'S4',
      description: 'Rear demister',
      shortName: 'Rear',
    }));
    this.store$.dispatch(new WeatherConditionsChanged(['Showers']));
  }

}
