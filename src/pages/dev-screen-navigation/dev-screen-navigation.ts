import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { DASHBOARD_PAGE, JOURNAL_PAGE, CAT_B, CAT_BE } from '../page-names.constants';
import { StorePreparation } from './store-preparation';

@IonicPage()
@Component({
  selector: 'dev-screen-navigation',
  templateUrl: 'dev-screen-navigation.html',
})
export class DevScreenNavigationPage {

  categories = [
    'B',
    'BE',
  ];

  selectedCategory = 'B';

  constructor(
    public navController: NavController,
    private storePreparations: StorePreparation,
  ) {
  }

  setRekey(rekey: boolean) {
    this.storePreparations.setRekey(rekey);
  }

  goToDashboard() {
    return this.navController.setRoot(DASHBOARD_PAGE);
  }
  goToJournal() {
    this.navController.push(JOURNAL_PAGE);
  }

  categorySelected(selectedCategory: string) {
    this.selectedCategory = selectedCategory;
  }

  // CAT B
  goToWaitingRoomCatB() {
    this.storePreparations.runPassWorkflowCatB(2);
    this.navController.push(CAT_B.WAITING_ROOM_PAGE);
  }

  goToCommunicationPageCatB() {
    this.storePreparations.runPassWorkflowCatB(3);
    this.navController.push(CAT_B.COMMUNICATION_PAGE);
  }

  goToWaitingRoomToCarCatBPage() {
    this.storePreparations.runPassWorkflowCatB(4);
    this.navController.push(CAT_B.WAITING_ROOM_TO_CAR_PAGE);
  }

  goToTestReportCatBPage() {
    this.storePreparations.runPassWorkflowCatB(5);
    this.navController.push(CAT_B.TEST_REPORT_PAGE);
  }

  goToDebriefPagePassCatBPage() {
    this.storePreparations.runPassWorkflowCatB(6);
    this.navController.push(CAT_B.DEBRIEF_PAGE);
  }

  goToDebriefPageFail1SeriousCatBPage() {
    this.storePreparations.runFailWorkflowWith1SeriousCatB(6);
    this.navController.push(CAT_B.DEBRIEF_PAGE);
  }

  goToDebriefPageFail1DangerousCatBPage() {
    this.storePreparations.runFailWorkflowWith1DangerousCatB(6);
    this.navController.push(CAT_B.DEBRIEF_PAGE);
  }

  goToDebriefPageFail16FaultsCatBPage() {
    this.storePreparations.runFailWorkflowWith16FaultsCatB(6);
    this.navController.push(CAT_B.DEBRIEF_PAGE);
  }

  goToPassFinalisationCatBPage() {
    this.storePreparations.runPassWorkflowCatB(7);
    this.navController.push(CAT_B.PASS_FINALISATION_PAGE);
  }

  goToNonPassFinalisationCatBPage() {
    this.storePreparations.runFailWorkflowWith1SeriousCatB(7);
    this.navController.push(CAT_B.NON_PASS_FINALISATION_PAGE);
  }

  goToHealthDeclarationCatBPage() {
    this.storePreparations.runPassWorkflowCatB(8);
    this.navController.push(CAT_B.HEALTH_DECLARATION_PAGE);
  }

  goToBackToOfficeCatBPage() {
    this.storePreparations.runPassWorkflowCatB(9);
    this.navController.push(CAT_B.BACK_TO_OFFICE_PAGE);
  }

  goToOfficeCatBPage() {
    this.storePreparations.runPassWorkflowCatB(10);
    this.navController.push(CAT_B.OFFICE_PAGE);
  }

  goToRekeyReasonCatBPage() {
    this.storePreparations.runPassWorkflowCatB(11);
    this.navController.push(CAT_B.REKEY_REASON_PAGE);
  }
  // CAT B

  // CAT BE
  goToWaitingRoomCatBE() {
    this.storePreparations.runPassWorkflowCatBE(2);
    this.navController.push(CAT_BE.WAITING_ROOM_PAGE);
  }

  goToCommunicationPageCatBE() {
    this.storePreparations.runPassWorkflowCatBE(3);
    this.navController.push(CAT_BE.COMMUNICATION_PAGE);
  }

  goToWaitingRoomToCarCatBEPage() {
    this.storePreparations.runPassWorkflowCatBE(4);
    this.navController.push(CAT_BE.WAITING_ROOM_TO_CAR_PAGE);
  }

  goToTestReportCatBEPage() {
    this.storePreparations.runPassWorkflowCatBE(5);
    this.navController.push(CAT_BE.TEST_REPORT_PAGE);
  }

  goToDebriefPagePassCatBEPage() {
    this.storePreparations.runPassWorkflowCatBE(6);
    this.navController.push(CAT_BE.DEBRIEF_PAGE);
  }

  goToDebriefPageFail1SeriousCatBEPage() {
    this.storePreparations.runFailWorkflowWith1SeriousCatB(6);
    this.navController.push(CAT_BE.DEBRIEF_PAGE);
  }

  goToDebriefPageFail1DangerousCatBEPage() {
    this.storePreparations.runFailWorkflowWith1DangerousCatB(6);
    this.navController.push(CAT_BE.DEBRIEF_PAGE);
  }

  goToDebriefPageFail16FaultsCatBEPage() {
    this.storePreparations.runFailWorkflowWith16FaultsCatB(6);
    this.navController.push(CAT_BE.DEBRIEF_PAGE);
  }

  goToPassFinalisationCatBEPage() {
    this.storePreparations.runPassWorkflowCatBE(7);
    this.navController.push(CAT_BE.PASS_FINALISATION_PAGE);
  }

  goToNonPassFinalisationCatBEPage() {
    this.storePreparations.runFailWorkflowWith1SeriousCatB(7);
    this.navController.push(CAT_BE.NON_PASS_FINALISATION_PAGE);
  }

  goToHealthDeclarationCatBEPage() {
    this.storePreparations.runPassWorkflowCatBE(8);
    this.navController.push(CAT_BE.HEALTH_DECLARATION_PAGE);
  }

  goToBackToOfficeCatBEPage() {
    this.storePreparations.runPassWorkflowCatBE(9);
    this.navController.push(CAT_BE.BACK_TO_OFFICE_PAGE);
  }

  goToOfficeCatBEPage() {
    this.storePreparations.runPassWorkflowCatBE(10);
    this.navController.push(CAT_BE.OFFICE_PAGE);
  }

  goToRekeyReasonCatBEPage() {
    this.storePreparations.runPassWorkflowCatBE(11);
    this.navController.push(CAT_BE.REKEY_REASON_PAGE);
  }
  // CAT B
}
