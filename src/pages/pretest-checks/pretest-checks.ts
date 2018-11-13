import { TELL_ME_QUESTIONS } from './../../app/constants';
import { VehicleCheckProvider, vCheckType } from './../../providers/vehicle-check/vehicle-check';
import { AllOnOneV2Page } from './../all-on-one-v2/all-on-one-v2';
import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { PolicyDataPage } from '../policy-data/policy-data';
import { EndTestReasonPage } from '../end-test-reason/end-test-reason';
import { Page } from 'ionic-angular/navigation/nav-util';
import { QuestionsModalComponent } from '../../components/questions-modal/questions-modal';
import { select } from '@angular-redux/store';
import { IJournal } from '../../providers/journal/journal-model';
import { EyesightResult } from './check-enums/eyesight-result';
import { GearboxCategory } from './check-enums/gearbox-category';

@Component({
  selector: 'page-pretest-checks',
  templateUrl: 'pretest-checks.html'
})
export class PretestChecksPage {
  @ViewChild('isAutomatic')
  isAutomaticInput;
  endTestReasonPage: Page = EndTestReasonPage;
  policyDataPage: Page = PolicyDataPage;
  eyeSightSeriousFault = false;
  disableBackdropDismissModalOption = { enableBackdropDismiss: false };
  preCheck = {
    isEyesightCompleted: false,
    carRegistration: null,
    tellMeQuestionId: null,
    isAutomatic: null
  };
  slotDetail: IJournal;
  eyesightResult: EyesightResult = EyesightResult.NotAnswered;
  gearboxCategory: GearboxCategory = GearboxCategory.NotAnswered;

  EyesightResult = EyesightResult;
  GearboxCategory = GearboxCategory;

  @select(['faults', 'vehicleCheck'])
  vcState$;

  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private vehicleCheckProvider: VehicleCheckProvider,
    public navParams: NavParams
  ) {
    this.slotDetail = this.navParams.get('slotDetail');
  }

  ngAfterViewInit() {
    this.vehicleCheckProvider.reset(vCheckType.TELLME);
    this.vehicleCheckProvider.reset(vCheckType.SHOWME);
  }

  getTitle() {
    return 'Begin test - Florence Pearson';
  }

  clearEyesightResult() {
    this.eyesightResult = EyesightResult.NotAnswered;
  }

  clearGearboxCategory() {
    this.gearboxCategory = GearboxCategory.NotAnswered;
  }

  setTellMeState(faultType, $event) {
    const isActive = $event.currentTarget.className.includes('active');

    if (isActive) {
      this.vehicleCheckProvider.removeFault(vCheckType.TELLME);
    } else {
      this.vehicleCheckProvider.addFault(vCheckType.TELLME, faultType);
    }
  }

  showTellMeOptions = () => {
    const tellMeQuestionModal = this.modalCtrl.create(
      QuestionsModalComponent,
      { options: TELL_ME_QUESTIONS, selectedTellMeQuestionId: this.preCheck.tellMeQuestionId },
      this.disableBackdropDismissModalOption
    );

    tellMeQuestionModal.onDidDismiss((selectedQuestion = { id: null }, role: string) => {
      if (role !== 'dismiss') {
        this.preCheck.tellMeQuestionId = selectedQuestion.id;
        this.vehicleCheckProvider.markAsComplete(selectedQuestion, vCheckType.TELLME);
      }
    });

    tellMeQuestionModal.present();
  };

  gotoDL25(form) {
    if (form.valid) {
      this.navCtrl.push(AllOnOneV2Page, { slotDetail: this.slotDetail }, { animate: false });
    }
  }

  backToJournal() {
    this.navCtrl.popTo(this.navCtrl.getByIndex(1));
  }

  automaticInputChanged(event, secondInput) {
    secondInput.checked = false;
    this.preCheck.isAutomatic = event.target.checked;
    this.isAutomaticInput.control.markAsDirty();
  }
}
