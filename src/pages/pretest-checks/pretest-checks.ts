import { TELL_ME_QUESTIONS } from './../../app/constants';
import { vCheckType, VehicleCheckProvider } from './../../providers/vehicle-check/vehicle-check';
import { AllOnOneV2Page } from './../all-on-one-v2/all-on-one-v2';
import { Component, ViewChild } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
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
    isAutomatic: null,
    selectedQuestion: null,
    questionAsked: false
  };
  slotDetail: IJournal;
  eyesightResult: EyesightResult = EyesightResult.NotAnswered;
  gearboxCategory: GearboxCategory = GearboxCategory.NotAnswered;

  EyesightResult = EyesightResult;
  GearboxCategory = GearboxCategory;

  @select(['faults', 'vehicleCheck'])
  vcState$;

  // Validation Flags
  showEyesightValidation: boolean = false;
  showGearboxValidation: boolean = false;

  tellMeSelection: any = null;

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

  setTellMeState(faultType) {
    if (faultType !== 'nothing') {
      this.vehicleCheckProvider.removeFault(vCheckType.TELLME);
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
        this.preCheck.questionAsked = true;
        this.preCheck.selectedQuestion = `${selectedQuestion.id} - ${selectedQuestion.keyWords}`;
        this.vehicleCheckProvider.markAsComplete(selectedQuestion, vCheckType.TELLME);
      }
    });

    tellMeQuestionModal.present();
  };

  gotoDL25(form) {
    this.showEyesightValidation = this.eyesightResult === EyesightResult.NotAnswered;
    this.showGearboxValidation = this.gearboxCategory === this.GearboxCategory.NotAnswered;

    if (form.valid && !this.showEyesightValidation && !this.showGearboxValidation) {
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

  updateTellMeState() {
    this.setTellMeState(this.tellMeSelection);
  }
}
